import React, { useState } from "react";
import { Input } from "../Component/index.js";
import { useForm } from "react-hook-form";
import { EyeOff, Eye, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import singInPageSideImage from "../assets/Womanreading.gif"; // Assuming you have an image for the signup page
import { userSignIn, googleSignIn } from "../feature/auth/authAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  getLoginUser,
  getUserProfile,
  storeRegisterUserInDb,
} from "../feature/user/userAction.js";
import {
  clearSignInAuthState,
  clearSignInWithGoogleAuthState,
} from "../feature/auth/authSlice.js";
import { clearUserDbState } from "../feature/user/userSlice.js";
import { use } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //    handleTogglePasswordVisibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // useform
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // get focus at email
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const handleFormSubmit = async (data) => {
    const { email, password } = data;
    try {
      const token = await dispatch(userSignIn({ email, password })).unwrap();
      reset();
      await dispatch(getLoginUser({ token })).unwrap();
      // clear signin state
      navigate("/");
      // send token to the backend
      toast.success("Logined Successfully");
      dispatch(clearSignInAuthState());
      dispatch(clearUserDbState());
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };


  // handle google login
  const handleGoogleLogin = async () => {
    try {
      const token = await dispatch(googleSignIn()).unwrap();

      // send token to the backend
      await dispatch(storeRegisterUserInDb({ token })).unwrap();

      // clear state after store user in the db
      dispatch(clearUserDbState());

      await dispatch(getLoginUser({ token })).unwrap();
      // navigate
      navigate("/home");
      dispatch(clearSignInWithGoogleAuthState());
      dispatch(clearUserDbState());
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

 

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-3xl w-full border rounded-2xl p-6 flex flex-col gap-y-5 sm:flex-row sm:gap-x-5 bg-white">
        {/* image */}
        <div className="w-full aspect-video md:aspect-square">
          <img
            src={singInPageSideImage}
            className="w-full h-full object-cover rounded-2xl"
            alt="book_image"
            loading="lazy"
          />
        </div>
        {/* form */}
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-text font-bold text-3xl text-center">
              Welcome Back
            </h2>
            <p className="text-center text-muted">
              Please login to your account.
            </p>
          </div>

          <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
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
            {/* password */}
            <div className="rounded-lg bg-background relative">
              <Input
                className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-2xl"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_+-=]{8,}$/i,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {/* icon */}
              {showPassword ? (
                <Eye
                  size={16}
                  className="absolute right-3 top-4 text-muted cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                />
              ) : (
                <EyeOff
                  size={16}
                  className="absolute right-3 top-4
                  text-muted cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                />
              )}
              {errors.password && (
                <span className="text-danger text-xs ml-2">
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-2xl hover:bg-[#34495E] transition-colors duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin" size={16} />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          {/* continue with  */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-muted"></div>
            <span className="mx-2 text-muted  text-sm">or continue with</span>
            <div className="flex-grow h-px bg-muted"></div>
          </div>

          {/* continue with google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-2xl  py-3 hover:bg-gray-100"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Login with Google</span>
          </button>
          {/* dont't have an account */}
          <div className="mt-4 text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-accent underline underline-offset-3"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
