import axios from 'axios';
import { useState } from 'react';
import { logIt, LogType } from '@nielsendigital/ms-common';

const UseRequest = ({ url, method, body, onSuccess }) => {
  //method === get || post || patch ...
  const [errors, setErrors] = useState([]);

  const doRequest = async (props = {}) => {
    try {
      // reset errors from previous request
      setErrors([]);
      const response = await axios[method](url, { ...body, ...props });
      logIt.out(LogType.RECEIVED, response);

      // if onSuccess callback present then pass in response.data and call
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      logIt.out(LogType.ERROR, err);
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
};

export default UseRequest;
