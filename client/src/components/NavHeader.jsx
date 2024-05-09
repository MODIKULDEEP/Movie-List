import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/userAction/userAction";

export default function NavHeader() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  console.log(user);

  const logout = async () => {
    await dispatch(logoutUser());
    Navigate("/");
  };

  return (
    <nav className=" p-4 fixed w-full z-10 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="flex items-center" to="/">
          <img
            src="../src/assets/images/watcher.jpeg"
            alt="Logo"
            className="h-8 w-auto mr-2"
          />
          <span className="text-purple-600 text-lg font-semibold">Watcher</span>
        </Link>
        <div>
          {user?.role === "Admin" ? (
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded me-3"
              onClick={(e) => Navigate("/dashboard")}
            >
              Dashboard
            </button>
          ) : null}
          {user ? (
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
              onClick={(e) => logout()}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
              //   onClick={(e) => Navigate("/login")}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
