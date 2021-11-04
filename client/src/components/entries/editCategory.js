import React, { Fragment, useState, useEffect } from 'react';
import {addOrEditTypeAndDirection, typeAndDirectionMain} from '../../utils/typeAndDirection';


const EditCategory = ({ titleSent
}) => {


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
        let typeDirection = titleTypeDirection();
        console.log(typeDirection);
    }, []);

  const [formData, setFormData] = useState({
    type: 'type',
    direction: 'direction',
    title: titleSent
  })

  console.log(formData);

  const endFormData = {
    type: '',
    direction: '',
    title: ''
  }

 const {
   type,
   direction,
   title
 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  return (
    <Fragment>
           <div className="entryTitle">
              {title}
              <small className="form-text">Title of this entry.</small>
            </div>
            <div className="entryTitle">
               <select className="entrySelect" id="" name="type" value={type} onChange={e => onChange(e)}>
                 <option value="Action">Action</option>
                 <option value="Emotion">Emotion</option>
                 <option value="Physical">Physical</option>
                </select>
                <small className="form-text">If the direction is not accurate, please change it.</small>
            </div>
            <div className="entryTitle">
               <select className="entrySelect" id="" name="direction" value={direction} onChange={e => onChange(e)}>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="neutral">Neutral</option>
              </select>
              <small className="form-text">If the direction is not accurate, please change it.</small>
            </div>
    </Fragment>
  );
};


export default EditCategory
