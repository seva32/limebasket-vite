import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import loadData from "../../utils/fetch/loadData";
import { RootState } from "../index";

interface PostsState {
  list: any[];
  error: SerializedError | null | string;
  loading: "idle" | "pending" | "succeeded" | "failed";
  currentRequestId: string | undefined;
}

const initialState: PostsState = {
  list: [],
  error: null,
  loading: "idle",
  currentRequestId: undefined,
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await loadData("postsy");
      return response.data;
    } catch (error: any) {
      // return rejectWithValue("Error loading posts.");
      return rejectWithValue(error.message as string || 'Error loading posts - default msg');
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPosts(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state = { ...initialState, list: action.payload };
      }
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        // state = { ...initialState, error: action.payload as string }; // using rejectWithValue
        state = { ...initialState, error: action.error as string }; // using rejectWithValue
        // state.error = action.error; // { error: {messagge }, payload: , meta: }
      }
    });
  },
});

export const { clearPosts } = postSlice.actions;

export const posts = (state: RootState) => {
  return state.posts;
};

export default postSlice.reducer;
