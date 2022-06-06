import {handleActions} from 'redux-actions';
import axios from 'axios';

import asyncAction from '../asyncAction';

export const getEmployees =  asyncAction('EMPLOYEES/ALL', async () => {
  const employees = (await axios.get(`http://localhost:9090/employees`)).data;
  const profiles = (await axios.get(`http://localhost:9090/profiles`)).data;
  const comments = (await Promise.all(profiles.map(({ id }) => axios.get(`http://localhost:9090/comments/${id}`))))
    .map((response) => response.data);
  return ({
    data: profiles.map((profile, index) => ({
      ...employees.filter(employee => employee.id === profile.employeeId)[0],
      ...profile,
        comments: comments[index]
      }))
  });
});


const initialState = {
    loading: true,
    error: false,
    response: null,
    employees: []
};

export default handleActions(
    {
        [getEmployees.START]: () => initialState,
        [getEmployees.SUCCESS]: (state, action) => ({
            loading: false,
            error: false,
            response: null,
            employees: action?.payload
          }),
        [getEmployees.FAILURE]: (state, error) => ({
            loading: false,
            error: true,
            response: error,
            employees: []
        }),
    },
    initialState
);