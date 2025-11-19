# Profile Update Feature Documentation

## Overview

A complete profile update feature has been implemented allowing users to edit their profile information with certain restrictions. Users can update their full name, but email and role fields are protected and cannot be changed.

## Features Implemented

### 1. **Backend Implementation**

#### Controller: `updateUserProfile`

- **File**: `backend/src/controllers/user.controller.js`
- **Functionality**:
  - Only allows updating the `fullName` field
  - Email and role fields are protected from updates
  - Validates user authentication via Firebase UID
  - Returns updated user object on success
  - Logs attempts to update restricted fields

#### Route

- **File**: `backend/src/routes/user.route.js`
- **Endpoint**: `PUT /user/profile`
- **Middleware**: `verifyFirebaseToken`
- **Protection**: Only authenticated users can update their profile

### 2. **Frontend Redux Implementation**

#### Action: `updateUserProfile`

- **File**: `frontend/src/feature/user/userAction.js`
- **Functionality**:
  - Async thunk that sends a PUT request to `/user/profile`
  - Passes Firebase token in Authorization header
  - Sends only `fullName` in request body
  - Handles error responses gracefully

#### Reducer: `updateUserProfile`

- **File**: `frontend/src/feature/user/userSlice.js`
- **States Handled**:
  - `pending`: Sets loading to true
  - `fulfilled`: Updates user object and sets success flag
  - `rejected`: Sets error message and loading to false

### 3. **Frontend UI Components**

#### ProfileForm Component

- **File**: `frontend/src/Component/customer/ProfileForm.jsx`
- **Features**:
  - Full name input field (editable)
  - Email field (disabled with warning icon and explanation)
  - Role field (disabled with warning icon and explanation)
  - Submit button with loading state
  - Cancel button
  - Form validation using React Hook Form
  - Toast notifications for success/error

#### ProfileOverview Component

- **File**: `frontend/src/Component/customer/ProfileOverview.jsx`
- **Features**:
  - Displays user profile information
  - Shows Edit button to switch to edit mode
  - Avatar placeholder with user's first initial
  - Displays member since date
  - Shows current role and email (read-only)

#### ProfilePage Component

- **File**: `frontend/src/pages/customer/ProfilePage.jsx`
- **Features**:
  - Fetches user profile on component mount using Firebase token
  - Manages edit/view mode toggle
  - Passes user data to profile components
  - Handles profile update callbacks

## Field Restrictions

### Protected Fields (Cannot be updated)

1. **Email Address**

   - Protected for security reasons
   - Shows orange warning icon
   - Display message: "Email cannot be changed for security reasons"
   - Field is disabled and grayed out

2. **Role**
   - System-assigned field
   - Cannot be changed by users
   - Shows orange warning icon
   - Display message: "Role cannot be changed"
   - Field is disabled and grayed out

### Editable Fields

1. **Full Name**
   - Validation: 3-50 characters
   - Required field
   - Only this field is sent to backend

## User Flow

1. User navigates to Profile page
2. Profile data is fetched automatically using Firebase token
3. User clicks "Edit" button to enter edit mode
4. ProfileForm is displayed with:
   - Editable Full Name field
   - Disabled Email field with warning
   - Disabled Role field with warning
5. User modifies Full Name as desired
6. User clicks "Save Changes" button
7. Form validates and submits to backend
8. Backend updates only the fullName field
9. Success toast notification appears
10. ProfileOverview refreshes with updated data
11. Edit mode is automatically closed

## Technical Stack

- **Backend**: Node.js/Express with MongoDB
- **Frontend**: React with Redux Toolkit
- **Authentication**: Firebase
- **Form Handling**: React Hook Form
- **Notifications**: React Toastify
- **UI Icons**: Lucide React

## Error Handling

- Invalid full name format shows validation errors
- Network errors display toast notifications
- Token refresh handled automatically via Firebase
- Failed updates show error messages to users
- Loading states prevent duplicate submissions

## Security Features

- Email and role fields are hardware-protected (disabled)
- Only fullName is accepted by backend
- All requests require Firebase authentication token
- Attempts to update restricted fields are logged
- Frontend and backend validation ensure data integrity

## Testing Checklist

- [ ] User can navigate to profile page
- [ ] Profile data loads correctly from backend
- [ ] Edit button switches to edit mode
- [ ] Full name field can be edited
- [ ] Email field is disabled with warning icon
- [ ] Role field is disabled with warning icon
- [ ] Form validation works for full name
- [ ] Submit button shows loading state
- [ ] Profile updates successfully
- [ ] Changes persist after page refresh
- [ ] Success toast notification appears
- [ ] Profile overview shows updated data
- [ ] Cancel button closes edit mode without saving
