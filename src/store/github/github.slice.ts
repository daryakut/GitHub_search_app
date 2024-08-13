import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAV_KEY = "rfk";

interface GitHubState {
  favourites: string[];
}
function loadFavouritesFromLocalStorage(): string[] {
  try {
    const data = localStorage.getItem(LS_FAV_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse favourites from localStorage:", error);
    return [];
  }
}
const initialState: GitHubState = {
  favourites: loadFavouritesFromLocalStorage(),
};

export const gitHubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    // Редьюсер для добавления элемента в избранное
    addFavourite(state, action: PayloadAction<string>) {
      // Добавляем новый элемент в массив favourites
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    // Редьюсер для удаления элемента из избранного
    removeFavourite(state, action: PayloadAction<string>) {
      // Фильтруем массив favourites, исключая элемент с payload
      state.favourites = state.favourites.filter(
        (item) => item !== action.payload
      );
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});

// Экспортируем действия для использования в компонентах
export const { addFavourite, removeFavourite } = gitHubSlice.actions;

// Экспортируем редьюсер для добавления в store
export const githubActions = gitHubSlice.actions;
export const githubReducer = gitHubSlice.reducer;



// Этот код создает слайс Redux, который управляет списком избранных элементов. Он включает в себя:

// Инициализацию начального состояния из localStorage.
// Два редьюсера для добавления и удаления элементов из списка избранных.
// Сохранение обновленного состояния в localStorage при каждом изменении.

// createSlice — это функция из @reduxjs/toolkit, которая упрощает создание Redux слайсов. Слайс включает в себя:

// Имя слайса (name): В данном случае "github". Оно используется для генерации типов действий (action types).
// Начальное состояние (initialState): Состояние, которое было определено ранее.
// Редьюсеры (reducers): Это функции, которые определяют, как состояние должно изменяться в ответ на действия.
// Редьюсеры:
// addFavourite:

// Принимает строку (например, идентификатор или имя элемента) в action.payload.
// Добавляет этот элемент в массив favourites.
// Обновляет localStorage, чтобы сохранить текущее состояние favourites.
// removeFavourite:

// Принимает строку в action.payload.
// Удаляет этот элемент из массива favourites с помощью метода filter.
// Обновляет localStorage, чтобы сохранить текущее состояние favourites.