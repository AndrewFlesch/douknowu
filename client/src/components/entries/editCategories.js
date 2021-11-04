import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEntry } from '../../actions/entries';
import EditCategory from './editCategory';
import {addOrEditTypeAndDirection, typeAndDirectionMain} from '../../utils/typeAndDirection';
import Spinner from '../layout/Spinner';


const EditCategories = ({ entry}) => {

  const [formData, setFormData] = useState({
    type: entry.type,
    direction: entry.direction,
  });

  const [titleSend, setTitleSend] = useState([]);


  useEffect(() => {
      setTitleSend(entry.title.split(" "));
  }, []);


const [editCategories, setEditCategories] = useState(false);


 const [editDirTyp, setEditDirTyp] = useState([]);


  const endFormData = {
    type: '',
    direction: '',
  }

 const {
   type,
   direction,
   entryid
 } = formData;


    const onSubmit = async (e) => {
    }


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})


  return (
             <form className="form" onSubmit={e => onSubmit(e)}>
               <div className="entryTitle">
               <select className="entrySelect" id="" name="type" value={type} onChange={e => onChange(e)}>
                 <option value="Action with Emotion">Action with Emotion</option>
                 <option value="Action with Emotion & Physical">Action with Emotion & Physical</option>
                 <option value="Action with Physical">Action with Physical</option>
                 <option value="Emotion">Emotional Feeling</option>
                 <option value="Physical">Phsyical Feeling</option>
                 <option value="Physical & Emotional">Physical & Emotional</option>
                 <option value="Action">Action</option>
                </select>
                <small className="form-text">If the direction is not accurate, please change it.</small>
                </div>
                <div className="entryTitle">
               <select className="entrySelect" id="" name="direction" value={direction} onChange={e => onChange(e)}>
                 <option value="positive & negative">Positive & Negative</option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="neutral">Neutral</option>
                </select>
                 <small className="form-text">If the direction is not accurate, please change it.</small>
                 </div>
                   {titleSend.map((singleTitle) => (
                     <EditCategory titleSent={singleTitle} key={singleTitle} />
                   ))}


             </form>
  );
};

EditCategories.propTypes = {
  editEntry: PropTypes.func.isRequired
};

export default connect(null, {  editEntry } )(withRouter(EditCategories));
//
