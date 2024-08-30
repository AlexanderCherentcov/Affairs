export function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function extractionLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  let arr = []
  if (dataLocal !== "" && dataLocal !== null) {
    arr = JSON.parse(dataLocal);
  }

  return arr;
}
