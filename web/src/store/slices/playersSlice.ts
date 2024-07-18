import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayersType {
  id: number;
  nick: string;
}


interface PlayerState {
  players: PlayersType[];
}

const initialState: PlayerState = {
  players: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<PlayersType[]>) => {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
export type { PlayersType };