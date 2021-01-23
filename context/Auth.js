import React, { createContext, useReducer} from "react";
import cookie from 'js-cookie';
// import { useCookies } from 'react-cookie';


export const AuthContext = createContext();



const initialState = {
  isAuthenticated: false,
  token: cookie.get('ttk') || "",
  user_data: null
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user_data: action.payload.user_data
        
      };


    case "LOGOUT":
      cookie.remove('ttk');
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        user_data: ""
      }


    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  let AuthData = {
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={AuthData}>
      {props.children}
    </AuthContext.Provider>
  );
};