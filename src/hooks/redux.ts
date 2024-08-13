import { RootState } from "../store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //useSelector позволяет вам извлекать данные из Redux Store
//RootState — это тип, который представляет всё состояние вашего Redux Store. 
//TypedUseSelectorHook — это тип, предоставляемый react-redux, который позволяет вам создавать типизированную версию useSelector. Он принимает тип состояния вашего Store (в данном случае RootState).
//Теперь, когда вы объединили все эти элементы, вы создали типизированную версию useSelector, которая называется useAppSelector

// useAppSelector: Позволяет безопасно извлекать части состояния из Store с автоматической проверкой типов.