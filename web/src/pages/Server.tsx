import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SingleModal from "../modals/SingleModal";
import { fetchNui } from "../utils/fetchNui";
import { PermsType } from "../utils/types";

const Server: FC = () => {
    const perms: PermsType = useSelector((state: RootState) => state.admin.perms);
    const [modal, setModal] = useState({
        announcment: false
    });
    const handleModal = (type: keyof typeof modal, state: boolean) => {
        setModal(prevState => ({ ...prevState, [type]: state }));
    };
    const handleSubmit = (type: keyof typeof modal, payload?: string) => {
        handleModal(type, false);
        const actions = {
            announcment: () => fetchNui("sendAnnouncment", [payload]),
        };
        actions[type]();
    };

    return (
        <>
            {modal.announcment && (
                <SingleModal 
                    onSubmit={(content: string) => handleSubmit("announcment", content)} 
                    onCancel={() => handleModal("announcment", false)} 
                    placeholder="Treść" 
                    label="Ogłoszenie"
                />
            )}
            <div className="container mx-auto py-8">
                <div className="flex flex-wrap justify-center gap-6 m-6">
                    {perms.announcment && (
                        <button
                            className="w-full sm:w-auto text-lg bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                            onClick={() => handleModal("announcment", true)}
                        >
                            Ogłoszenie
                        </button>
                    )}
                    {perms.saveAll && (
                        <button
                            className="w-full sm:w-auto text-lg bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
                            onClick={() => fetchNui("saveAll")}
                        >
                            Save All
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Server;
