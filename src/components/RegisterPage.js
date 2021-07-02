import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Taby
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    // border: "1px solid white",
    background: "grey",
    borderRadius: "3px",
    width:"250px",
    margin: "5px"
  },
  selectField: {
    // border: "1px solid white",
    background: "grey",
    borderRadius: "3px",
    color: "white",
    textAlign:"left",
    width:"250px",
    margin: "5px"
  }
}));

export default function SignInSide(props) {
  const history = useHistory();
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    age: "",
    type_of_user: "",
  });
  const [password2, setPassword2] = useState("");

  function register(event) {
    

    const fn = credentials["first_name"];
    const ln = credentials["last_name"];
    const email = credentials["email"];
    const pw1 = credentials["password"];
    const pw2 = credentials["password2"];
    const age = credentials["age"];
    const username = credentials["username"];

    let validator = 1;
    if(isNaN(age) || age<13 || age>99){
      swal("Age must be a number between 13 and 99");
      validator = 0;
    }
    if ( pw1!==pw2) {
      swal("Passwords don't match!");
      validator = 0;
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
      swal("Email is not correct");
      validator = 0;
    }
    if(username === ''){
      swal("Username must not be null");
      validator = 0;
    }
    if(fn === '' || ln === ''){
      swal("Name must not be null");
      validator = 0;
    }

    if(validator === 1){
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .catch((error) => console.error(error));
      
      history.push('/login');}
  }

  function inputChanged(event) {
    const cred = credentials;
    cred[event.target.name] = event.target.value;
    setCredentials(cred);
  }

  function getUserType(event){
    const cred = credentials;
    console.log("@@@@@",event.target.value);
    cred["type_of_user"] = event.target.value;
    setCredentials(cred);
  }


  return (
    <Grid container component="main" className={"register-container container "+classes.root} style={{background:"inherit", marginBottom:"65px"}}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} style={{background:"#703141"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form + classes.material_tf} noValidate style={{borderColor: "white"}}>
          <div style={{marginTop: "50px",display:"flex",flexDirection:"column"}}>
              <select id="type_of_user" onChange={getUserType}>
                <option value="client">Patient</option>
                <option value="therapist">Therapist</option>
              </select>
            </div>
          <div style={{display:"flex",flexDirection:"column"}}>
              <label> First Name </label>
              <input name="first_name" onChange={inputChanged}  className="first_name t-form-field" id="first_name" />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <label> Last Name </label>
              <input name="last_name" onChange={inputChanged}  className="last_name t-form-field" id="last_name" />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <label> Username </label>
              <input name="username" onChange={inputChanged}  className="username t-form-field" id="username" />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <label> Age </label>
              <input name="age" onChange={inputChanged}  className="age t-form-field" id="age" />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <label> Email </label>
              <input name="email" onChange={inputChanged}  className="email t-form-field" id="email" />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <label> Password </label>
              <input name="password" onChange={inputChanged}  className="password t-form-field" type="password" id="password" />
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
              <label> Confirm password </label>
              <input name="password2" onChange={inputChanged}  className="password2 t-form-field" type="password" id="password2" />
            </div>
            
            
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={register}
              style={{width:"50%", fontSize:"14px", background:"#703141"}}
            >
              Sign Up
            </Button>
            <Grid container >
              <Grid item style={{width:"100%"}}>
                <Link href="/login" style={{ width:"100%"}}>
                  {"Already have an account? Sign in"}
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
