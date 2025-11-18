// src/components/Profile/ProfileOverview.jsx
import React, { useState } from "react";
import { Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { ProfileForm } from "../index";

const ProfileOverview = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { user } = useSelector((state) => state.user);

  const onEditProfileHandler = () => {
    setIsEditProfile(!isEditProfile);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-primary">
          {/*  {isEditProfile ? "Edit Profile" : */} Personal Information
          {/* } */}
        </h2>
        {/* <button
          onClick={onEditProfileHandler}
          className="flex items-center text-accent hover:text-primary transition-colors"
        >
          {isEditProfile ? (
            <span>Cancel</span>
          ) : (
            <span className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </span>
          )}
        </button> */}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-primary font-bold">
            {user?.fullName?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Profile Info */}
        {/*   {isEditProfile ? (
          <ProfileForm />
        ) : ( */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted">Full Name</p>
            <p className="text-primary font-medium">{user?.fullName}</p>
          </div>

          <div>
            <p className="text-sm text-muted">Email Address</p>
            <p className="text-primary font-medium">{user?.email}</p>
          </div>

          {/* not provided by profile */}
          {/* <div>
              <p className="text-sm text-muted">Phone Number</p>
              <p className="text-primary font-medium">
                {user?.phone || "Not provided"}
              </p>
            </div> */}
        </div>
        {/*  )} */}
      </div>
    </div>
  );
};

export default ProfileOverview;
