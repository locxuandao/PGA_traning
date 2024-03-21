// Remove items from storage
export const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

// SET STORAGE

const setTokens = (tokens: {}) => {
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

// GET FROM STORAGE

const getTokens = () => {
  const tokens = localStorage.getItem("tokens") || '{"error": "null"}';

  if (tokens === "undefined") {
    removeItemFromStorage("tokens");
    window.location.replace("/");
  }

  return JSON.parse(tokens);
};

export { getTokens, setTokens };
