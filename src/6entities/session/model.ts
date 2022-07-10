import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../../7shared/api/auth";
import { getUser } from "../../7shared/api/user";

export interface UserProps {
  id: string;
  login: string;
  img: string;
  email: string;
}

interface SessionProps {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: UserProps;
}

const initialState: SessionProps = {
  error: "",
  isAuth: false,
  isLoading: false,
  user: { id: "", login: "", img: "", email: "" },
};

export interface SignupProps {
  email: string;
  login: string;
  password: string;
  passwordConfirm: string;
}

export const signupThunk = createAsyncThunk(
  "session/signupThunk",
  async (
    { email, login, password, passwordConfirm }: SignupProps,
    { rejectWithValue }
  ) => {
    if (email && password && passwordConfirm && login) {
      if (password === passwordConfirm) {
        const user = await signup(email, login, password);
        return user;
      } else {
        return rejectWithValue("Пароли не совпадают");
      }
    } else {
      return rejectWithValue("Вы заполнили не все поля");
    }
  }
);

export interface SigninProps {
  email: string;
  password: string;
}

export const signinThunk = createAsyncThunk(
  "session/signinThunk",
  async ({ email, password }: SigninProps, { rejectWithValue }) => {
    if (email && password) {
      try {
        const user = await signin(email, password);
        return user;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    } else {
      return rejectWithValue("Вы заполнили не все поля");
    }
  }
);

export const signOutThunk = createAsyncThunk(
  "session/signOutThunk",
  async (_, { rejectWithValue }) => {
    try {
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "session/getUserThunk",
  async ({ userid }: any, { rejectWithValue }) => {
    try {
      const user = await getUser(userid);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ---------------------

    builder.addCase(signinThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.user = action.payload as UserProps;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(signinThunk.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ---------------------

    builder.addCase(signOutThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signOutThunk.fulfilled, (state, action) => {
      state.user = { email: "", id: "", img: "", login: "" };
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(signOutThunk.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ---------------------

    builder.addCase(getUserThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.user = action.payload as UserProps;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
    // ---------------------
  },
});

export default sessionSlice.reducer;
