import React, { useReducer, useContext, createContext } from 'react';
import { reducer, initState } from './app.reducer';
import { getLocalState } from 'src/helpers/localStorage';
const AppContext = createContext({} as any);

const useCartActions = (initialState = initState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const rehydrateLocalState = () => {
    dispatch({ type: 'LOCAL_STORAGE', payload: getLocalState('items') });
  };

  const addItemHandler = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { ...item } });
  };
  return {
    state,
    rehydrateLocalState,
    addItemHandler,
    removeItemHandler,
  };
};

export const AppProvider = ({ children }) => {
  const {
    state,
    addItemHandler,
    removeItemHandler,
    rehydrateLocalState,
  } = useCartActions();

  return (
    <AppContext.Provider
      value={{
        items: state.items,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        loadLocal: rehydrateLocalState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
