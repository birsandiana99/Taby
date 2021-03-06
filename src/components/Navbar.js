import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navLinksPatient = [
  { title: `Home`, path: `/home` },
  { title: `Dashboard`, path: `/dash` },
  { title: `Taby`, path: `/chat` },
  { title: `Messages`, path: `/messages` },
  { title: `Profile`, path: `/user_profile` },
  { title: `Log out`, path: `/` },
];

const navLinksTherapist = [
  { title: `Home`, path: `/home` },
  { title: `Profile`, path: `/user_profile` },
  { title: `Patients`, path: `/therapist` },
  { title: `Log out`, path: `/` },
];

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [auth = 0, setAuth] = useState([]);
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    setAuth((auth) => 1);
    // history.push("/login");
  };
  let navLinks = [];
  if (localStorage.user_type === "therapist") {
    navLinks = navLinksTherapist;
  } else {
    navLinks = navLinksPatient;
  }
  const CreateLinks = () => {
    const classes = useStyles();
    return navLinks.map(({ title, path, clickAction }) => (
      <a href={path} key={title} style={{textDecoration:"none"}} className={classes.linkText}>
        <ListItem
          button
          onClick={() => {
            if (title === "Log out") {
              logOut();
            }
          }}
          className="navbar-item"
        >
          <ListItemText primary={title} />
        </ListItem>
      </a>
    ));
  };
  return (
    <div position="static" className="navbar">
      <div style={{backgroundColor: "transparent", display:"flex"}} >
        <div className="taby-logo" style={{cursor: "pointer"}} onClick={()=>{history.push("/home")}}></div>
        <div className="slogan">To a Better You</div>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          {localStorage.token ? (
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              <CreateLinks />
            </List>
          ) : (
            <div style={{display:"flex", paddingLeft:"20%", paddingTop:"20px"}}>
              <a href="/login" style={{textDecoration:"none"}} className={classes.linkText}>
        <ListItem
          button
          className="navbar-item login-navbar-item"
        >
          <ListItemText primary="login" />
        </ListItem></a>

        <a href="/register" style={{textDecoration:"none"}} className={classes.linkText}>
        <ListItem
          button
          className="navbar-item"
        >
          <ListItemText primary="register" />
        </ListItem></a>

        <a href="/chat" style={{textDecoration:"none"}} className={classes.linkText}>
        <ListItem
          button
          className="navbar-item"
        >
          <ListItemText primary="Try taby" />
        </ListItem></a>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
