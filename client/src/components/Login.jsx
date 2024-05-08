import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../actions/userAction/userAction";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";

let fieldsState = {};

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const { user } = useSelector((state) => state.User);
  console.log("user");
  console.log(user);
  if (user) {
    Navigate("/");
  }
  console.log("user");

  // Handle Login API Integration here
  const authenticateUser = async () => {
    const result = await dispatch(
      loginHandler(loginState.email, loginState.password)
    );
    console.log(result);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        <div className="my-5">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            onChange={handleChange}
            value={loginState["email"]}
            id="email"
            name="email"
            type="email"
            required={true}
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>

        <div className="my-5">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            onChange={handleChange}
            value={loginState["password"]}
            id="password"
            name="password"
            type="password"
            required={true}
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
