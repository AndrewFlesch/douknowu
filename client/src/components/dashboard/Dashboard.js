import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import NewEntry from '../entries/newEntry';
import OpenEntries from '../entries/openEntries';



const Dashboard = ({ newEntry, getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
 useEffect(() => {
   getCurrentProfile();
 }, [getCurrentProfile]);

  return (
  <div className="mainColumn">
    <h1 className="lead text-primary">Welcome {user && user.name}</h1>
    <NewEntry />
    <OpenEntries />

  </div>
)}
Dashboard.propTypes = {
 getCurrentProfile: PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
