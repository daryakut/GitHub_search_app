import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { githubActions } from "../store/github/github.slice";


const actions = {
  ...githubActions //Этот код создаёт объект actions, который объединяет все экшены из githubActions
}
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

// useActions: Это кастомный хук, который выполняет следующие шаги:
// Получает dispatch функцию из useDispatch.
// Использует bindActionCreators, чтобы связать каждый экшен с dispatch. Это означает, что вы можете вызывать экшены напрямую, и они автоматически будут отправлены (dispatched) в Redux Store.


// bindActionCreators — это функция, которая принимает объект экшенов и функцию dispatch, и возвращает новый объект с теми же ключами, но теперь значения этих ключей — это обёрнутые функции, которые сразу вызывают dispatch.


// bindActionCreators из @reduxjs/toolkit: Это утилита, которая связывает экшены с функцией dispatch, чтобы вы могли вызывать их напрямую.
// useDispatch из react-redux: Это хук, который возвращает функцию dispatch из Redux Store, что позволяет вам отправлять действия из ваших компонентов.
// githubActions: Это объект, содержащий все экшены, сгенерированные createSlice в github.slice.
