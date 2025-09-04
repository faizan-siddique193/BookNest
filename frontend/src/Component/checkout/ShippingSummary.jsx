import React from "react";

const ShippingSummary = ({ shippingData, paymentMethod }) => {
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-background rounded-xl border border-primary/20">
      <h2 className="text-2xl font-bold text-primary mb-6">Shipping Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted font-medium">Full Name:</span>
          <span className="text-text font-semibold">
            {shippingData.fullName}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted font-medium">Phone Number:</span>
          <span className="text-text font-semibold">
            {shippingData.phoneNumber}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted font-medium">Email:</span>
          <span className="text-text font-semibold">{shippingData.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted font-medium">Address:</span>
          <span className="text-text font-semibold">
            {shippingData.address}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted font-medium">City:</span>
          <span className="text-text font-semibold">{shippingData.city}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted font-medium">Postal Code:</span>
          <span className="text-text font-semibold">
            {shippingData.postalCode}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted font-medium">Country:</span>
          <span className="text-text font-semibold">
            {shippingData.country}
          </span>
        </div>

        <div className="flex justify-between pt-4 border-t border-muted/30">
          <span className="text-muted font-medium">Payment Method:</span>
          <span className="text-text font-semibold capitalize">
            {paymentMethod === "stripe"
              ? "Credit / Debit Card"
              : "Cash on Delivery"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShippingSummary;
