import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDuration from '../../utils/getDuration';
import Interval from '../../utils/interval';
import { deleteEntry, editEntry } from '../../actions/entries';
import { setShow } from '../../actions/showHide';
import {formatDateTime, durationFNS, duraionMinutes, setEndDate, removeSeconds} from '../../utils/formatDate';
import {addOrEditTypeAndDirection} from '../../utils/typeAndDirection';
import Edit from './edit';


const Entry = ({ editEntry, setShow, show: {showing, id} , deleteEntry, entry
}) => {

  const [formData, setFormData] = useState({
    title: entry.title,
    type: entry.type,
    direction: entry.direction,
    start: entry.start,
    end: entry.end ? entry.end : '' ,
    duration: entry.duration ? entry.duration : '' ,
    description: entry.description,
    entryid: entry._id
  })

  const [durationArray, setDurationArray] = useState([]);

  const endFormData = {
    title: '',
    start: '',
    type: '',
    direction: '',
    end: '',
    duration: '',
    description: '',
  }

 const {
   title,
   type,
   direction,
   start,
   end,
   duration,
   description,
   entryid
 } = formData;


  const endEntry = (entryid, formData) => {
    endFormData.title = title;
    endFormData.start = start;
    endFormData.end = removeSeconds(new Date());
    endFormData.duration = duraionMinutes(start, end);
    console.log(endFormData);
    editEntry(entryid, endFormData, true);
    }

    const durChange = () => {
      let daysMin = parseInt(document.querySelector("[name='days']").value * 1440);
      let hoursMin = parseInt(document.querySelector("[name='hours']").value * 60);
      let minutesMin = parseInt(document.querySelector("[name='minutes']").value * 1)
      let durationMin = daysMin + hoursMin + minutesMin;
      setFormData({...formData, duration: "10"});
      setFormData({...formData, end: setEndDate(start, durationMin), duration: durationMin});
    }

    const endChange = () => {
      let durationChange = duraionMinutes(start, end);
    }

    const onSubmit = async (e) => {
      e.preventDefault();
      if (end) {
        editEntry(entryid, formData, true);
      } else {
        editEntry(entryid, formData);
      }
      setShow(true, entryid);
}

    const setToEdit = e => {
      setShow(true, e.target.value);
      setDurationArray(durationFNS(start, true));
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onChangeType = e => {
      if (e.target.name === 'type') {
        addOrEditTypeAndDirection(title, direction, e.target.value);
      } else {
        addOrEditTypeAndDirection(title, e.target.value, type);
      }
            setFormData({ ...formData, [e.target.name]: e.target.value})
    };



  return (
     <div className="entry">
     {showing === true && id===entryid ? (
       <Fragment>
          <Edit entry={entry} />
       </Fragment>
     ) : (
       <Fragment>
       <div className="entryTitle">{title}</div>
       <div className="start">For: <Interval date={start} /></div>
       <div className="entryButton">
        <button type='button' startime={start} onClick={(e) => endEntry(entry._id, e)} title={title} className='btn btn-light my-1' value="End">End</button>
        <button type='button' onClick={(e)=> setToEdit(e)} className='btn btn-light my-1' value={entryid}>Edit</button>
        <button type='button' onClick={() => deleteEntry(entry._id)} className='btn btn-light my-1' value="Delete">Delete</button>
       </div>
        </Fragment>
     )}
     </div>

  );
};

const mapStateToProps = state => ({
  show: state.showHide
});

Entry.propTypes = {
  deleteEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteEntry, editEntry, setShow} )(withRouter(Entry));
