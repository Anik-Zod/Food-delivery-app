import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  replaceAddress,
  setAddress,
  setShowUserLogin,
  setUser,
} from "../features/appSlice";
import axiosInstance from "../api/axios";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const address = useSelector((state) => state.app.address);
  const [state, setState] = useState("login");
  const [loginError, setLoginError] = useState("");

  //React hooks form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    setLoginError(""); // clear previous error
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(setShowUserLogin(false));
        // Delay the fetch to let cookie/session set

        try {
          const addressResponse = await axiosInstance.get(
            `/address/get/${response.data.user._id}`
          );
          dispatch(replaceAddress(addressResponse.data.addresses))
          localStorage.setItem("addresses",JSON.stringify(addressResponse.data.addresses))
        } catch (error) {
          console.log(error.message);
        }
      } else {
        // Show error from backend
        setLoginError(response.data.message || "Login failed");
      }
    } catch (error) {
      setLoginError(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const handleRegistration = async (data) => {
    const { email, password, name, image } = data;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image[0]);
      const res = await axiosInstance.post("/user/register", formData);

      if (res.data.success) {
        console.log("Registration successful");
        // Optionally log the user in automatically:
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setShowUserLogin(false));
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  if (user) return null;

  return (
    <div
      onClick={() => dispatch(setShowUserLogin(false))}
      className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center text-sm text-gray-600 bg-black/70"
    >
      <form
        onSubmit={
          state === "login"
            ? handleSubmit(handleLogin)
            : handleSubmit(handleRegistration)
        }
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <>
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`border border-gray-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-red-500" : ""
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                id="image"
                className=" border px-4 w-full mt-1 rounded border-gray-300"
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Please upload an image",
                })}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
            </div>
          </>
        )}

        <div className="w-full ">
          <p>Email</p>
          <input
            {...register("email", {
              required: "Email missing",
            })}
            placeholder="Enter email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
        <div className="w-full ">
          <p>Password</p>
          <input
            {...register("password", {
              required: "Enter password",
              minLength: {
                value: 6,
                message: "password must have to minimum 6 character",
              },
            })}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
        {loginError && <p className="text-red-500">{loginError}</p>}
        {isSubmitting && (
          <p className="text-gray-600 text-sm">
            Loading <span className="animate-pulse">...</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
