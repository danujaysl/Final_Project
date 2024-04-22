import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { useContext, useEffect, useState } from "react";
import darkenColor from "../../CommonComponents/ColorDarker.js";
import axios from "../../api/axios";
import Spinner from "../../CommonComponents/SpinFunction";
import { MyContext } from "../..";
import { useSnackbar } from "../../CommonComponents/SnackBarContext";

export default function UserPage() {
  const [color, setColor] = useState("#1F8A70");
  const [foundUser, setUserState] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser,updateUserID ,userID,setLocation,userlocation} = useContext(MyContext);
  const {openSnackbar, closeSnackbar} = useSnackbar();

  
  return (
<>
          <Navbar
            color={color}
            setColor={setColor}
            name={user}
          />
          <Sidebar
            bordeColor={"#12372A"}
            backColor={color}
            backHoverColor={darkenColor("#12372A", 20)}
          />
       
    </>
  );
}
