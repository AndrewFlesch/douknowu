import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {durationFNS} from './formatDate';


const Interval = ({
date
}) => {
  const [duration, setDuration] = useState(durationFNS(date));

  useEffect(() => {
  const interval = setInterval(() => {
   setDuration(durationFNS(date));
 }, 60000);
 return () => clearInterval(interval);
},[date]);

  return (
    <Fragment>
      {duration}
    </Fragment>
  )

}

export default connect(null)(withRouter(Interval));
