// localStorage.js
export const getLocalState = (key:string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

export const setLocalState = ({key, value}: {key: any, value:any}) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};
