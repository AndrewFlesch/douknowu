import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Entry from './entry';
import { getRecentEntries } from '../../actions/entries';


const OpenEntries = ({
  getRecentEntries, entries: {entries, loading}
}) => {

  useEffect(() => {
    getRecentEntries(3);
  }, [getRecentEntries]);

  return loading? (
    <Spinner /> ) :
  (
    <div className="openEntries">
      {entries.length > 0 ? (<p className="lead">Your open items.</p>) : (<p className="lead">You have no open items.</p>)}
   {entries.map((entry) => (
     <Entry entry={entry} key={entry._id} />
   ))}
 </div>
  );
};

OpenEntries.propTypes = {
  getRecentEntries: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entries: state.entries,
});

export default connect(mapStateToProps, { getRecentEntries } )(withRouter(OpenEntries));
