import { FC, useRef } from "react";
import { SingleModalType } from "../utils/types";

const SingleModal: FC<SingleModalType> = ({ onSubmit, onCancel, placeholder, label }) => {
    const reasonRef = useRef<HTMLTextAreaElement>(null);

    const submit = () => {
        if (!reasonRef.current) return;
        const reason: string = reasonRef.current.value;
        if (!reason) return;
        onSubmit(reason);
        reasonRef.current.value = "";
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={onCancel}></div>
            <div className="bg-black p-8 rounded-lg shadow-lg z-10">
                <h1 className="text-3xl font-bold text-center mb-4">{label}</h1>
                <textarea ref={reasonRef} placeholder={placeholder} className="w-full h-32 rounded-lg p-2 mb-4 bg-gray-900"></textarea>
                <div className="flex justify-center ">
                    <button onClick={submit} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4">
                        Potwierdz
                    </button>
                    <button onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                        Anuluj
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleModal;
