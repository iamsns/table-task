import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "./App";
const DataTable = () => {
  const data = useContext(UserContext)
  console.log(data.action)
  const [ filteredData, setFilteredData ] = useState(data.employeeDataList)
  const [searchText, setSearchText] = useState("")
  const handleDelete = (e, value) => {
    e.preventDefault()
    const filteredArray = data.employeeDataList.filter(val => {
      if (val.name === value.name && val.department === value.department && val.salary === value.salary) {
        return false;
      } else {
        return true;
      }
    })

    data.setEmployeeDataList(filteredArray)
  }
useEffect(() => {
  setFilteredData(data.employeeDataList)
}, [data])

  const handleEdit = (e, value, index) => {
    e.preventDefault()
    data.setEditableIndex(index)
    data.setEditableData(value)
    data.setAction("Update")
  }

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setSearchText(e.target.value)
    if ( e.target.value === "" ) {
      setFilteredData(data.employeeDataList)
    }
  }
  const handleSelectChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setSearchText(e.target.value)
    if ( e.target.value === "all" ) {
      setFilteredData(data.employeeDataList)
    } else if ( e.target.value === "highest" )  {
      let max = 0
      data.employeeDataList.map(value=>{
        if (parseInt(value.salary) > max) {
          max = parseInt(value.salary)
        }
      })
      const filteredArray = data.employeeDataList.filter(val => parseInt(val.salary) === max)
      setFilteredData(filteredArray)
    } else if ( e.target.value === "lowest" )  {
      let min = parseInt(data.employeeDataList[0].salary)
      data.employeeDataList.map(value=>{
        if (parseInt(value.salary) < min) {
          min = parseInt(value.salary)
        }
      })
      const filteredArray = data.employeeDataList.filter(val => parseInt(val.salary) === min)
      setFilteredData(filteredArray)
    }
  }

  const handleSearchClick = (e) => {
    e.preventDefault()
    const filteredArray = data.employeeDataList.filter(val => val.department.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredData(filteredArray)
  }

  return (
    <>
      <form className="row mb-2">
      <div  className='col-3 mt-2' >
        <select onChange={handleSelectChange}>
          <option value="all" >All</option>
          <option value="lowest" >Lowest Salary</option>
          <option value="highest" >Highest Salary</option>
        </select>
        </div>
        <div className='col-2' ></div>
        <div className='col-7 mt-2' >

        <input type="search" placeholder="Search by department" onChange={handleChange} />
        <button className=" col-2" onClick={handleSearchClick}>Search</button>
        </div>
      </form>
      <table className='table table-bordered  table-striped'>
        <thead>
          <th scope='col'>S.No.</th>
          <th scope='col'>Name</th>
          <th scope='col'>Department</th>
          <th scope='col'>Salary</th>
          <th scope='col'>Action</th>
        </thead>
        <tbody>

          {filteredData.map((value, index) => {
            return (<tr key={index}>
              <td>{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.department}</td>
              <td>{value.salary}</td>
              <td>
                <span className='btn btn-danger pd-1' style={{ "paddingTop": "2px", "paddingBottom": "2px", "paddingRight": "5px", "paddingLeft": "5px", "marginRight": "5px" }} onClick={(e) => handleDelete(e, value)}><i className='fa fa-trash' ></i></span>
                <span className='btn btn-info pd-1' style={{ "paddingTop": "2px", "paddingBottom": "2px", "paddingRight": "5px", "paddingLeft": "5px" }} onClick={(e) => handleEdit(e, value, index)}><i className='fa fa-edit' ></i></span>
              </td>
            </tr>)

          })}
          {filteredData.length === 0 && <tr>No match found</tr>}
        </tbody>
      </table>
    </>
  )
}

export default DataTable