import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEntry, editEntry } from '../../actions/entries';
import {formatDateTime, durationFNS, duraionMinutes, setEndDate, formatDateTimeAll, removeSeconds} from '../../utils/formatDate';



const EntryHorizontal = ({ editEntry, deleteEntry, entry
}) => {

  console.log(entry);

  const [formData, setFormData] = useState({
    title: entry.title,
    type: entry.type,
    direction: entry.direction,
    start: entry.start,
    end: entry.end ? entry.end : '' ,
    duration: entry.duration >=0 ? entry.duration : '' ,
    description: entry.description,
    entryid: entry._id
  })

  const [edit, setEdit] = useState(false);

  const [durationArray, setDurationArray] = useState([]);

  const endFormData = {
    title: '',
    type: '',
    direction: '',
    start: '',
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


  const endEntry = () => {
    let endDate = removeSeconds(new Date());
    if (end) {endDate = end};
    endFormData.title = title;
    endFormData.start = new Date(start).toISOString();
    endFormData.end = new Date(endDate).toISOString();
    endFormData.duration = duraionMinutes(start, end);
    setFormData({...formData, end: endFormData.end, duration: endFormData.duration });
    editEntry(entryid, endFormData);
    setEdit(false);
    }


    const durChange = () => {
      let daysMin = parseInt(document.querySelector("[name='days']").value * 1440);
      let hoursMin = parseInt(document.querySelector("[name='hours']").value * 60);
      let minutesMin = parseInt(document.querySelector("[name='minutes']").value * 1)
      let durationMin = daysMin + hoursMin + minutesMin;
      setFormData({...formData, end: setEndDate(start, durationMin), duration: durationMin});
    }


    const endChange = () => {
      let durationChange = duraionMinutes(start, end);
    }

    const onSubmit = async (e) => {
      e.preventDefault();
      endEntry();
    }

    const setToEdit = e => {
      setEdit(true);
      setDurationArray(durationFNS(start, true, end));
      console.log(durationArray);
    }

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value});
      if (e.target.name === 'end') {
        let durArray = [];
        durArray = durationFNS(start, true, e.target.value);
        document.querySelector("[name='days']").value = durArray[0];
        document.querySelector("[name='hours']").value = durArray[1];
        document.querySelector("[name='minutes']").value = durArray[2];
      }
      if (e.target.name === 'start') {
        let durArray = [];
        durArray = durationFNS(e.target.value, true, end);
        document.querySelector("[name='days']").value = durArray[0];
        document.querySelector("[name='hours']").value = durArray[1];
        document.querySelector("[name='minutes']").value = durArray[2];
      }
}

  const onCancel = () => {
    setFormData({
      title: entry.title,
      start: entry.start,
      end: entry.end ? entry.end : '' ,
      duration: entry.duration ? entry.duration : '' ,
      description: entry.description,
      entryid: entry._id
    });
    setEdit(false);
  }



  return (
    <Fragment>
     {edit === true ? (
       <Fragment>
       <tr><td>
       <div className="modalDialog modalDialogshow" id="Edit">
        <div>
             <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="entryTitle">
                 <input type="text" placeholder="title" name="title" required="" value={title} onChange={e => onChange(e)}/>
                 <small className="form-text">Title of this entry.</small>
               </div>
               <div className="entryTitle">
                <input type="text" placeholder="type" name="type" required="" value={type} onChange={e => onChange(e)}/>
                <small className="form-text">Is this an emotion or an action?</small>
              </div>
              <div className="entryTitle">
               <input type="text" placeholder="direction" name="direction" required="" value={direction} onChange={e => onChange(e)}/>
               <small className="form-text">Is this positive, negative or netural?</small>
             </div>
               <div className="entryTitle">
                 <input type="datetime-local" placeholder="Start date" name="start"  value={formatDateTime(start)} onChange={e => onChange(e)}/>
                 <small className="form-text">Start date and time. Chaning the start time will automatically change the duration.</small>
               </div>
               <div className="entryTitle">
                 <input type="datetime-local" placeholder="End date" name="end" value={end ? formatDateTime(end) : end} onChange={e => onChange(e)}/>
                 <small className="form-text">End date and time. Changing the end time will automatically change the duration.</small>
               </div>
               <div className="entryTitle">
                 <div className="inline editdash"><input type="number" placeholder={durationArray[0]} name="days" onChange={e => durChange(e)} /> Days </div>
                 <div className="inline editdash"><input type="number" placeholder={durationArray[1]} name="hours" onChange={e => durChange(e)} /> Hours </div>
                  <div className="inline editdash"><input type="number" placeholder={durationArray[2]} name="minutes" onChange={e => durChange(e)} /> Minutes </div>
                 <small className="form-text">Duration in minutes. This will automatically change the end date time.</small>
               </div>
               <div className="entryTitle">
                 <textarea rows="3" placeholder="Description" name="description" value={description} onChange={e => onChange(e)}/>
                 <small className="form-text">Description of this item.</small>
               </div>
               <div className="entryButton change">
               <button type="submit" className="btn btn-primary" value="">Change</button>
               <button type="button" onClick={() => onCancel()} className="btn btn-primary" value="">Cancel</button>
               {end ? <span></span> : <button type='button' startime={start} onClick={(e) => endEntry(entry._id, e)} title={title} className='btn btn-light my-1' value="End">End</button>}
               <button type='button' onClick={() => deleteEntry(entry._id)} className='btn btn-light my-1' value="Delete">Delete</button>
               </div>

             </form>
             <div parent="moodModal" onClick={() => setEdit(false)} title="Close" value={entryid} className="close">X</div>
</div>
      </div>
      </td></tr>
           </Fragment>
     ) : (
       <Fragment>
       <tr>
          <td data-th="title">{title}</td>
          <td data-th="type">{type}</td>
          <td data-th="direction">{direction}</td>
          <td data-th="start">{formatDateTimeAll(start)}</td>
          <td data-th="end">{end ? formatDateTimeAll(end) : end}</td>
          <td data-th="duration">{duration === 0 ? '0M' : duration ? durationFNS(new Date(start).toISOString(), null, new Date(end).toISOString()) : duration}</td>
          <td data-th="description">{description}</td>
          <td data-th="edit">  <button type='button' onClick={()=> setToEdit(true)} className='btn btn-light my-1' value={entryid}>Edit</button></td>
          <td data-th="delete"><button type='button' onClick={() => deleteEntry(entry._id)} className='btn btn-light my-1' value="Delete">Delete</button></td>
       </tr>
        </Fragment>
     )}

     </Fragment>

  );
};

EntryHorizontal.propTypes = {
  deleteEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired
};



export default connect(null, { deleteEntry, editEntry } )(withRouter(EntryHorizontal));
