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

    const [modal, setModal] = useState({
        kick: false,
        dm: false,
        revive: false,
        heal: false,
        spawn: false,
        tp: false,
        bring: false,
    });

    const handleModal = (type: keyof typeof modal, state: boolean) => {
        setModal(prevState => ({ ...prevState, [type]: state }));
    };

    const handleSubmit = (type: keyof typeof modal, payload?: string) => {
        handleModal(type, false);
        const actions = {
            kick: () => fetchNui("kickPlayer", [player?.id, payload]),
            dm: () => fetchNui("dmPlayer", [player?.id, payload]),
            revive: () => fetchNui("revivePlayer", [player?.id]),
            heal: () => fetchNui("healPlayer", [player?.id]),
            spawn: () => fetchNui("spawnPlayer", [player?.id]),
            tp: () => fetchNui("tpPlayer", [player?.id]),
            bring: () => fetchNui("bringPlayer", [player?.id]),
        };
        actions[type]();
    };

    const [playerData, setPlayerData] = useState<PlayerType | null>(null);

    useEffect(() => {
        if (player) {
            fetchNui<PlayerType>("getPlayerData", [player.id])
                .then((data) => {
                    setPlayerData(data);
                });
        }
    }, [player]);

    if (!player) {
        return <div className="text-white">Player not found</div>;
    }

    return (
        <>
            {modal.kick && <SingleModal onSubmit={(reason: string) => handleSubmit("kick", reason)} onCancel={() => handleModal("kick", false)} placeholder="Powod" label="Kick" />}
            {modal.dm && <SingleModal onSubmit={(content: string) => handleSubmit("dm", content)} onCancel={() => handleModal("dm", false)} placeholder="Tresc" label="Wiadomosc Prywatna" />}
            {modal.revive && <ConfirmModal onSubmit={() => handleSubmit("revive")} onCancel={() => handleModal("revive", false)} label="Revive" text="Czy napewno chcesz zrewowac?" />}
            {modal.heal && <ConfirmModal onSubmit={() => handleSubmit("heal")} onCancel={() => handleModal("heal", false)} label="Heal" text="Czy napewno chcesz zhealowac?" />}
            {modal.spawn && <ConfirmModal onSubmit={() => handleSubmit("spawn")} onCancel={() => handleModal("spawn", false)} label="Spawn" text="Czy napewno chcesz przeteleportowac uzytkownika na spawn?" />}
            {modal.tp && <ConfirmModal onSubmit={() => handleSubmit("tp")} onCancel={() => handleModal("tp", false)} label="TP" text="Czy napewno chcesz przeteleportowac sie do uzytkownika?" />}
            {modal.bring && <ConfirmModal onSubmit={() => handleSubmit("bring")} onCancel={() => handleModal("bring", false)} label="Bring" text="Czy napewno chcesz przeteleportowac uzytkownika do siebie?" />}
            <div className="text-white">
                <div className="m-6">
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
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleModal("kick", true)}>
                            Kick
                        </button>
                    )}
                    {perms.dm && (
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleModal("dm", true)}>
                            Wiadomosc Prywatna
                        </button>
                    )}
                    {perms.revive && (
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleModal("revive", true)}>
                            Revive
                        </button>
                    )}
                    {perms.heal && (
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleModal("heal", true)}>
                            Heal
                        </button>
                    )}
                    {perms.spawn && (
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleModal("spawn", true)}>
                            Spawn
                        </button>
                    )}
                    {perms.tp && (
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleModal("tp", true)}>
                            TP
                        </button>
                    )}
                    {perms.bring && (
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleModal("bring", true)}>
                            Bring
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Player;