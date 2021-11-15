import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEntry, editEntry, setEntry } from '../../actions/entries';
import {formatDateTime, duraionMinutes, setEndDate, removeSeconds, durationFNS} from '../../utils/formatDate';
import {addOrEditTypeAndDirection, typeAndDirectionMain} from '../../utils/typeAndDirection';
import EditTypeDir from './editTypeDir';
import { setShow } from '../../actions/showHide';
import { newUserCategory } from '../../actions/categories';




const Edit = ({ editEntry, setEntry, deleteEntry, setShow, entry, entryState, newUserCategory
}) => {

  console.log(entryState);

  const [formData, setFormData] = useState({
    title: entry.title,
    type: entryState.type ? entryState.type : entry.type,
    direction: entryState.direction ? entryState.direction : entry.direction,
    start: entry.start,
    end: entry.end ? entry.end : '' ,
    duration: entry.duration ? entry.duration : '' ,
    description: entry.description,
    entryid: entry._id
  });

  const [editCategories, setEditCategories] = useState(false)
  const [titleSend, setTitleSend] = useState([]);
  const [editCategoryForm, setEditCategoryForm] = useState('No Change');
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

 useEffect(() => {
   setDurationArray(durationFNS(start, true, end));
 }, [start, end]);

 useEffect(() => {
     setTitleSend(title.split(" "));
 }, [title]);

 useEffect(() => {
   if (entryState) {
   setFormData({
     ...formData,
     type: entryState.type ? entryState.type : entry.type,
     direction: entryState.direction ? entryState.direction : entry.direction
   })}
 }, [entryState]);


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

    const onSubmit = async (e) => {
      e.preventDefault();
      console.log('Edit Category Form');
      console.log(editCategoryForm);
      if (editCategoryForm !== 'No Change') {
        await newUserCategory(editCategoryForm);
        let typeAndDirection = await typeAndDirectionMain(title);
        console.log('type and direction main');
        console.log(typeAndDirection);
        setEntry(typeAndDirection);
      }
      if (end) {
        editEntry(entryid, formData, true);
      } else {
        editEntry(entryid, formData);
      }
     setShow(false)}

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

    const onChangeType = e => {
      if (e.target.name === 'type') {
        checkDirChange(title, direction, e.target.value );
      } else {
        checkDirChange(title, e.target.value, type );
      }
      setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const checkDirChange = async (title, direction, type) => {
      let typeDirChange = {};
        typeDirChange = await addOrEditTypeAndDirection(title, direction, type);
        console.log('Type Dir change');
        console.log(typeDirChange);
        setEditCategoryForm(typeDirChange)
      return typeDirChange;
    }

  return (
    <Fragment>
    { editCategories !== true ? (
             <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="entryTitle">
                 <input type="text" placeholder="title" name="title" required="" value={title} onChange={e => onChange(e)}/>
                 <small className="form-text">Title of this entry.</small>
               </div>
               {title.split(' ').length > 1 ? (
                 <div>
              <div className="entryTitle">
              <small className="form-text">If the direction is not accurate, please change it.</small>
               <select className="entrySelect" id="" name="type" value={type} onChange={e => onChangeType(e)}>
                 <option value="No Type">Unknown</option>
                 <option value="Action & Emotion" disabled>Action with Emotion</option>
                 <option value="Action & Emotion & Physical" disabled>Action with Emotion & Physical</option>
                 <option value="Action & Physical" disabled>Action with Physical</option>
                 <option value="Emotions">Emotional Feeling</option>
                 <option value="Physical">Phsyical Feeling</option>
                 <option value="Physical & Emotional" disabled>Physical & Emotional</option>
                 <option value="Action">Action</option>
                </select>
                </div>
                <div className="entryTitle">
                   <small className="form-text">If the direction is not accurate, please change it.</small>
               <select className="entrySelect" id="" name="direction" value={direction} onChange={e => onChangeType(e)}>
                 <option value="No Direction">Unknown</option>
                 <option value="positive & negative" disabled>Positive & Negative</option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="neutral">Neutral</option>
                </select>
                </div>

                 <div className="entryTitle">
                 <small className="form-text">If you want to change the direcitona or type of individual words in this phrase, you can do so by clicking the button below.</small>
                     <button type='button' onClick={() => setEditCategories(true)} className='btn btn-light my-1' value="True">Edit Individual Words Direction/Type</button>
                 </div>
                 </div>
               ) : (
                 <div>
                  <div className="entryTitle">
                 <select className="entrySelect" id="" name="type" value={type} onChange={e => onChangeType(e)}>
                   <option value="No Type">Unknown</option>
                   <option value="Emotions">Emotional Feeling</option>
                   <option value="Physical">Phsyical Feeling</option>
                   <option value="Action">Action</option>
                  </select>
                  <small className="form-text">If the direction is not accurate, please change it.</small>
                  </div>
                  <div className="entryTitle">
                 <select className="entrySelect" id="" name="direction" value={direction} onChange={e => onChangeType(e)}>
                    <option value="No Direction">Unknown</option>
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
               <input type="hidden" name="duration" value={duration}/>
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
             //Edi
             <div className="modalDialog modalDialogshow" id="Edit">
              <div>
                   <div parent="moodModal" onClick={() => setEditCategories(false)} title="Close" value={entryid} className="close">X</div>

                         {titleSend.map((singleTitle) => (
                           <EditTypeDir titleSent={singleTitle} key={singleTitle} formDataEdit={formData} />
                         ))}
                  <button type='button' className='btn btn-light my-1' onClick={() => setEditCategories(false)} title="Close" value={entryid}>Close</button>
              </div>
            </div>
          )}
        </Fragment>
  );
};

const mapStateToProps = state => ({
  show: state.showHide,
  entryState: state.entries.entry

});

Edit.propTypes = {
  deleteEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired,
  setEntry: PropTypes.func.isRequired,
  newUserCategory: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteEntry, editEntry, setEntry, setShow, newUserCategory } )(withRouter(Edit));
