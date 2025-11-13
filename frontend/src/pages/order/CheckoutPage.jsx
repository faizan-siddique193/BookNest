import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, CheckCircle, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  OrderSummary,
  ShippingForm,
  PaymentMethod,
} from "../../Component/index";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../feature/order/orderAction";
import { startStripePayment } from "../../feature/payment/paymentAction";
import { toast } from "react-toastify";
import { clearCart } from "../../feature/cart/cartSlice";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState("shipping");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [shippingFormData, setShippingFormData] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // place order
  const handlePlaceOrder = async () => {
    if (!shippingFormData) {
      toast.error("Please fill out the shipping form.");
      return;
    }

    try {
      // Step 1: Create order on backend
      const orderResponse = await dispatch(
        createOrder({ ...shippingFormData, paymentMethod })
      ).unwrap();

      const orderId = orderResponse.data._id;

      // Step 2: Handle cash order
      if (paymentMethod === "cash-on-delivery") {
        navigate(`/home/order-confirmation/${orderId}`);
        dispatch(clearCart());
        localStorage.removeItem("persist:cart");
        setOrderSuccess(true);
        return;
      }

      // Step 3: Handle Stripe payment
      if (paymentMethod === "stripe") {
        const response = await dispatch(
          startStripePayment({ orderId })
        ).unwrap();

        // clear cart
        dispatch(clearCart());
        localStorage.removeItem("persist:cart");

        //  Access the url from response.data
        if (!response.data?.url) {
          toast.error("Stripe session creation failed");
          return;
        }

        //  Redirect to Stripe checkout
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error(error || "something went wrong while placing an order");
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-primary mb-4">
            Order Confirmed!
          </h1>
          <p className="text-muted mb-6">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/home/books"
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </Link>
            {/* <Link
              to="/orders"
              className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
            >
              View Order Details
            </Link> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", path: "/home" },
            { label: "Books", path: "/home/books" },
            { label: "Cart", path: "/home/cart" },
            { label: "Checkout", path: "/home/checkout" },
          ]}
        />

        <h1 className="text-3xl font-bold text-primary mb-8 flex items-center mt-5">
          <Wallet className="h-8 w-8 mr-3" />
          Checkout & Payment
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side */}
          <div className="lg:w-2/3">
            <div className="flex mb-8">
              <button
                className={`flex-1 py-4 font-medium border-b-2 transition-colors ${
                  activeStep === "shipping"
                    ? "border-accent text-accent"
                    : "border-gray-200 text-muted"
                }`}
                onClick={() => setActiveStep("shipping")}
              >
                Shipping
              </button>
              <button
                className={`flex-1 py-4 font-medium border-b-2 transition-colors ${
                  activeStep === "payment"
                    ? "border-accent text-accent"
                    : "border-gray-200 text-muted"
                }`}
                onClick={() => setActiveStep("payment")}
                disabled={!shippingFormData}
              >
                Payment
              </button>
            </div>

            {activeStep === "shipping" && (
              <ShippingForm
                setShippingFormData={setShippingFormData}
                setActiveStep={setActiveStep}
              />
            )}

            {activeStep === "payment" && (
              <div>
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  setSelectedMethod={setPaymentMethod}
                  shippingData={shippingFormData}
                />
                <div className="flex justify-end mt-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePlaceOrder}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 text-white animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
