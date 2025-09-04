// src/components/Profile/ProfileOverview.jsx
import React from 'react';
import { Edit } from 'lucide-react';

const ProfileOverview = ({ userData, onEditClick }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-primary">Profile Information</h2>
        <button
          onClick={onEditClick}
          className="flex items-center text-accent hover:text-primary transition-colors"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {userData.avatar ? (
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl text-muted">
                {userData.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted">Full Name</p>
            <p className="text-primary font-medium">{userData.name}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted">Email Address</p>
            <p className="text-primary font-medium">{userData.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted">Phone Number</p>
            <p className="text-primary font-medium">
              {userData.phone || 'Not provided'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;