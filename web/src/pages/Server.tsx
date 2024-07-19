import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SingleModal from "../modals/SingleModal";
import { fetchNui } from "../utils/fetchNui";
import { PermsType } from "../utils/types";

const Server: FC = () => {
    const perms: PermsType = useSelector((state: RootState) => state.admin.perms);
    const [announcmentModal, setAnnouncmentModal] = useState<boolean>(false);

    const submitAnnouncment = (content: string) => {
        setAnnouncmentModal(false);
        console.log(content);
        fetchNui("sendAnnouncment", [content]);
    };

    return (
        <>
            {announcmentModal && (<SingleModal onSubmit={submitAnnouncment} onCancel={() => setAnnouncmentModal(false)} placeholder="Tresc" label="Ogloszenie"/>)}
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
                    {perms.announcment && (
                        <button
                            className="texr-lg bg-gray-500 p-2 rounded-lg shadow-lg flex items-center justify-center space-x-4 cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                            onClick={() => setAnnouncmentModal(true)} 
                        >
                            Ogloszenie
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Server;
