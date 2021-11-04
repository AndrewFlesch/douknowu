import axios from 'axios';

//Set x-auth-token header if their is a local storage token
const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;
