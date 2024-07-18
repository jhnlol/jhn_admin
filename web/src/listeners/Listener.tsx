import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { setVisible } from "../store/slices/appSlice";
import { setPlayers } from "../store/slices/playersSlice";

const Listener: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            const { action, data } = e.data;
            if (action === "setVisible") {
                dispatch(setVisible(true));
                console.log("Xd")
                console.log(data.players)
                dispatch(setPlayers(data.players));
            }
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [dispatch, navigate]); 

    return null;
}
export default Listener;