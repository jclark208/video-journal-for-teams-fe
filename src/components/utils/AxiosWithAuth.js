import axios from 'axios';

const AxiosWithAuth = () => {
  const token = localStorage.getItem('token');
  
  return axios.create({
    baseURL: process.env.REACT_APP_ENV === "development" ? process.env.REACT_APP_LOCAL_HOST : process.env.REACT_APP_STAGING_URL,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  });
};

export default AxiosWithAuth;