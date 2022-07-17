import { useReducer } from "react";

import Context from "./Context";
import reducer, { initSate } from "./reducer";

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initSate);

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export default Provider;