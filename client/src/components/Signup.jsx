import { useState } from "react";
import FormAction from "./FormAction";
import { CreateUserApi } from "../api/userApis";

let fieldsState = {};

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    const result = await CreateUserApi(signupState);
    console.log(result);
    try {
      if (result.status === 201) {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="my-5">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          onChange={(e) => handleChange(e)}
          value={signupState["name"]}
          id="name"
          name="name"
          type="text"
          required
          placeholder="Name"
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        />
      </div>

      <div className="my-5">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          onChange={(e) => handleChange(e)}
          value={signupState["email"]}
          id="email"
          name="email"
          type="email"
          required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
        />
      </div>

      <div className="my-5">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          onChange={(e) => handleChange(e)}
          value={signupState["password"]}
          id="password"
          name="password"
          type="password"
          required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Password"
        />
      </div>

      <div className="my-5">
        <label htmlFor="confirm-password" className="sr-only">
          Confirm Password
        </label>
        <input
          onChange={(e) => handleChange(e)}
          value={signupState["confirm-password"]}
          id="confirm-password"
          name="confirm-password"
          type="password"
          required
          className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
          placeholder="Confirm Password"
        />
      </div>

      <FormAction handleSubmit={handleSubmit} text="Signup" />
    </form>
  );
}
