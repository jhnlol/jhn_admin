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
export type { PlayerType };
export type { SingleModalType };