import React, { useEffect, useState } from "react";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import { IRepo } from "../modules/modules";
import RepoCard from "../components/RepoCard";

// Интерфейс пропсов, хотя он здесь не используется, но оставлен для возможных будущих расширений
interface Props {}

// Основной компонент страницы
const HomePage = (props: Props) => {
  // Локальное состояние для хранения введенного пользователем поискового запроса
  const [search, setSearch] = useState("");

  // Локальное состояние для управления отображением выпадающего списка
  const [dropdown, setDropdown] = useState(false);

  // Используем хук useDebounce для уменьшения количества запросов, когда пользователь вводит текст
  const debouncedSearch = useDebounce(search);

  // Выполняем запрос для поиска пользователей на GitHub, используя RTK Query
  const {
    isLoading, // Состояние загрузки
    isError, // Состояние ошибки
    data: users, // Полученные данные о пользователях
  } = useSearchUsersQuery(debouncedSearch, {
    skip: debouncedSearch.length < 2, // Пропускаем запрос, если длина поисковой строки меньше 2 символов
    refetchOnFocus: true, // Автоматически обновляем данные при фокусе на окне
  });

  // Используем ленивый запрос для получения репозиториев пользователя
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  // Эффект для управления отображением выпадающего списка в зависимости от длины строки поиска и наличия пользователей
  useEffect(() => {
    console.log(debouncedSearch);
    setDropdown(debouncedSearch.length > 2 && users?.length! > 0); // ?. — безопасный доступ к свойствам объекта, ! — утверждение, что значение не null/undefined
  }, [debouncedSearch, users]);

  // Функция для отображения репозиториев выбранного пользователя
  function showUserDeatails(username: string) {
    fetchRepos(username); // Выполняем запрос для получения репозиториев пользователя
    setDropdown(false); // Закрываем выпадающий список
  }

  console.log("repos", repos); // Логируем полученные репозитории для отладки

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {/* Отображаем сообщение об ошибке, если запрос завершился неудачей */}
      {isError && <p className="text-center text-red-600">Server Error</p>}

      {/* Отображаем сообщение о загрузке, если данные еще загружаются */}
      {isLoading && <p className="text-center">Loading...</p>}

      <div className="relative w-[560px]">
        {/* Поле ввода для поиска пользователей на GitHub */}
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for GitHub username..."
          value={search}
          onChange={(event) => setSearch(event.target.value)} // Обновляем состояние при изменении значения в поле ввода
        />

        {/* Выпадающий список с пользователями, если условия для его отображения выполнены */}
        {dropdown && (
          <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-auto">
            {users?.map((user) => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => showUserDeatails(user.login)} // При клике на пользователя выполняем запрос для получения его репозиториев
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        {/* Контейнер для отображения репозиториев пользователя */}
        <div className="container">
          {areReposLoading && (
            <p className="text-center">Repos are loading...</p> // Сообщение о загрузке репозиториев
          )}

          {/* Отображаем список карточек репозиториев, если они загружены */}
          {repos?.map((repo: IRepo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
