import React, { useEffect, useState } from "react";
import { X, Check, User, Mail, Phone, Camera } from "lucide-react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../Input";

const ProfileForm = () => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    reset({
      fullName: user?.fullName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    });
  }, [reset, user]);

  const submitHandler = (data) => {};

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4  max-w-lg w-full"
    >
      {/* fullName*/}
      <div className="rounded-lg bg-background">
        <Input
          className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent  w-full bg-background rounded-2xl"
          type="text"
          placeholder="Full Name"
          {...register("fullName", {
            required: "Full name is required",
            maxLength: { value: 20, message: "Max 20 characters" },
            minLength: { value: 3, message: "Min 3 characters" },
          })}
        />
        {errors.fullName && (
          <span className="text-danger text-xs ml-2">
            {errors.fullName.message}
          </span>
        )}
      </div>
      {/* email */}
      <div className="rounded-lg bg-background">
        <Input
          className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-2xl"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-danger text-xs ml-2">
            {errors.email.message}
          </span>
        )}
      </div>
      {/* phone number */}
      <div className="rounded-lg bg-background">
        <Input
          className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-2xl"
          type="text"
          placeholder="Phone Number"
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
        />

        {errors.email && (
          <span className="text-danger text-xs ml-2">
            {errors.email.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
