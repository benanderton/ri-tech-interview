import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OmdbConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface SettingsState {
  omdbConfig: OmdbConfig;
  // other settings could go here
}

const initialState: SettingsState = {
  omdbConfig: {
    apiKey: '',
    baseUrl: undefined,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setOmdbConfig(state, action: PayloadAction<OmdbConfig>) {
      state.omdbConfig = action.payload;
      // Persist the configuration to localStorage
      localStorage.setItem('omdbConfig', JSON.stringify(action.payload));
    },
  },
});

export const { setOmdbConfig } = settingsSlice.actions;
export default settingsSlice.reducer;