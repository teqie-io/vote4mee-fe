import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import EmployeeCard from "../components/carroussel/EmployeeCard";
import Carroussel from "../components/carroussel/Carroussel";
import { getEmployeesState } from '../store/selectors';
import {getEmployees} from "../store/reducers/employeesReducer";

const Employee = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector(state => getEmployeesState(state));

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!employees.length) dispatch(getEmployees({}));
    else setCards(employees.map(({ walletId, employeeId, name, roleId, skills, overview, comments }, index) => ({
        key: index,
        content: <EmployeeCard name={name} roleId={roleId} overview={overview}
                               photoURL={`/static/mock-images/avatars/avatar_${employeeId}.jpg`}
                               content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'}
                               comments={comments}
                               skillList={skills}
                               walletId={walletId}
                               socialList={generateRandomSocial()} />
    })));
  }, [employees])

  const generateRandomSocial = () => {
    const result = [];
    for (let i = 0; i < 4; i += 1) if (Math.random() > 0.3) result.push(i);
    return result;
  }

  if (!cards.length)
    return <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Box>;
  return (
        <Carroussel cards={cards} height="100%" width="80%" margin="0 auto" offset={1} />
  );
}

export default Employee;