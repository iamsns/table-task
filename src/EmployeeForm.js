import React, { useState, useEffect, useContext } from "react"
import {UserContext} from "./App";
const EmployeeForm = () => {
    const data = useContext(UserContext)
    const [formData, setFormData] = useState({})
    const [validated, setValidated] = useState(false)

    useEffect(()=>{
        if ( Object.keys(data.editableData).length === 0 ) {
            console.log("no update")
        } else {
            console.log("update")
            setFormData(data.editableData)
        }
    },[data])
    // ----------------- Events ------------------ //

    const handleChange = (e) => {
        e.target.setCustomValidity('');
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data.editableData)
        console.log(formData)
        if (formData.name === "" || formData.department === "" || formData.salary === "" ) {
          setValidated(true)
          e.stopPropagation()
        } else {
            setValidated(false)
          if (data.action === "Add") {
            data.setEmployeeDataList([...data.employeeDataList, formData])
          } else if (data.action === "Update") {
            let tempArr = [...data.employeeDataList]
            tempArr[data.editableIndex] = formData
            data.setEmployeeDataList(tempArr)
            data.setEditableIndex(-1)
            data.setEditableData({})
            data.setAction("Add")
          }
          setFormData({ ["name"]: "", ["department"]: "", ["salary"]: "" })
        }
    }

    return (
        <>
            <form className={validated ? 'was-validated' : ''} onSubmit={handleSubmit} >
                <div className='form-group col-8 mt-2'>
                    <label>Employee Name</label>
                    <input type="text" className='form-control mt-2' name="name" value={formData.name} placeholder='Enter employee name' onChange={handleChange} minLength={3} maxLength={20} pattern='[A-Za-z][A-Za-z\s-]{1,18}[A-Za-z]'  onInvalid={(e)=>{
              e.target.setCustomValidity("Name should be contains only alphabets, space and '-' and space and '-' should not be at the start and end position")}} required />
                </div>
                <div className='form-group col-8 mt-2'>
                    <label>Department</label>
                    <textarea className='form-control mt-2' name="department" rows="2" cols="50"  minLength={3} maxLength={30} onChange={handleChange} required value={formData.department} ></textarea>
                </div>
              <div className='form-group col-8 mt-2'>
                    <label>Salary</label>
                    <input type="text" className='form-control mt-2' name="salary" value={formData.salary} placeholder='Enter Salary' onChange={handleChange} pattern="[0-9]+" required  onInvalid={(e)=>{
              e.target.setCustomValidity("Only number allowed")}} />
                </div>
                <button type="submit" className='btn btn-success  mt-2'>{data.action}</button>
            </form>
        </>
    )
}

export default EmployeeForm