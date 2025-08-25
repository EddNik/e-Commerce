// функції для роботи з localStorage.

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  //   if (data) {
  return data ? JSON.parse(data) : [];
  //   }
}
export function setSessionStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function getSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  if (data) {
    return data ? JSON.parse(data) : null;
  }
}
