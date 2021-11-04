import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../../actions/entries';
import Spinner from '../layout/Spinner';
import { removeSeconds } from '../../utils/formatDate';
import {typeAndDirectionMain} from '../../utils/typeAndDirection';

const NewEntry = ({ addEntry }) => {

  const [formData, setFormData] = useState({
    title: '',
    });

  const {
  title
} = formData;

  const onSumbmitFormData = {
    title: '',
    start: '',
    type: '',
    direction: ''
  }


  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault();
    onSumbmitFormData.title = title;
    onSumbmitFormData.start = removeSeconds(new Date());
    let typeAndDirection = await typeAndDirectionMain(title);
    onSumbmitFormData.type = typeAndDirection.type;
      onSumbmitFormData.direction = typeAndDirection.direction;
    console.log(onSumbmitFormData);
    addEntry(onSumbmitFormData);
    setFormData({title: ''});
  }

    return (
    <div className="newEntry">
          <h4>How Are You? What Are You Doing?</h4>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
            <input type="text" className="mainEntry" placeholder="" name="title" value={title} onChange={e => onChange(e)}/>
            <input type="submit" className="btn btn-primary mainSubmit" value="Submit"/>
            </div>
          </form>
        </div>
  )
}



export default connect(null, { addEntry })(NewEntry)
