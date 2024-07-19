import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { PlayersType } from "../store/slices/playersSlice";
import { fetchNui } from "../utils/fetchNui";
import { PermsType, PlayerType } from "../utils/types";
import SingleModal from "../modals/SingleModal";
import ConfirmModal from "../modals/ConfirmModal";

const Player: FC = () => {
    const { id = "" } = useParams<{ id: string }>();
    const PlayerId = parseInt(id);
    const players: PlayersType[] = useSelector((state: RootState) => state.players.players);
    const player = players.find(player => player.id === PlayerId);
    const perms: PermsType = useSelector((state: RootState) => state.admin.perms);

    const [kickModal, setKickModal] = useState<boolean>(false);
    const [dmModal, setDmModal] = useState<boolean>(false);
    const [reviveModal, setReviveModal] = useState<boolean>(false);
    const [healModal, setHealModal] = useState<boolean>(false);
    if (!player) {
        return <div className="text-white">Player not found</div>;
    }

    const submitKick = (reason: string) => {
        setKickModal(false);
        fetchNui("kickPlayer", [player.id, reason]);
    };

    const submitDM = (content: string) => {
        setDmModal(false);
        console.log(player.id, content);
        fetchNui("dmPlayer", [player.id, content]);
    };

    const submitRevive = () => {
        setReviveModal(false);
        fetchNui("revivePlayer", [player.id]);
    };
    const submitHeal = () => {
        setHealModal(false);
        fetchNui("healPlayer", [player.id]);
    };
    const [playerData, setPlayerData] = useState<PlayerType | null>(null);

    useEffect(() => {
        fetchNui<PlayerType>("getPlayerData", [player.id])
            .then((data) => {
                setPlayerData(data);
            });
    }, [player]);

    return (
        <>
            {kickModal && <SingleModal onSubmit={submitKick} onCancel={() => setKickModal(false)} placeholder="Powod" label="Kick" />}
            {dmModal && <SingleModal onSubmit={submitDM} onCancel={() => setDmModal(false)} placeholder="Tresc" label="Wiadmosc Prywatna" />}
            {reviveModal && <ConfirmModal onSubmit={submitRevive} onCancel={() => setReviveModal(false)} label="Revive" text="Czy napewno chcesz zrewowac?" />}
            {healModal && <ConfirmModal onSubmit={submitHeal} onCancel={() => setHealModal(false)} label="Heal" text="Czy napewno chcesz zhealowac?" />}
            <div className="text-white">
                <div className="m-4">
                    <h1 className="text-2xl font-bold">Informacje</h1>
                    <p>ID: <span className="font-bold">{player.id}</span></p>
                    <p>Nick: <span className="font-bold">{player.nick}</span></p>
                    <p>Imie i nazwisko: <span className="font-bold">{playerData?.name}</span></p>
                    <p>Praca: <span className="font-bold">{playerData?.job}</span></p>
                    <p>Ilosc pieniedzy w gotowce: <span className="font-bold">{playerData?.money}$</span></p>
                    <p>Ilosc pieniedzy w banku: <span className="font-bold">{playerData?.moneyBank}$</span></p>
                    <p>Permisje: <span className="font-bold">{playerData?.group}</span></p>
                </div>
                <div className="m-4">
                    <h1 className="text-2xl font-bold m-2">Akcje</h1>
                    {perms.kick && (
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => setKickModal(true)}>
                            Kick
                        </button>
                    )}
                    {perms.dm && (
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => setDmModal(true)}>
                            Wiadomosc Prywatna
                        </button>
                    )}
                    {perms.revive && (
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => setReviveModal(true)}>
                            Revive
                        </button>
                    )}
                    {perms.heal && (
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => setHealModal(true)}>
                            Heal
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Player;
