import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Listener from "./listeners/Listener";
import Server from "./pages/Server";
import Header from "./components/Header";

const App: FC = () => {
  const visible: boolean = useSelector((state: RootState) => state.app.visible);
  return (
    <BrowserRouter>
      <Listener />
      <div className={`items-center justify-center h-screen text-white ${visible ? 'flex' : 'hidden'}`}>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 w-2/3 h-2/3 bg-opacity-95 rounded-lg flex flex-col">
          <Header/>
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