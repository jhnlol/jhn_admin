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
            {modal.announcment && (<SingleModal onSubmit={(content: string) => handleSubmit("announcment", content)} onCancel={() => handleModal("announcment", false)} placeholder="Tresc" label="Ogloszenie"/>)}
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
                    {perms.announcment && (
                        <button
                            className="texr-lg bg-gray-500 p-2 rounded-lg shadow-lg flex items-center justify-center space-x-4 cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                            onClick={() => handleModal("announcment", true)} 
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
