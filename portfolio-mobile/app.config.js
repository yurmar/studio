// Базовый путь для публикации веб-версии в подпапке (например /concepts/mobile).
const base = require('./app.json');

module.exports = () => {
  const baseUrl = process.env.EXPO_BASE_URL;
  const expo = { ...base.expo };
  if (baseUrl) expo.experiments = { baseUrl };
  return { expo };
};
