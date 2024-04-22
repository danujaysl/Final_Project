import LoginPage from "./Views/LoginPage/LoginPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PageNotFound from "./CommonComponents/PageNotFound";
import { useSnackbar } from "./CommonComponents/SnackBarContext";
import { Snackbar as SnackbarMui, SnackbarContent } from "@mui/material";
import UserRegistrationPage from "./Views/LoginPage/RegistrationPage";
import UserPage from "./Views/Dashboard/DasboardPage";
import SessionExpiredPage from "./CommonComponents/SessionExpired";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      {/* <Route path="signup" element={<SignUpPage />} /> */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<UserRegistrationPage/>} />   
      <Route path="/userdashboard" element={<UserPage />} />   
      <Route path="/expire" element={<SessionExpiredPage />} />
      <Route path="*" element={<PageNotFound error="Page Not Found 404" />} />
      
    </Route>
  )
);

function App() {
  const { open, message, closeSnackbar, icon, color } = useSnackbar();

  return (
    <>
      <RouterProvider router={router} />

      <SnackbarMui
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={closeSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: color, // Customize colors
          }}
          message={
            <span>
              {icon}
              {message}
            </span>
          }
        />
      </SnackbarMui>
    </>
  );
}

export default App;