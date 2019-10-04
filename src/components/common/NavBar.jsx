import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = ({ pathname }) => {
  return (
    <Navbar bg="light" variant="dark" sticky="top" className="navbar">
      <Navbar.Brand href="#home" className="navbar_title">
        Top Coins Dashboard
      </Navbar.Brand>
      <Nav className="ml-auto">
        <div className="nav-link">
          <NavLink
            exact
            to="/"
            className={pathname === "/" ? "navbar_active" : ""}
          >
            Market Overview
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink
            exact
            to="/liquidity"
            className={pathname === "/liquidity" ? "navbar_active" : ""}
          >
            Liquidity Analysis
          </NavLink>
        </div>
      </Nav>
    </Navbar>
  );
};
NavBar.propTypes = {
  pathname: PropTypes.object.isRequired
};
export default NavBar;
