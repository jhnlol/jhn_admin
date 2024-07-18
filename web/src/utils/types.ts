interface PlayerType {
    id: number;
    nick: string;
    name: string;
    job: string;
    money: number;
    moneyBank: number;
}
interface SingleModalType {
    onSubmit: (arg1: string) => void;
    onCancel: () => void;
    placeholder: string;
    label: string;
}
interface ConfirmModalType {
    label: string,
    text: string,
    onSubmit: () => void,
    onCancel: () => void,
}

export type { PlayerType };
export type { SingleModalType };
export type { ConfirmModalType };