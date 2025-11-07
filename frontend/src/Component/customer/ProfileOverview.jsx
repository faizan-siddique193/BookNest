// src/components/Profile/ProfileOverview.jsx
import React, { useState } from "react";
import { Edit, X } from "lucide-react";
import { useSelector } from "react-redux";
import { ProfileForm } from "../index";

const ProfileOverview = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const { user, loading } = useSelector((state) => state.user);

  // edit profile
  const onEditProfileHandler = () => {
    setIsEditProfile(!isEditProfile);
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
            <span>Cancel</span>
          ) : (
            <span>
              <Edit className="h-4 w-4 mr-1 inline-block" />
              Edit
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">


            
            <img
              src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar}
              alt="Profile image"
              className="w-full h-full object-cover"
            ></img>
            
            <form action="" className="w-full h-full">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="w-full h-full rounded-full cursor-pointer opacity-0"
              />
            </form>

          </div>
        </div>

        {isEditProfile ? (
          <ProfileForm />
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted">Full Name</p>
              <p className="text-primary font-medium">
                {user?.fullName.toUpperCase()}
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
