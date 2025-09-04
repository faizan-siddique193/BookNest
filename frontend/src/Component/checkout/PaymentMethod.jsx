import React from "react";
import ShippingSummary from "./ShippingSummary";

const PaymentMethod = ({ selectedMethod, setSelectedMethod, shippingData }) => {
  return (
    <div className="mt-6 p-5 border border-primary/20 rounded-2xl shadow-sm bg-secondary">
      {/* Title */}
      <h3 className="text-xl font-semibold mb-5 text-primary">
        Payment Method
      </h3>

      <div className="flex flex-col gap-4">
        {/* Cash on Delivery */}
        <label
          className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
            selectedMethod === "cash-on-delivery"
              ? "border-accent bg-background shadow-sm"
              : "border-muted/30 hover:border-muted"
          }`}
        >
          <div className="relative flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cash-on-delivery"
              checked={selectedMethod === "cash-on-delivery"}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-5 h-5 appearance-none border-2 border-muted/60 rounded-full checked:border-accent checked:bg-accent focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 transition-all"
            />
            {selectedMethod === "cash-on-delivery" && (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-text font-medium">Cash on Delivery</span>
            <span className="text-sm text-muted">
              Pay with cash when your order arrives.
            </span>
          </div>
        </label>

        {/* Credit/Debit Card */}
        <label
          className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
            selectedMethod === "stripe"
              ? "border-accent bg-background shadow-sm"
              : "border-muted/30 hover:border-muted"
          }`}
        >
          <div className="relative flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={selectedMethod === "stripe"}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-5 h-5 appearance-none border-2 border-muted/60 rounded-full checked:border-accent checked:bg-accent focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 transition-all"
            />
            {selectedMethod === "stripe" && (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-text font-medium">Credit / Debit Card</span>
            <span className="text-sm text-muted">
              Secure payment via Stripe with Visa / MasterCard.
            </span>
          </div>
        </label>
      </div>
      <ShippingSummary
        paymentMethod={selectedMethod}
        shippingData={shippingData}
      />
    </div>
  );
};

export default PaymentMethod;
