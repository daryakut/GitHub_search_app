import React, { useState } from "react";
import { IRepo } from "../modules/modules";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

// Интерфейс пропсов, которые ожидает компонент
interface Props {
  repo: IRepo; // Объект репозитория, информация о котором будет отображаться
}

// Компонент карточки репозитория
const RepoCard: React.FC<Props> = ({ repo }) => {
  console.log("repo ", repo);

  // Получаем экшены для добавления и удаления из избранного с помощью кастомного хука useActions
  const { addFavourite, removeFavourite } = useActions();

  // Получаем текущий список избранных репозиториев из состояния с помощью useAppSelector
  const { favourites } = useAppSelector((state) => state.github);

  // Локальное состояние, которое определяет, является ли данный репозиторий избранным
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  // Функция для добавления репозитория в избранное
  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Предотвращаем переход по ссылке
    addFavourite(repo.html_url); // Вызываем экшен добавления в избранное
    setIsFav(true); // Обновляем локальное состояние, чтобы отобразить изменения в UI
  };

  // Функция для удаления репозитория из избранного
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Предотвращаем переход по ссылке
    removeFavourite(repo.html_url); // Вызываем экшен удаления из избранного
    setIsFav(false); // Обновляем локальное состояние, чтобы отобразить изменения в UI
  };

  // Рендеринг карточки репозитория
  return (
    <div className="border p-4 rounded mb-2 hover:shadow-md hover:bg-gray-100 cursor-pointer">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <h2 className="text-xl font-bold">{repo.full_name}</h2>
        <p className="text-sm font-thin">{repo?.description}</p>
        <p>Stars: {repo.stargazers_count}</p>
        <p>Watchers: {repo.watchers_count}</p>

        {/* Если репозиторий не является избранным, показываем кнопку "Добавить в избранное" */}
        {!isFav && (
          <button
            className="py-2 px-2 mr-2 bg-yellow-400 rounded hover:shadow-md transition-all"
            onClick={addToFavourite}
          >
            Add to Favourites
          </button>
        )}

        {/* Если репозиторий является избранным, показываем кнопку "Удалить из избранного" */}
        {isFav && (
          <button
            className="py-2 px-2 bg-red-400 rounded hover:shadow-md transition-all"
            onClick={removeFromFavourite}
          >
            Remove from Favourites
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
