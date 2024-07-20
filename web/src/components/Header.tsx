import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { setVisible } from "../store/slices/appSlice";
import { useDispatch } from "react-redux";
import { fetchNui } from "../utils/fetchNui";

const Header: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const closeMenu= (): void => {
      dispatch(setVisible(false));
      fetchNui("closeMenu");
    }
    return (
      <div className="header mt-3 flex items-center px-4 justify-between">
        <h1 className="text-3xl font-bold">JHN ADMIN MENU</h1>
        <div className="flex items-center space-x-4">
          {location.pathname === "/server" ? (
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Sterowanie Graczami
            </Link>
          ) : (
            <Link
              to="/server"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Sterowanie Serwerem
            </Link>
          )}
          <span className="text-right p-3 cursor-pointer" onClick={closeMenu}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
      </div>
    );
}
export default Header;