import { FC } from "react";
import { ConfirmModalType } from "../utils/types";
const ConfirmModal: FC<ConfirmModalType> = ({ label, text, onSubmit, onCancel }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={onCancel}></div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg z-10">
                <h1 className="text-3xl font-bold text-center mb-4">{label}</h1>
                <h1 className="text-xl font-bold text-center mb-4">{text}</h1>
                <div className="flex justify-center ">
                    <button onClick={onSubmit} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4">
                        Potwierdz
                    </button>
                    <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                        Anuluj
                    </button>
                </div>
            </div>
        </div>
    )
};
export default ConfirmModal;