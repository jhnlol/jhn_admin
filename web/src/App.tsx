import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Listener from "./listeners/Listener";
import { setVisible } from "./store/slices/appSlice";
import { fetchNui } from "./utils/fetchNui";
import Server from "./pages/Server";
import Header from "./components/Header";

const App: FC = () => {
  const visible = useSelector((state: RootState) => state.app.visible);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Listener />
      <div className={`items-center justify-center h-screen text-white ${visible ? 'flex' : 'hidden'}`}>
        <div className="bg-black w-2/3 h-2/3 rounded-lg bg-opacity-90 flex flex-col">
          <Header closeMenu={() => {
            dispatch(setVisible(false));
            fetchNui("closeMenu");
          }} />
          <div className="content flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
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