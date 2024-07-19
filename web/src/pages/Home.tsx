import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { PlayersType } from "../store/slices/playersSlice";

const Home: FC = () => {
    const players: PlayersType[] = useSelector((state: RootState) => state.players.players);

    return (
        <div className="h-full text-white">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
                    {players.map(player => (
                        <Link to={`/player/${player.id}`} key={player.id} className="text-lg">
                            <div
                                className="bg-gray-500 p-2 rounded-lg shadow-lg flex items-center justify-center space-x-4 cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                            >
                                {player.nick}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
