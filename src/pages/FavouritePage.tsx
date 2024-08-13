import React from "react";
import { useAppSelector } from "../hooks/redux";


interface Props {}

const FavouritePage = (props: Props) => {
  const { favourites } = useAppSelector((state) => state.github); //Используется хук useAppSelector, чтобы получить список избранных элементов из состояния github в Redux Store.
  if (favourites.length === 0) {
    return <p>no items</p>;
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favourites.map((f) => (
          <li key={f}>
            <a href={f}>{f}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritePage;
