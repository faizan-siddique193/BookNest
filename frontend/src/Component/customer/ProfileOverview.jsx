// src/components/Profile/ProfileOverview.jsx
import React, { useState, useEffect } from "react";
import { Edit, Camera, X, RotateCcw } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ProfileForm } from "../index";
import { updateUserAvatar } from "../../feature/user/userAction";

const ProfileOverview = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [previousAvatar, setPreviousAvatar] = useState(null);

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      avatar: null,
    },
  });

  // Watch for avatar file changes
  const avatarFile = watch("avatar");

  // Update preview when file changes
  useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      const file = avatarFile[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        setValue("avatar", null);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        setValue("avatar", null);
        return;
      }

      onSubmit({file});
    }
  }, [avatarFile]);

  // Submit handler
  const onSubmit = (data) => {
    if (!data.avatar || !data.avatar[0]) return;

   console.log("Profiel Data:: ", data);
   

    // Dispatch Redux Toolkit async thunk
    dispatch(updateUserAvatar({avatar: data}));
  };

  // Edit profile handler
  const onEditProfileHandler = () => {
    setIsEditProfile(!isEditProfile);
  };

  // Revert to previous avatar
  const handleRevertAvatar = () => {
    if (!previousAvatar) return;

    // Dispatch Redux Toolkit async thunk for reverting
    // dispatch(revertAvatar(previousAvatar));

    // Swap avatars
    const temp = user?.avatar;
    setPreviousAvatar(temp);
    setAvatarPreview(null);
    setValue("avatar", null);
  };

  // Remove avatar preview
  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setValue("avatar", null);
  };

  // Get current avatar to display
  const getCurrentAvatar = () => {
    if (avatarPreview) return avatarPreview;
    if (user?.avatar) return user.avatar;
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-primary">
          {isEditProfile ? "Edit Profile" : "Personal Information"}
        </h2>
        <button
          onClick={onEditProfileHandler}
          className="flex items-center text-accent hover:text-primary transition-colors"
        >
          {isEditProfile ? (
            <span className="flex items-center gap-1">
              <X className="h-4 w-4" />
              Cancel
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300">
                {getCurrentAvatar() ? (
                  <img
                    src={getCurrentAvatar()}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Uploading Overlay */}
                {loading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

              {/* Camera Icon Overlay + Hidden Input */}
              <label
                htmlFor="avatar-input"
                className="absolute inset-0 w-24 h-24 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  {...register("avatar")}
                  className="hidden"
                  disabled={loading}
                />
              </label>

              {/* Remove Button */}
             {/*  {avatarPreview && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                  title="Remove preview"
                >
                  <X className="h-3 w-3" />
                </button>
              )} */}
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-3 space-y-2">
            <label
              htmlFor="avatar-input"
              className="block w-24 text-xs bg-accent text-white py-1.5 px-3 rounded hover:bg-accent/90 transition-colors text-center cursor-pointer disabled:bg-gray-400"
            >
              {loading ? "Uploading..." : "Change"}
            </label>

           {/*  {previousAvatar && (
              <button
                type="button"
                onClick={handleRevertAvatar}
                disabled={loading}
                className="w-24 text-xs bg-gray-200 text-gray-700 py-1.5 px-3 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                title="Use previous avatar"
              >
                <RotateCcw className="h-3 w-3" />
                Previous
              </button>
            )} */}
          </div>

          {/* Error Message - You can connect this to Redux error state if needed */}
          {/* {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )} */}
        </div>

        {/* Profile Information */}
        {isEditProfile ? (
          <ProfileForm />
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted">Full Name</p>
              <p className="text-primary font-medium">
                {user?.fullName?.toUpperCase()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted">Email Address</p>
              <p className="text-primary font-medium">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted">Phone Number</p>
              <p className="text-primary font-medium">
                {user?.phone || "Not provided"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOverview;
