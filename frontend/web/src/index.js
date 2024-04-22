import ReactDOM from "react-dom/client";
import App from "./App";
import React, { createContext,useEffect,useState } from 'react';
import { SnackbarProvider } from "./CommonComponents/SnackBarContext";

export const MyContext = createContext();

// Create a provider component
const ContextProvider = ({ children }) => {
  // Define the shared value

  const [name, setName] = useState('');
  const [userID,setUserID] = useState('');

  useEffect(()=>{

    if(localStorage.getItem('userInfo')){
      const {data} = JSON.parse(localStorage.getItem('userInfo'))
     setName(data?.name)
      updateUserID(data?.id)
  
    }

  }
  ,[])


  const updateUser = (username) => {
    setName(username);
  };

  const updateUserID = (userID)=>{
    setUserID(userID);
  }
  
  // Provide the value and functions through the context
  const contextValue = {
    updateUser,
    updateUserID,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );

};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ContextProvider>
      <SnackbarProvider >
        <App />
      </SnackbarProvider>
    </ContextProvider>
);




