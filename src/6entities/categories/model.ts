import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  changeIcon,
  getCategories,
  removeCategory,
  renameCategory,
} from "../../7shared/api/categories";
import { checker } from "../helpers";
import {
  Alert,
  AlertTypes,
  CategoriesProps,
  CategoryProps,
  SerializedActionAlert,
} from "../interfaces";

const initialState: CategoriesProps = {
  categories: [],
  alerts: [],
  isLoading: false,
  isSuccess: false,
};

export const getCategoriesThunk = createAsyncThunk(
  "categories/getCategoriesThunk",
  async ({ userid }: any, { rejectWithValue }) => {
    try {
      const categories = await getCategories(userid);
      return categories;
    } catch (error: any) {
      return rejectWithValue(
        new Alert({
          reducer: "categories",
          action: "Загрузить заметки",
          message: "Не удалось загрузить заметки",
          reason: error.message,
          type: AlertTypes.error,
        })
      );
    }
  }
);

export interface AddCategoryProps {
  categoryName: string;
  categoryIcon: string;
  userid: string;
}

export const addCategoryThunk = createAsyncThunk(
  "categories/addCategoryThunk",
  async (
    { categoryName, categoryIcon, userid }: AddCategoryProps,
    { rejectWithValue }
  ) => {
    if (checker(categoryIcon) && checker(categoryName)) {
      try {
        const category = await addCategory({
          categoryIcon,
          categoryName,
          userid,
        });
        return category;
      } catch (error: any) {
        return rejectWithValue(
          new Alert({
            reducer: "categories",
            action: "Добавить категорию",
            message: "Не удалось добавить категорию",
            reason: error.message,
            type: AlertTypes.error,
          })
        );
      }
    } else {
      return rejectWithValue(
        new Alert({
          reducer: "categories",
          action: "Добавить категорию",
          message: "Не удалось добавить категорию",
          reason: "Недостаточная длина категории, либо не выбрана иконка",
          type: AlertTypes.error,
        })
      );
    }
  }
);

export interface ChangeIconProps {
  icon: string;
  categoryId: string;
}

export const changeIconThunk = createAsyncThunk(
  "categories/changeIconThunk",
  async ({ icon, categoryId }: ChangeIconProps, { rejectWithValue }) => {
    try {
      const newCategory = await changeIcon({ categoryId, icon });
      return newCategory;
    } catch (error: any) {
      return rejectWithValue(
        new Alert({
          action: "Изменить иконку",
          message: "Не удалось изменить иконку",
          reason: error.message,
          reducer: "categories",
          type: AlertTypes.error,
        })
      );
    }
  }
);

export interface RenameProps {
  category: CategoryProps;
  newName: string;
}

export const renameCategoryThunk = createAsyncThunk(
  "categories/renameCategoryThunk",
  async ({ category, newName }: RenameProps, { rejectWithValue }) => {
    if (checker(newName)) {
      try {
        await renameCategory({ category, newName });
        return { id: category.id, newName: newName };
      } catch (error: any) {
        return rejectWithValue(
          new Alert({
            action: "Изменить имя категории",
            message: "Не удалось изменить имя категории",
            reason: error.message,
            reducer: "categories",
            type: AlertTypes.error,
          })
        );
      }
    } else {
      return rejectWithValue(
        new Alert({
          action: "Изменить имя категории",
          message: "Не удалось изменить имя категории",
          reason: "Недостаточная длина имени",
          reducer: "categories",
          type: AlertTypes.error,
        })
      );
    }
  }
);

export interface RemoveProps {
  categoryId: string;
}

export const removeCategoryThunk = createAsyncThunk(
  "categories/removeCategoryThunk",
  async ({ categoryId }: RemoveProps, { rejectWithValue }) => {
    try {
      await removeCategory({ categoryId });
      return categoryId;
    } catch (error: any) {
      return rejectWithValue(
        new Alert({
          action: "Удалить категорию",
          message: "Не удалось удалить категорию",
          reason: error.message,
          reducer: "categories",
          type: AlertTypes.error,
        })
      );
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    removeCategoriesAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      const sortedCategories = action.payload.map((item) => {
        return {
          ...item,
          title: item.title
            .toLowerCase()
            .split("")
            .map((item: string, idx: number) => {
              if (idx === 0) {
                return item.toUpperCase();
              } else {
                return item;
              }
            })
            .join(""),
        };
      });
      state.categories = sortedCategories as CategoryProps[];
      state.isLoading = false;
    });
    builder.addCase(getCategoriesThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // --------------------------------
    builder.addCase(addCategoryThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCategoryThunk.fulfilled, (state, action) => {
      const category = action.payload;

      category.title = category.title
        .toLowerCase()
        .split("")
        .map((item: string, idx: number) => {
          if (idx === 0) {
            return item.toUpperCase();
          } else {
            return item;
          }
        })
        .join("");

      state.categories.unshift(category);
      state.isSuccess = true;
      state.isLoading = false;
    });
    builder.addCase(addCategoryThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // --------------------------------

    builder.addCase(changeIconThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changeIconThunk.fulfilled, (state, action) => {
      state.categories = state.categories.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      state.isLoading = false;
    });
    builder.addCase(changeIconThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // --------------------------------

    builder.addCase(renameCategoryThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(renameCategoryThunk.fulfilled, (state, action) => {
      state.categories = state.categories.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.newName };
        } else {
          return item;
        }
      });
      state.isLoading = false;
    });
    builder.addCase(renameCategoryThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // --------------------------------

    builder.addCase(removeCategoryThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeCategoryThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (item) => item.id !== action.payload
      );
      state.isLoading = false;
    });
    builder.addCase(removeCategoryThunk.rejected, (state, action) => {
      state.alerts.unshift(action.payload as SerializedActionAlert);
      state.isLoading = false;
    });

    // --------------------------------
  },
});

export const { removeCategoriesAlert } = categoriesSlice.actions;

export default categoriesSlice.reducer;
