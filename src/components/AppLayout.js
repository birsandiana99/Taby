import React from "react";
import Navbar from "./Navbar";
import Footer from  "./Footer";
const Layout = (props) => {
  const mapPropChildren = ({ children }) => {
    return React.Children.map(children, (child) => (
      <div>
        {React.cloneElement(child, {
          style: { ...child.props.style, opacity: 0.5 },
        })}
      </div>
    ));
  };
  return (
    <div>
      <Navbar></Navbar>
      <div style={{ padding: 24, minHeight: "75vh", margin:"0 20px" }}>
        {props.children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
