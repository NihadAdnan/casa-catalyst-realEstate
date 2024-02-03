import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-bold my-11">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-semibold">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-zinc-950 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-60"
        >
          {loading ? "Loading....." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-semibold">Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 font-semibold">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 font-semibold">{error}</p>}
    </div>
  );
}
