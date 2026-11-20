/** Форматирует сумму в рублях: 1 248 ₽. */
export const money = (n: number): string =>
  `${Math.round(n).toLocaleString('ru-RU').replace(/ | /g, ' ')} ₽`;

/** 9.4 часа → «9 ч 24 мин». */
export const hoursLabel = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return h > 0 ? `${h} ч ${String(m).padStart(2, '0')} мин` : `${m} мин`;
};
