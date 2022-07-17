import { SET_IS_OPEN_SIDERBAR } from "./constants";

export const initSate = {
  isOpenSidebar: true
};

export default function reducer(state, action) {
  switch (action.type) {
    case SET_IS_OPEN_SIDERBAR:
      return {
        ...state,
        isOpenSidebar: action.payload
      }
    default: 
      throw new Error('Invalid action');
  }
}