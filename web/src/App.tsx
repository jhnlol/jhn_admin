import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { debugData } from "./utils/debugData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Listener from "./listeners/Listener";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const App: FC = () => {
  const visible = useSelector((state: RootState) => state.app.visible);

  useEffect(() => {
    debugData([
      {
        action: 'setVisible',
        data: {
          players: [
            {
              id: "1",
              nick: "JHN",
            },
            {
              id: "2",
              nick: "JAN",
            },
          ],
        },
      },
    ]);
  }, []);

  return (
    <BrowserRouter>
      <Listener />
      <div className={`items-center justify-center h-screen text-white ${visible ? 'flex' : 'hidden'}`}>
        <div className="bg-black w-2/3 h-2/3 rounded-lg bg-opacity-90 flex flex-col">
          <div className="header mt-3">
            <h1 className="text-center text-3xl font-bold">JHN ADMIN MENU</h1>
            <span className="text-right">
              <FontAwesomeIcon icon={faX}/>
            </span>
          </div>
          <div className="content">
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/player/:id" element={<Player />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
