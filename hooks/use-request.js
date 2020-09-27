import axios from 'axios';
import { useState } from 'react';

const UseRequest = ({ url, method, body, onSuccess }) => {
  //method === get || post || patch ...
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors([]);
      const response = await axios[method](url, body);
      console.log('response: ', response);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      console.log('err: ', err);
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
};

export default UseRequest;
