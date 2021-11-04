import React,  { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout}) => {
  const authLinks = (
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          <li><button className="logout" onClick={logout}>Logout</button></li>
        </ul>
  );

  const guestLinks = (
        <ul>
          <li><Link to="register">Sign Up</Link></li>
          <li><Link to="login">Login</Link></li>
        </ul>
  )


  return (
    <nav className="navbar bg-dark">
        <h1>
          <Link to="/"> DoUknowU.com</Link>
        </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}

      </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>  ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout } )(Navbar)
