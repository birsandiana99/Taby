import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { display } from "@material-ui/system";



const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    borderColor: "white"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    border: "1px solid white",
  },
  material_tf: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)"  // default
      },
      "&.Mui-focused fieldset": {
        border: "2px solid red"             // focus
      }
    }
  }
}));

export default function SignInSide(props) {
  const history = useHistory();
  const classes = useStyles();
  const [credentials, setCredentials] = useState({});

  function login(event) {
    console.log("CREDS:",credentials);
    fetch("http://127.0.0.1:8000/api/auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .then(
        (data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("user_type", data.type_of_user);
          props.userLogin(data.token, data.user_id, data.type_of_user);
          history.push("/user_profile");
        }
        
      )
      .catch((error) => console.error(error));
  }

  function inputChanged(event) {
    console.log(event.target.value);
    const cred = credentials;
    cred[event.target.name] = event.target.value;
    setCredentials(cred);
  }

  return (
    <Grid container component="main" className={"login-container contaiter "+classes.root} style={{background:"inherit"}}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} style={{background:"#703141"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form + classes.material_tf} noValidate style={{borderColor: "white"}}>
            <div style={{marginTop: "50px"}}>
              <input name="username" onChange={inputChanged} className="username t-form-field" id="username" />
            </div>
            <div> <input onChange={inputChanged} name="password" type="password" className="password t-form-field" id="password" /> </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
              style={{width:"50%", fontSize:"14px", background:"#703141"}}
            >
              Sign In
            </Button>
            <Grid container >
              <Grid item style={{width:"100%"}}>
                <Link href="/register" style={{ width:"100%"}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
