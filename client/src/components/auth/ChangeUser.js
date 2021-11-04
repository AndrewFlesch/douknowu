import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { changeUserConfirm } from '../../actions/auth';
import PropTypes from 'prop-types';
import ChangeUserForm from './ChangeUserForm';

const ChangeUser = ({ changeUserConfirm, auth: { loading, changeUser } }) => {
   return (
    changeUser !== null ? (
      <Fragment>
        <ChangeUserForm />
      </Fragment>
    ) :
            (
              <Fragment>
                <p className="lead">You need to login to your change name, email or password.</p>
                <button type='button' className='btn btn-primary my-1' onClick={changeUserConfirm}>Login</button>
              </Fragment>
            )

  )
}

ChangeUser.propTypes = {
  changeUserConfirm: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { changeUserConfirm })(ChangeUser)
