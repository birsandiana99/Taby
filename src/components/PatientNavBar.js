import * as React from "react";
import{ useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import UnauthorizedPage from "./UnauthorizedPage";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  }
});

const isLoggedIn = () => {
  if(localStorage.getItem('token') == undefined)
    {
      return false;
    }
  return true;
}


const CreateLinks = () => {
  const classes = useStyles();
  return(
  navLinks.map(({ title, path, clickAction }) => (
    <a href={path} key={title} className={classes.linkText}>
      <ListItem button>
        <ListItemText primary={title} />
      </ListItem>
    </a> ))
  )
}
const navLinks = [
  { title: `Home`, path: `/home`},
  { title: `Dashboard`, path: `/dash`},
  { title: `Taby`, path: `/chat`},
  { title: `Messages`, path: `/chats`},
  { title: `Profile`, path: `/user_profile`},
  // { title: `Patients`, path: `/therapist`},
];

const Navigator = () => {
  const history = useHistory();
  const classes = useStyles();
  const [auth=0, setAuth] = useState([]);
  const logOut = () => {
    console.log("HERE");
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
    setAuth(auth => 1);
    history.push('/login');
  }


  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
          </IconButton>
            {localStorage.token ?
            (
              
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              <CreateLinks/>
              <ListItem button onClick={logOut}> Log out</ListItem>
              </List>
            ) :(
                <div>
                    <label>You are not logged in! Log in to continue</label>
              <a href={'/login'} key={"Log in"} className={classes.linkText} >
                <ListItem button>
                  <ListItemText primary={"please log in to continue"} />
                </ListItem>
              </a>
              </div>
            )
          }
          

        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Navigator;