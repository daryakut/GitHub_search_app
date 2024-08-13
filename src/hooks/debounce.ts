import { useEffect, useState } from "react";

// Хук useDebounce
// Этот хук принимает значение (value), которое нужно "дебаунсить", и задержку (delay) в миллисекундах.
// Он возвращает значение, которое обновляется с задержкой, чтобы избежать слишком частого изменения.
export function useDebounce(value: string, delay: number = 900) {
  // Создаем состояние debounced, которое будет хранить "дебаунсенное" значение.
  // Изначально оно равно переданному value.
  const [debounced, setDebounced] = useState(value);

  // Используем useEffect для выполнения побочного эффекта, когда меняется value или delay.
  useEffect(() => {
    // Устанавливаем таймер, который через заданное время (delay) обновит состояние debounced.
    const timeID = setTimeout(() => setDebounced(value), delay);

    // Возвращаем функцию очистки, которая будет вызвана, если value или delay изменятся до того,
    // как таймер завершит свою работу. Это предотвращает преждевременное обновление состояния debounced.
    return () => clearTimeout(timeID);
  }, [value, delay]); // Эффект будет запущен каждый раз, когда изменяется value или delay.

  // Возвращаем "дебаунсенное" значение, которое можно использовать в компонентах.
  return debounced;
}
