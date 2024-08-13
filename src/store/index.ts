import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./github/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubReducer } from "./github/github.slice";

export const store = configureStore({
  reducer: {
    // Добавляем редюсер RTK Query
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer
  },
  // Добавляем middleware RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});
setupListeners(store.dispatch) //автоматическое повторное выполнение запросов при восстановлении соединения или при фокусировке на окне браузера. 

export type RootState = ReturnType<typeof store.getState> //ReturnType<typeof store.getState> — это утилита TypeScript, которая автоматически определяет тип состояния на основе возвращаемого значения функции store.getState.

// reducer: Объект, который объединяет несколько редьюсеров. Каждый редьюсер отвечает за свою часть состояния. В вашем случае:
// githubApi.reducerPath: этот редьюсер автоматически создан RTK Query для обработки запросов к API.
// githubReducer: это ваш пользовательский редьюсер для управления избранными (favourites).
// middleware: Функции, которые выполняются перед тем, как действия попадут в редьюсеры. В вашем случае вы используете стандартный middleware и добавляете middleware от RTK Query для обработки запросов к API.
// setupListeners: Настраивает дополнительные слушатели для RTK Query, например, для повторного выполнения запросов при восстановлении соединения или при фокусе на окне браузера.