import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, getIdToken } from "firebase/auth";
import { getUserProfile } from "../../feature/user/userAction";
import {
  Mail,
  Shield,
  Camera,
  Edit,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../feature/user/userAction";
import { toast } from "react-toastify";
import Input from "../../Component/Input";
import { Loading } from "../../Component/index";

const AdminProfile = () => {
  const { loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [token, setToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Redirect non-admins back
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/user/profile", { replace: true });
    }
  }, [user?.role, navigate]);

  // Get Firebase token and fetch profile (only once on mount)
  useEffect(() => {
    const fetchProfileData = async () => {
      const auth = getAuth();
      if (auth.currentUser) {
        try {
          const idToken = await getIdToken(auth.currentUser, {
            forceRefresh: true,
          });
          setToken(idToken);
          dispatch(getUserProfile({ token: idToken }));
        } catch (error) {
          console.error("Error:", error);
          toast.error("Failed to load profile");
        }
      }
    };

    // Only fetch if we don't have user data yet
    if (!user) {
      fetchProfileData();
    }
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
        role: user?.role || "admin",
      });
    }
  }, [user, reset]);

  const submitHandler = async (data) => {
    try {
      setIsSubmitting(true);

      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        return;
      }

      const result = await dispatch(
        updateUserProfile({
          fullName: data.fullName,
          token,
        })
      ).unwrap();

      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 space-y-8">
              {/* Header Skeleton */}
              <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Profile Content Skeleton */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Avatar Skeleton */}
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 rounded-lg bg-gray-200 animate-pulse"></div>
                </div>

                {/* Profile Details Skeleton */}
                <div className="flex-grow space-y-6 w-full">
                  {/* Full Name */}
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Role */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {!editMode ? (
          // View Mode
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary">
                  Admin Profile
                </h2>
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200"
                >
                  <Edit className="h-4 w-4" />
                  <span className="font-medium text-sm">Edit</span>
                </button>
              </div>

              {/* Profile Info */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0 relative group">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-28 h-28 rounded-lg object-cover shadow-sm"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-lg bg-gray-200 flex items-center justify-center text-3xl text-primary font-bold shadow-sm">
                        {user?.fullName
                          ?.split(" ")
                          .slice(0, 2)
                          .map((word) => word.charAt(0).toUpperCase())
                          .join("") || "A"}
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="flex-grow space-y-4 w-full">
                    <div>
                      <p className="text-xs font-semibold text-muted mb-1">
                        FULL NAME
                      </p>
                      <p className="text-lg font-semibold text-primary">
                        {user?.fullName
                          ?.split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ") || "—"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="h-4 w-4 text-accent" />
                        <p className="text-xs font-semibold text-muted">
                          EMAIL
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-primary break-all">
                        {user?.email || "—"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="h-4 w-4 text-accent" />
                        <p className="text-xs font-semibold text-muted">ROLE</p>
                      </div>
                      <p className="text-lg font-semibold text-primary capitalize">
                        {user?.role || "admin"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="p-6 md:p-8 space-y-6"
            >
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-1">
                  Edit Admin Profile
                </h2>
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
                  onClick={() => setEditMode(false)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
