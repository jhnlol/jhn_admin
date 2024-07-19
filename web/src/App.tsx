import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Listener from "./listeners/Listener";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { setVisible } from "./store/slices/appSlice";
import { fetchNui } from "./utils/fetchNui";
import Server from "./pages/Server";
const App: FC = () => {
  const visible = useSelector((state: RootState) => state.app.visible);
  const dispatch = useDispatch();
  const closeMenu = (): void => {
    dispatch(setVisible(false));
    fetchNui("closeMenu");
  };
  return (
    <BrowserRouter>
      <Listener />
      <div className={`items-center justify-center h-screen text-white ${visible ? 'flex' : 'hidden'}`}>
        <div className="bg-black w-2/3 h-2/3 rounded-lg bg-opacity-90 flex flex-col">
        <div className="header mt-3 flex items-center px-4 justify-between">
            <h1 className="text-3xl font-bold">JHN ADMIN MENU</h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/server"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Sterowanie Serwerem
              </Link>
              <span className="text-right p-3" onClick={closeMenu}>
                <FontAwesomeIcon icon={faX} />
              </span>
            </div>
          </div>
          <div className="content">
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/player/:id" element={<Player />} />
              <Route path="/server" element={<Server />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;