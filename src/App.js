import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import DataTable from './DataTable';
import EmployeeForm from './EmployeeForm'
import React, { useState, createContext } from 'react'
export const UserContext = createContext();
function App() {
  const [action, setAction] = useState("Add")
  const [editableData, setEditableData] = useState({})
  const [editableIndex, setEditableIndex] = useState(-1)
  const [employeeDataList, setEmployeeDataList] = useState([])

  return (
    <div className="container">
      <h1 className='text-secondary text-center'>
        Employee Details
      </h1><hr />
      <UserContext.Provider value={{action:action, setAction:setAction,employeeDataList:employeeDataList,setEmployeeDataList:setEmployeeDataList,editableData:editableData,editableIndex:editableIndex,setEditableData:setEditableData,setEditableIndex:setEditableIndex}}>
      <div className='row'>
        <div className='col-5 mt-2' >
          <EmployeeForm  />
        </div>
        <div className='col-7 mt-2'>
          {employeeDataList.length > 0 ? <DataTable  />:<div>No employee found</div> }
        </div>
      </div>
    </UserContext.Provider>
    </div>
  );
}

export default App;
