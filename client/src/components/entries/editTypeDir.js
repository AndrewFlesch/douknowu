import React, { Fragment, useState, useEffect } from 'react';
import {addOrEditTypeAndDirection, typeAndDirectionMain} from '../../utils/typeAndDirection';
import { newUserCategory  } from '../../actions/categories';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEntry, setEntry} from '../../actions/entries';


const EditTypeDir = ({ titleSent, newUserCategory, editEntry, setEntry, formDataEdit
}) => {

const [editCategoryForm, setEditCategoryForm] = useState('No Change');

const titleTypeDirection = async () => {
      let typeDirection = await typeAndDirectionMain(titleSent);
      if (typeDirection) {
        setFormData({
          ...formData,
          direction: typeDirection.direction,
          type: typeDirection.type
        })
      }    };

    useEffect(() => {
        titleTypeDirection();
    }, []);

  const [formData, setFormData] = useState({
    type: 'type',
    direction: 'direction',
    title: titleSent
  })

  const onSumbmitFormData = {
    id: '',
    type: '',
    direction: ''
  }

  console.log(formData);

 const {
   type,
   direction,
   title
 } = formData;

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
     console.log(typeDirChange);
     setEditCategoryForm(typeDirChange)
   return typeDirChange;
 }

 const onSubmit = async (e) => {
   e.preventDefault();
  if (editCategoryForm !== 'No Change') {
  await newUserCategory(editCategoryForm);
  let typeAndDirection = await typeAndDirectionMain(formDataEdit.title);
  console.log(typeAndDirection);
  setEntry(typeAndDirection);
  editEntry(formDataEdit.entryid, typeAndDirection);
}}


  return (
    <form className="form" onSubmit={e => onSubmit(e)}>
    <div className='typedirchange'>
           <div className="entryTitle">
              {title}
            </div>
            <div className="entryTitle type">
            <small className="form-text">Direction for this word.</small>
               <select className="entrySelect" id="" name="direction" value={direction} onChange={e => onChangeType(e)}>
                  <option value="No Type">Unknown</option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="neutral">Neutral</option>
              </select>
            </div>
            <div className="entryTitle direction">
              <small className="form-text">Type for this word.</small>
               <select className="entrySelect" id="" name="type" value={type} onChange={e => onChangeType(e)}>
                 <option value="No Direction">Unknown</option>
                 <option value="Action">Action</option>
                 <option value="Emotions">Emotion</option>
                 <option value="Physical">Physical</option>
                </select>
            </div>
            <div className="entryTitle button">
             <button type="submit" className="btn btn-primary" value="">Change</button>
            </div>
    </div>
    </form>
  );
};

EditTypeDir.propTypes = {
  newUserCategory: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired,
  setEntry: PropTypes.func.isRequired
};

export default connect(null, { newUserCategory, editEntry, setEntry } )(withRouter(EditTypeDir));
