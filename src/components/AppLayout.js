import React from 'react';
import { Link } from 'react-router-dom';
import Navigator from './Navigator';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Header from './Header';
import Login from './Login';
import TherapistNavBar from './TherapistNavBar';
import PatientNavBar from './PatientNavBar';

const Layout = (props) => {
    const mapPropChildren = ({children}) =>{
        return(     
        React.Children.map(children, child => (
            <div>
                {React.cloneElement(child, {style: {...child.props.style, opacity: 0.5}})}
            </div>)
        ))
    }
    return (
       
        <Container maxWidth="md"> 
                  {/* {localStorage.user_type==="therapist" ?
            (
              
            
              <TherapistNavBar/>
            
            ) :(
             
              
                <PatientNavBar/>
                
            )
          } */}
          <Navigator></Navigator>
            {/* <Navigator/> */}
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                {props.children}
            </div>
        </Container>
    );
}

export default Layout;