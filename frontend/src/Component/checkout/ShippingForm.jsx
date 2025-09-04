import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../index";
import { MapPin, Loader2 } from "lucide-react";
const ShippingForm = ({ setShippingFormData, setActiveStep }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "",
    },
  });

  const handleFormSubmit = (data) => {
    setShippingFormData(data);
    setActiveStep("payment");
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-xl font-bold text-primary mb-6 flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Shipping Information
        </h2>

        {/* First row: Full Name and Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full name is required",
                maxLength: {
                  value: 50,
                  message: "Max 50 characters",
                },
                minLength: { value: 3, message: "Min 3 characters" },
              })}
              className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
            />
            {errors.fullName && (
              <span className="text-danger text-xs ml-2">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
            />
            {errors.phoneNumber && (
              <span className="text-danger text-xs ml-2">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>

        {/* Second row: Email */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
          />
          {errors.email && (
            <span className="text-danger text-xs ml-2">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Address"
            {...register("address", {
              required: "Address is required",
            })}
            className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
          />
          {errors.address && (
            <span className="text-danger text-xs ml-2">
              {errors.address.message}
            </span>
          )}
        </div>

        {/* Third row: City, Postal Code, Country */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
            />
            {errors.city && (
              <span className="text-danger text-xs ml-2">
                {errors.city.message}
              </span>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Postal Code"
              {...register("postalCode", {
                required: "Postal code is required",
              })}
              className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
            />
            {errors.postalCode && (
              <span className="text-danger text-xs ml-2">
                {errors.postalCode.message}
              </span>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Country"
              {...register("country", {
                required: "Country is required",
              })}
              className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-lg"
            />
            {errors.country && (
              <span className="text-danger text-xs ml-2">
                {errors.country.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* shipping form button */}
      <div className="flex justify-end">
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          {isSubmitting ? (
            <Loader2 size={25} className="text-white h-5 w-5 animate-spin" />
          ) : (
            "Continue to Payment"
          )}
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;
