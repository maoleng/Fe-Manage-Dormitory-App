import { useContext } from 'react';
import Context from './Context';

export { default as StoreProvider } from './Provider';
export { default as StoreContext } from './Context';

export const useStore = () => {
  return useContext(Context);
}

export * as actions from './actions';