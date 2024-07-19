import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PermsType } from '../../utils/types';

interface AdminState {
    perms: PermsType; 
}

const initialState: AdminState = {
    perms: {
        kick: false,
        dm: false,
        revive: false,
        heal: false,
        announcment: false,
    },
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setPerms: (state, action: PayloadAction<PermsType>) => {
            state.perms = action.payload;
        },
    },
});

export const { setPerms } = adminSlice.actions;
export default adminSlice.reducer;
