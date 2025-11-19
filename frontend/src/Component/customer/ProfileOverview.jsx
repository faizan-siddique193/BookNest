import React, { useRef, useState } from "react";
import { Edit, Mail, Shield, Camera, Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, getIdToken } from "firebase/auth";
import { updateUserAvatar } from "../../feature/user/userAction";
import { toast } from "react-toastify";

const ProfileOverview = ({ onEditClick }) => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    try {
      setIsUploadingAvatar(true);

      const auth = getAuth();
      if (!auth.currentUser) {
        toast.error("Please login to upload avatar");
        return;
      }

      const token = await getIdToken(auth.currentUser, {
        forceRefresh: true,
      });

      const result = await dispatch(
        updateUserAvatar({
          avatarFile: file,
          token,
        })
      ).unwrap();

      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error(error?.message || "Failed to upload avatar");
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-primary">My Profile</h2>
        <button
          onClick={onEditClick}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200"
        >
          <Edit className="h-4 w-4" />
          <span className="font-medium text-sm">Edit</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="space-y-6">
        {/* User Info Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Avatar with Upload */}
          <div className="flex-shrink-0 relative group">
            <button
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar || loading}
              className="relative focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
            >
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
                    .join("") || "U"}
                </div>
              )}
              <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                {isUploadingAvatar ? (
                  <Loader className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isUploadingAvatar}
              className="hidden"
            />
            <p className="text-xs text-muted mt-2 text-center">
              {isUploadingAvatar ? "Uploading..." : "Click to upload"}
            </p>
          </div>

          {/* Profile Details */}
          <div className="flex-grow space-y-4 w-full">
            {/* Full Name */}
            <div>
              <p className="text-xs font-semibold text-muted mb-1">FULL NAME</p>
              <p className="text-lg font-semibold text-primary">
                {user?.fullName
                  ?.split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ") || "—"}
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-muted">EMAIL</p>
              </div>
              <p className="text-lg font-semibold text-primary break-all">
                {user?.email || "—"}
              </p>
            </div>

            {/* Role */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold text-muted">ROLE</p>
              </div>
              <p className="text-lg font-semibold text-primary capitalize">
                {user?.role || "customer"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
