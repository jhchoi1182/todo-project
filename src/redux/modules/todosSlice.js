import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodos = createAsyncThunk(
  "GET_TODOS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// 백단? 노드나 서버

export const __toggleStatusTodo = createAsyncThunk(
  "TOGGLE_STATUS_TODO",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${payload.id}`, {
        isDone: !payload.isDone,
      });
      return thunkAPI.fulfillWithValue(payload.id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "DELETE_TODO",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      console.log("에러는", err);
      //서버에러 =>
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  todos: [],
  todo: {},
  isLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodoByID: (state, action) => {
      state.todo = state.todos.filter((el) => action.payload === el.id)[0];
    },
  },
  extraReducers: {
    //add
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //토글부분
    [__toggleStatusTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__toggleStatusTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((user) =>
        user.id === action.payload ? { ...user, isDone: !user.isDone } : user
      );
    },
    [__toggleStatusTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //딜리트부분
    [__deleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { deleteTodo, getTodoByID } = todosSlice.actions;
export default todosSlice.reducer;
