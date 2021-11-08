import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDuration from '../../utils/getDuration';
import Interval from '../../utils/interval';
import { deleteEntry, editEntry } from '../../actions/entries';
import {formatDateTime, durationFNS, duraionMinutes, setEndDate, removeSeconds} from '../../utils/formatDate';
import {addOrEditTypeAndDirection} from '../../utils/typeAndDirection';
import EditCategories from './editCategories';
import { setShow } from '../../actions/showHide';


const Edit = ({ editEntry, deleteEntry, setShow, entry
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
  });

  const [editCategories, setEditCategories] = useState(false);

  const [edit, setEdit] = useState(false);

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
     setEdit(false)}

    const setToEdit = e => {
      setEdit(true);
      setDurationArray(durationFNS(start, true));
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onChangeType = e => {
      if (e.target.name === 'type') {
        console.log(e.target.value);
        addOrEditTypeAndDirection(title, direction, e.target.value);
      } else {
        console.log(title & type & e.target.value);
        addOrEditTypeAndDirection(title, e.target.value, type);
      }
            setFormData({ ...formData, [e.target.name]: e.target.value})
    };

  return (
    <Fragment>
    { editCategories !== true ? (
             <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="entryTitle">
                 <input type="text" placeholder="title" name="title" required="" value={title} onChange={e => onChange(e)}/>
                 <small className="form-text">Title of this entry.</small>
               </div>
               {title.split(' ').length > 1 ? (
                 <div className="entryTitle">
                   <div>{type}</div>
                   <div>{direction}</div>
                     <button type='button' onClick={() => setEditCategories(true)} className='btn btn-light my-1' value="True">Edit</button>
                 </div>
               ) : (
                 <div>
                  <div className="entryTitle">
                 <select className="entrySelect" id="" name="type" value={type} onChange={e => onChangeType(e)}>
                   <option value="Emotion">Emotional Feeling</option>
                   <option value="Physical">Phsyical Feeling</option>
                   <option value="Action">Action</option>
                  </select>
                  <small className="form-text">If the direction is not accurate, please change it.</small>
                  </div>
                  <div className="entryTitle">
                 <select className="entrySelect" id="" name="direction" value={direction} onChange={e => onChangeType(e)}>
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                    <option value="neutral">Neutral</option>
                  </select>
                   <small className="form-text">If the direction is not accurate, please change it.</small>
                   </div>
                   </div>
               )}

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
               <button type="button" onClick={() => setShow(false)} className="btn btn-primary" value="">Cancel</button>
               <button type='button' startime={start} onClick={(e) => endEntry(entry._id, e)} title={title} className='btn btn-light my-1' value="End">End</button>
               <button type='button' onClick={() => deleteEntry(entry._id)} className='btn btn-light my-1' value="Delete">Delete</button>
               </div>
            </form>
           ) : (
             <div className="modalDialog modalDialogshow" id="Edit">
              <div>
                   <div parent="moodModal" onClick={() => setEditCategories(false)} title="Close" value={entryid} className="close">X</div>
                   <EditCategories entry={entry} />
              </div>
            </div>
          )}
        </Fragment>
  );
};

const mapStateToProps = state => ({
  show: state.showHide
});

Edit.propTypes = {
  deleteEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteEntry, editEntry, setShow } )(withRouter(Edit));
