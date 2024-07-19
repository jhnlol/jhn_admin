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
interface PermsType {
    kick: boolean;
    dm: boolean;
    revive: boolean;
    heal: boolean;
}
interface PlayersType {
    id: number;
    nick: string;
  }
  
export type { PlayerType };
export type { SingleModalType };
export type { ConfirmModalType };
export type { PermsType };
export type { PlayersType };