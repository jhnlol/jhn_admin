import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    visible: boolean;
}

const initialState: AppState = {
    visible: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setVisible: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload;
        },
    },
});


export const { setVisible } = appSlice.actions;
export default appSlice.reducer;