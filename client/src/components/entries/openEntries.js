import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getRecentEntries } from '../../actions/entries';
import Interval from '../../utils/interval';
import { deleteEntry, editEntry } from '../../actions/entries';
import { setShow } from '../../actions/showHide';
import {duraionMinutes, removeSeconds} from '../../utils/formatDate';
import Edit from './edit';


const OpenEntries = ({
  getRecentEntries, editEntry, deleteEntry, entries: {entries, loading}, setShow, show: {showing, id}
}) => {

  const endFormData = {
    title: '',
    start: '',
    end: '',
    duration: ''
  }

 const endEntry = (entry) => {
   endFormData.title = entry.title;
   endFormData.start = entry.start;
   endFormData.end = removeSeconds(new Date());
   endFormData.duration = duraionMinutes(entry.start);
   editEntry(entry._id, endFormData, true);
   }

   const setToEdit = e => {
     setShow(true, e.target.value);
   }

  useEffect(() => {
    getRecentEntries(3);
  }, [getRecentEntries]);

  const onDelete = (id) => {
    deleteEntry(id);
    getRecentEntries(3);
  };

  return loading? (
    <Spinner /> ) :
  (
    <div className="openEntries">
      {entries.length > 0 ? (<p className="lead">Your open items.</p>) : (<p className="lead">You have no open items.</p>)}
   {entries.map((entry) => (
     <div className="entry" key={entry._id}>
     {showing === true && id===entry._id ? (
       <Fragment>
          <Edit entry={entry} />
       </Fragment>
     ) : (
       <Fragment>
       <div className="entryTitle">{entry.title}</div>
       <div className="start">For: <Interval date={entry.start} /></div>
       <div className="entryButton">
        <button type='button' onClick={(e) => endEntry(entry)} title={entry.title} className='btn btn-light my-1' value="End">End</button>
        <button type='button' onClick={(e)=> setToEdit(e)} className='btn btn-light my-1' startdate={entry.start} value={entry._id}>Edit</button>
        <button type='button' onClick={() => onDelete(entry._id)} className='btn btn-light my-1' value="Delete">Delete</button>
       </div>
        </Fragment>
     )}
     </div>
   ))}
 </div>
  );
};

OpenEntries.propTypes = {
  getRecentEntries: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  entries: state.entries,
  show: state.showHide
});

export default connect(mapStateToProps, { getRecentEntries, editEntry, setShow, deleteEntry } )(withRouter(OpenEntries));
