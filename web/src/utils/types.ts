interface PlayerType {
    id: number;
    nick: string;
    name: string;
    job: string;
    money: number;
    moneyBank: number;
    group: string;
    discordID: string;
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
    announcment: boolean;
    spawn: boolean;
    saveAll: boolean;
    tp: boolean;
    bring: boolean;
}
interface PlayersType {
    id: number;
    nick: string;
    discordAvatar: string;
}
interface MapTypes {
    playerCoords: { x: number, y: number };
}  
export type { PlayerType };
export type { SingleModalType };
export type { ConfirmModalType };
export type { PermsType };
export type { PlayersType };
export type {MapTypes}