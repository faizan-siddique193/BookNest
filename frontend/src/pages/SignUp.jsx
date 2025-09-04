import React, { useEffect, useState } from "react";
import { Input } from "../Component/index.js";
import { useForm } from "react-hook-form";
import { EyeOff, Eye, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import signUpPageSideImage from "../assets/Readingbook.gif"; // Assuming you have an image for the signup page
import { useDispatch, useSelector } from "react-redux";
import { userSignUp, googleSignIn } from "../feature/auth/authAction.js";
import {
  getLoginUser,
  storeRegisterUserInDb,
} from "../feature/user/userAction.js";
import {
  clearSignInWithGoogleAuthState,
  clearSignUpAuthState,
} from "../feature/auth/authSlice.js";
import { toast } from "react-toastify";
import { clearUserDbState } from "../feature/user/userSlice.js";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //    handleTogglePasswordVisibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // useform hook
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // get focus at fullName

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  const handleSubmitForm = async (data) => {
    const { fullName, email, password } = data;
    try {
      const token = await dispatch(userSignUp({ email, password })).unwrap();
      await dispatch(storeRegisterUserInDb({ token, fullName })).unwrap();
      reset();
      navigate("/sign-in");
      dispatch(clearSignUpAuthState());
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

  /*   // dispatch create user action
  useEffect(() => {
    if (signUp.success && user) {
      const token = user;
      console.log("Token:: ", token); // TODO: DELETE THIS COMMENT
      dispatch(storeRegisterUserInDb({ fullName: localFullName, token }));
    }
  }, [signUp.success, user, localFullName, dispatch]);

  // reset input fields
  useEffect(() => {
    if (signUp.success) {
      reset();
      setLocalFullName("");
      // redirect to login page
      if (userSuccess) {
        navigate("/sign-in");
      }
    }
  }, [signUp.success, reset, userSuccess]);

  // clear signUpState
  useEffect(() => {
    dispatch(clearSignUpAuthState());
  }, [dispatch]); */

  // handle google login
  const handleGoogleLogin = async () => {
    try {
      const token = await dispatch(googleSignIn()).unwrap();

      // send token to the backend
      await dispatch(storeRegisterUserInDb({ token })).unwrap();

      // navigate
      // clear state after user stored in db
      dispatch(clearUserDbState());

      // get loggedin user
      dispatch(getLoginUser({ token }));

      navigate("/home");
      dispatch(clearUserDbState());
      dispatch(clearSignInWithGoogleAuthState());
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
            src={signUpPageSideImage}
            className="w-full h-full object-cover rounded-2xl"
            alt="book_image"
            loading="lazy"
          />
        </div>
        {/* form */}
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-text font-bold text-3xl text-center">
              Welcome to BookNest
            </h2>
            <p className="text-center text-muted">
              Create your account to explore and order your favorite books.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="w-full space-y-4"
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
            {/* password */}
            <div className="rounded-lg bg-background relative">
              <Input
                className="py-3 px-2 text-muted focus:outline-none focus:ring-2 focus:ring-accent w-full bg-background rounded-2xl"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
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
            {/*submit  button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-2xl hover:bg-[#34495E] transition-colors duration-300"
            >
              {signUp?.loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" size={16} />
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
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
            {/* {
           authLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin" size={16} />
                Signing Up with Google...
              </span>
            ) : (
              "Sign Up with Google"
            )
           } */}
            <span>Continue with google</span>
          </button>
          {/* dont't have an account */}
          <div className="mt-4 text-center text-sm text-muted">
            Already have an account{" "}
            <Link
              to="/sign-in"
              className="text-accent underline underline-offset-3"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
