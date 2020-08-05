// Obtém itens do local storage

export const getLS = (key) => JSON.parse(localStorage.getItem(key));

// Armazena itens no local storage

export const setLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));
