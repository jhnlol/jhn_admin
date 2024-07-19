import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { setVisible } from "../store/slices/appSlice";
import { setPlayers } from "../store/slices/playersSlice";
import { setPerms } from "../store/slices/adminSlice";

const Listener: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            const { action, data } = e.data;
            if (action === "setVisible") {
                navigate("/");
                dispatch(setVisible(true));
                dispatch(setPlayers(data.players));
                dispatch(setPerms(data.perms));
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