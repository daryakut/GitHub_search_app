import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, ServerResponse, IRepo } from "../../modules/modules";

// Создаем API с помощью createApi
export const githubApi = createApi({
  reducerPath: "github/api", // Уникальный путь для этого API в Redux state
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }), // Базовый URL для всех запросов
  refetchOnFocus: true,
  endpoints: (build) => ({
    // Определяем эндпоинт для поиска пользователей на GitHub
    searchUsers: build.query<IUser[], string>({
      // Первый параметр IUser[] описывает массив данных, которые возвращает API.
      // Второй параметр string: аргумент, который передается в хук.
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search, // q = это стандартный параметр для поиска в GitHub API.
          per_page: 10, // Количество результатов на странице.
        },
      }),
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
        params: {
          per_page: 10,
        },
      }),
      transformResponse: (response: IRepo[]) => response,
    }),
  }),
});

// Экспортируем автоматически созданные хуки для использования в компонентах
export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;

// createApi: Создает набор эндпоинтов для взаимодействия с API GitHub. Эти эндпоинты автоматически генерируют хуки (useSearchUsersQuery, useLazyGetUserReposQuery), которые вы можете использовать в своих компонентах для выполнения запросов.
// searchUsers и getUserRepos: Это функции, которые описывают, как выполнять запросы к API (какие URL использовать, какие параметры передавать).
// transformResponse: Позволяет вам изменить формат данных перед тем, как они попадут в компонент.