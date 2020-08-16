import { setLocalState } from "src/helpers/localStorage";

const addItem = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingItemIndex > -1) {
    alert(`${action.payload.name} existed!`);
    return [...state.items];
  } 
  setLocalState({key : 'items', value: [...state.items, action.payload]});
  return [...state.items, action.payload];
};
 
const removeItem = (state, action) => {
  return state.items.reduce((acc, item) => {
    if (item.id === action.payload.id) {
      setLocalState({key : 'items', value: [...acc]});
      return [...acc];
    }
    setLocalState({key : 'items', value: [...acc, item]});
    return [...acc, item];
  }, []);
};

export const initState = {
  items: []
};

type Action =
  | { type: 'LOCAL_STORAGE', payload }
  | { type: 'ADD_ITEM', payload }
  | { type: 'REMOVE_ITEM', payload };

type State = typeof initState;

export const reducer = (state:State, action:Action) => {
  switch (action.type) {
    case 'LOCAL_STORAGE':
      return {
        ...state,
        items: action.payload,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: addItem(state, action),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: removeItem(state, action),
      };
    default: {
      throw new Error(`Unsupported action type: ${action}`);
    }
  }
}
