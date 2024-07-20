import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { PlayersType } from "../store/slices/playersSlice";

const Home: FC = () => {
    const players: PlayersType[] = useSelector((state: RootState) => state.players.players);
    const [search, setSearch] = useState("");
    const searched = players.filter(player =>
        player.nick.toLowerCase().includes(search.toLowerCase()) ||
        player.id.toString().includes(search)
    );
    return (
        <div className="h-full py-12 text-white">
            <div className="container mx-auto px-4">
                <input
                    type="text"
                    placeholder="Szukaj gracza po nicku lub ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 mb-6 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searched.map(player => (
                        <Link to={`/player/${player.id}`} key={player.id} className="group">
                            <div
                                className="bg-gray-700 p-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
                            >
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold mb-2">{player.nick}</h2>
                                    <div className="text-gray-400">ID: {player.id}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
