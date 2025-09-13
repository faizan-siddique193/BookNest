import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Wallet,
  CheckCircle,
  MapPin,
  User,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import {
  Breadcrumb,
  OrderSummary,
  PaymentForm,
  ShippingForm,
  PaymentMethod,
} from "../../Component/index";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../feature/order/orderAction";
import { toast } from "react-toastify";
import { getCartItem } from "../../feature/cart/cartAction";
import { clearCart } from "../../feature/cart/cartSlice";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState("shipping");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingFormData, setShippingFormData] = useState(null);

  // TODO: shipping form data
  console.log("Shipping Form Data:: ", shippingFormData);
  console.log("Payment Method:: ", paymentMethod);

  const { loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!shippingFormData) {
      toast.error("Please fill out the shipping form.");
      return;
    }
    try {
      const response = await dispatch(
        createOrder({ ...shippingFormData, paymentMethod })
      ).unwrap();

      // TODO: delete this after debugging
      console.log("Order Response in the checkoutpage:: ", response);

      navigate(`/home/order-confirmation/${response.data._id}`);
      dispatch(clearCart());
      localStorage.removeItem("persist:cart");
      setOrderSuccess(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again");
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
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-medium text-primary mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Order Number:</span>
                <span className="font-medium text-primary">
                  #ORD-{Math.floor(Math.random() * 10000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Date:</span>
                <span className="font-medium text-primary">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Total:</span>
                {/*  <span className="font-bold text-success">
                  ${total.toFixed(2)}
                </span> */}
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Payment Method:</span>
                <span className="font-medium text-primary capitalize">
                  {paymentMethod.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/home/books"
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
            >
              View Order Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Back */}
        <Breadcrumb
          items={[
            { label: "Home", path: "/home" },
            { label: "Books", path: "/home/books" },
            { label: "Cart", path: "/home/cart" },
            { label: "Checkout", path: "/home/checkout" },
          ]}
        />

        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-primary mb-8 flex items-center mt-5">
          <Wallet className="h-8 w-8 mr-3" />
          Checkout & Payment
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="lg:w-2/3">
            {/* Progress Steps */}
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
                disabled={activeStep !== "payment"}
              >
                Payment
              </button>
            </div>

            {/* Shipping Form */}
            {activeStep === "shipping" && (
              <ShippingForm
                setShippingFormData={setShippingFormData}
                setActiveStep={setActiveStep}
              />
            )}

            {/* Payment Form */}
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
                    className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                    onClick={handlePlaceOrder}
                  >
                    {loading ? (
                      <Loader2
                        size={25}
                        className="text-white h-5 w-5 animate-spin"
                      />
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
                <PaymentForm />{" "}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
