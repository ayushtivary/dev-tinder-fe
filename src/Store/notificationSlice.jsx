import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001";

// Fetch progress only
export const fetchNotificationProgress = createAsyncThunk(
  "notification/fetchProgress",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/notification/progress`);
      return res.data.progress; // backend should return { progress: number }
    } catch {
      return rejectWithValue("Failed to fetch progress");
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    progress: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchNotificationProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
