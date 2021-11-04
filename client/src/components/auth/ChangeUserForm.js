import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { changeUserData, changeUserConfirm } from '../../actions/auth';
import { createProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const ChangeUserForm = ({ setAlert, changeUserData, changeUserConfirm, isAuthenticated, auth: { user, loading, changeUser }, history }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  useEffect(() => {
    if (user) {
    setFormData({
      name: loading || !user.name ? '' : user.name,
      email: loading || !user.email ? '' : user.email,
      password: '',
      password2: ''
    })};
  }, [loading, user]);



  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      changeUserData({name, email, password});
    }
  }


  return (
    <Fragment>
          <h1 className="large text-primary">{name}</h1>
          <p className="lead">Change Your Name, Email or Password</p>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input type="text" placeholder="Name" name="name" required="" value={name} onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" name="email"  value={email} onChange={e => onChange(e)}/>
              <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small>
            </div>
            <div className="form-group">
              <input type="password" placeholder="New Password" name="password" value={password} onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Confirm New Password" name="password2" value={password2} onChange={e => onChange(e)}/>
            </div>
            <input type="submit" className="btn btn-primary" value="Submit"/>
          </form>

        </Fragment>
  )
}

ChangeUserForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changeUserData: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  changeUserConfirm: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});


export default connect(mapStateToProps, { setAlert, changeUserData, changeUserConfirm, createProfile })(ChangeUserForm)
