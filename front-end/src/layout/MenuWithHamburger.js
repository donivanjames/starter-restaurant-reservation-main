import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark navbar-expand-md align-items-start p-0 h-100">
      <div className="container-fluid d-flex flex-md-column p-0 my-2">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <hr className="sidebar-divider my-0" />
          <ul
            className="nav navbar-nav text-light d-flex flex-column"
            id="accordionSidebar"
          >
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <span className="oi oi-dashboard" />
                &nbsp;Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                <span className="oi oi-magnifying-glass" />
                &nbsp;Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations/new">
                <span className="oi oi-plus" />
                &nbsp;New Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-layers" />
                &nbsp;New Table
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
