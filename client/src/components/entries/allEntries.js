import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EntryHorizontal from './entryHorizontal';
import { getAllEntries } from '../../actions/entries';
import Table from 'react-bootstrap/Table';

const AllEntries = ({
  getAllEntries, entries: {entries, loading}
}) => {

  useEffect(() => {
    getAllEntries();
  }, [getAllEntries]);

  return loading? (
    <Spinner /> ) :
  (
    <div className="allHorizontal">
      {entries.length > 0 ? (<p className="lead">Your items.</p>) : (<p className="lead">You have no items.</p>)}
    <Table>
    <thead>
  <tr>
    <th>Title</th>
    <th>Type</th>
    <th>Direction</th>
    <th>Start</th>
    <th>End</th>
    <th>Duration</th>
    <th>Description</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  </thead>
    <tbody>
   {entries.map((entry) => (
     <EntryHorizontal entry={entry} key={entry._id} />
   ))}
   </tbody>
 </Table>
 </div>
  );
};

AllEntries.propTypes = {
  getAllEntries: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entries: state.entries,
});

export default connect(mapStateToProps, { getAllEntries } )(withRouter(AllEntries));
