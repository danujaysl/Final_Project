import styled from "@emotion/styled";
import {
  Box,
  Grid,
  TextField,
  Stack,
  Typography,
  Card,
  CardActions,
  Button,
  CardContent,
} from "@mui/material";
import "./text.css";
import { useEffect, useRef, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {  useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import CustomLinkButton from "../../../CommonComponents/LinkButton";
import Footer from "../../../CommonComponents/Footer";
import lottie from "lottie-web";
import validator from 'validator';

const TextBox = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey", // Set background color to "#9681EB"
    },
    "&:hover fieldset": {
      borderColor: "#0C356A", // Set hover color to the dark color of "#9681EB"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#12372A",
    },
  },
  "& label": {
    color: "grey",
  },
  "& label.Mui-focused": {
    color: "#12372A",
  },
});

const fieldProp = {
  width: "90%",
  marginTop: "20px",
};

const btnprop = {
  width: "50%",
  height: "50px",
  backgroundColor: "#12372A",
  borderRadius: "10px",
  marginBottom: "10px",
  color: "white",
  "&:hover": {
    border: "1px solid #82ffa1",
    color: "#12372A",
    backgroundColor: "white",
    fontWeight: "bolder",
  },
};


const descboxprop = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: "10px",
  color: "white",
  flexDirection: "column",
  flexWrap: "wrap",
  marginTop:{
    lg:'-200px',
    sx:'0px'
  }

};


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}



export default function Form() {

  const container = useRef(null); 

  useEffect(() => {
    lottie.loadAnimation({
      animationData: require("./tomato_animation.json"),
      autoplay: true,
      container: container.current,
      loop: true,
      renderer: "svg",
      
    })
  }, [])

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const anchorOrigin = isSmallScreen
    ? { vertical: "bottom", horizontal: "center" } // for small screens
    : { vertical: "bottom", horizontal: "left" };

  const handleSignUp = (arr) => {
    const post = async (arr) => {
      const data = {
        username: arr[0],
        password: arr[1],
        email: arr[2]
      };

      console.log(data)
      axios
        .post("/users", data)
        .then((res) => {
          console.log(res);
          setsccMSG("Registration succeed");
          setSeverity("success");
          setsccColor("#03C988");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setsccMSG(err.response.data.message);
          setSeverity("error");
          setsccColor("#F24C3D");
        });
    };

    if (arr[0] === "") {
      isNameNull = true;
      setNameErr("User Name is not provided");
    } else {
      isNameNull = false;
      setNameErr("");
    }

    if (arr[1] === "") {
      setPasswordErr("Password is not provided");
      isPasswordNull = true;
    } else {
      setPasswordErr("");
      isPasswordNull = false;
    }

    
    if (arr[2] === "") {
    setEmailErr("Email is not provided");
    isEmailNull = true;

    }
    else if(!validator.isEmail(arr[2])){
        setEmailErr("Provide a valid email");
        isEmailNull = true;
    }
    else {
    setEmailErr("");
    isEmailNull = false;
    }

    if (!isNameNull && !isPasswordNull && !isEmailNull) {
      
      post(arr);
      setsccMSG("Loading..");
      setSeverity("warning");
      setsccColor("#FFCC70");

    } else {
      setsccMSG("Please fill all fields");
      setsccColor("#F24C3D");
      setSeverity("error");
    }
  };

  var isNameNull,
    isPasswordNull,isEmailNull = false;

  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [emailErr,setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [sccColor, setsccColor] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [sccMSG, setsccMSG] = useState("");
  const [severity, setSeverity] = useState("error");
  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });

  const handleClick = (Transition) => {

    setState({
      open: true,
      Transition,
    });

  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const valueList = [name, password,email];

  

  return (
    <div>
      {/*parent box*/}
      <Box  sx={{height:{sx:'100vh',lg:'100vh'},background: 'linear-gradient(to right bottom, #12372A , #82ffa1)'}}>
        {/*grid container*/}
        <Grid container spacing={2} sx={{ height: "100%",paddingTop:'20px' }}>
          {/*grid items*/}
          <Grid item xs={12} lg={6} >
            {/*form holder to align the form horizontally and vertically*/}
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "auto",
            
              }}
            >
              {/*stacking the form controls*/}
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {/*image holder*/}
                <Box sx={descboxprop}>
                <div ref={container} id="animation-container" style={{height:'300px'}}></div>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "'Courier Prime', monospace",
                      color: "white",
                    }}
                  >
                    Tomato Leaf Guard
                  </Typography>
                </Box>

                {/*desc*/}
                
              </Stack>
            </Box>
          </Grid>

          {/*grid item*/}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              height: "100%",
              width: "auto",
              marginTop: { xs: "80px", lg: "0px" },
              
            }}
          >
            {/*form holder*/}
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 30px",
                marginRight: { lg: "50px", sm: "0px" },
              }}
            >
              <Card sx={{ width: "100%", height: "90%" }}>
               
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/*aligning the controls*/}
                  <Stack spacing={2} direction="column" sx={fieldProp}>
                    <Typography
                      variant="h4"
                      sx={{
                        marginLeft: "10px",
                        alignContent: "center",
                        color: "#12372A",
                      }}
                    >
                      Sign Up
                    </Typography>

                    <TextBox
                      label="User Name"
                      variant="outlined"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isNameNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {nameErr}
                      </Typography>
                    )}
                   

                    <TextBox
                      label="PASSWORD"
                      type="password"
                      variant="outlined"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isPasswordNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {passwordErr}
                      </Typography>
                    )}

                    <TextBox
                      label="Email"
                      type="email"
                      variant="outlined"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    >
                      {" "}
                    </TextBox>
                    {isEmailNull !== true && (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {emailErr}
                      </Typography>
                    )}
                  
                  </Stack>
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    
                    size="Large"
                    sx={btnprop}
                    onClick={() => {
                      handleSignUp(valueList);
                      handleClick(SlideTransition);
                    }}
                  >
                    Sign Up
                  </Button>
                </CardActions>
              </Card>
            </Box>

            {/*feedback pop for a success action */}
          </Grid>
        </Grid>
      </Box>
      <div>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          anchorOrigin={anchorOrigin}
          TransitionComponent={state.Transition}
          message={sccMSG}
          key={state.Transition.name}
          autoHideDuration={5000}
          sx={{ width: { sm: "auto", lg: "30%" } }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{
              width: "100%",
              backgroundColor: sccColor,
              color: "white",
              borderRadius: "15px",
            }}
          >
            {sccMSG}
          </Alert>
        </Snackbar>
        
      </div>
    </div>
  );
}
