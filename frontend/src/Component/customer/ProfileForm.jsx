import React, { useEffect, useState } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getAuth, getIdToken } from "firebase/auth";
import { updateUserProfile } from "../../feature/user/userAction";
import { toast } from "react-toastify";
import Input from "../Input";

const ProfileForm = ({ onCancel, onSubmit }) => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
    },
  });

  // Get Firebase token
  useEffect(() => {
    const getToken = async () => {
      const auth = getAuth();
      if (auth.currentUser) {
        try {
          const idToken = await getIdToken(auth.currentUser, {
            forceRefresh: true,
          });
          setToken(idToken);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (user) {
      const capitalizedName = user?.fullName
        ?.split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      reset({
        fullName: capitalizedName || "",
        email: user?.email || "",
        role: user?.role || "customer",
      });
    }
  }, [reset, user]);

  const submitHandler = async (data) => {
    try {
      setIsSubmitting(true);

      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        return;
      }

      // Only send fullName as other fields are read-only
      const result = await dispatch(
        updateUserProfile({
          fullName: data.fullName,
          token,
        })
      ).unwrap();

      toast.success("Profile updated successfully!");
      if (onSubmit) {
        onSubmit(data);
      }
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="p-6 md:p-8 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-1">Edit Profile</h2>
        <p className="text-sm text-muted">
          Update your profile information below
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name - Editable */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
            <Check className="h-4 w-4 text-green-600" />
            Full Name
          </label>
          <Input
            className="w-full py-2 px-4 text-primary font-medium bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder-gray-400"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required",
              maxLength: { value: 50, message: "Max 50 characters" },
              minLength: { value: 3, message: "Min 3 characters" },
            })}
          />
          {errors.fullName && (
            <p className="text-sm text-danger mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email - Disabled */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
            <AlertCircle className="h-4 w-4 text-gray-500" />
            Email Address
          </label>
          <Input
            className="w-full py-2 px-4 text-muted bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed opacity-60"
            type="email"
            placeholder="Email"
            disabled
            {...register("email")}
          />
          <p className="text-xs text-muted mt-1">
            Cannot be changed for security reasons
          </p>
        </div>

        {/* Role - Disabled */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
            <AlertCircle className="h-4 w-4 text-gray-500" />
            Account Role
          </label>
          <Input
            className="w-full py-2 px-4 text-muted bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed opacity-60"
            type="text"
            placeholder="Role"
            disabled
            {...register("role")}
          />
          <p className="text-xs text-muted mt-1">
            System assigned - cannot be changed
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || loading}
          className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-primary font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="flex items-center gap-2 px-5 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors duration-200"
        >
          <Check className="h-4 w-4" />
          {isSubmitting || loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
