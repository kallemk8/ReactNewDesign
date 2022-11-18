import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
const Designation = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [designationList, setdesignationList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [desingation, addDesingation] = useState(false);
    const [editDesignation, seteditDesignation] = useState(false);
    const [editID, setEdited] = useState();
    const getdesignationList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/designation');
            console.log(response);
            setdesignationList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    const getDepartmentList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/department');
            console.log(response);
            setDepartmentList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getdesignationList();
        getDepartmentList();
    }, [])
    const saveDesignation = async () =>{
        var req = {
            "designation":getValues("designation"),
            "department":getValues("department"),
            "description":getValues("description"),
            "status":getValues("status")
        }
        if(!editID){
            try {
                const response = await axios.post('http://localhost:5000/designation', req);
                if(response.data.insertId){
                    getdesignationList();
                    addDesingation(false);
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }else{
            try {
                const response = await axios.put(`http://localhost:5000/designation/${editID}`, req);
                if(response.data.changedRows){
                    getdesignationList();
                    addDesingation(false);
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }
        
    }
    const DeleteDesignation = async (deleteid) => {
        try {
            const response = await axios.delete(`http://localhost:5000/designation/${deleteid}`);
            if(response.data.affectedRows){
                getdesignationList();
                addDesingation(false);
                reset();
            }
          } catch (error) {
            console.error(error);
          }
    }
    const onloadDetails = (data) => {
        setValue('designation', data.designation)
        setValue('department', data.department)
        setValue('description', data.description)
        setValue('status', data.status)
    }
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Designation</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Form</li>
                </ol>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                        <th>Designation Name</th>
                        <th>Department</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {designationList.map((item, i)=>{
                        return (
                            <tr key={i}>
                                <td><span>{item.designation}</span></td>
                                <td><span>{item.name}</span> </td>
                                <td><span>{item.description}</span> </td>
                                <td><span> {item.status === 1 ?  "Active" : "Inactive"}</span></td>
                                <td>
                                    {editDesignation ? <><button className="btn btn-primary" onClick={()=>saveDesignation()}>Save</button> 
                                    <button className="btn btn-primary"onClick={()=>addDesingation(false)} >Cancel</button></>:
                                    <><button className="btn btn-primary" style={{marginRight:"15px"}} onClick={()=>{addDesingation(true); setEdited(item.ID); onloadDetails(item)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                  </svg> </button>
                                    <button className="btn btn-danger" onClick={()=>{DeleteDesignation(item.ID)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg></button></>}
                                </td>
                            </tr>
                        )
                    })}
                    {desingation ?
                    <tr>
                        <td>
                            <input type="text" className="form-control" {...register("designation")}   placeholder="Name"/>
                        </td>
                        <td>
                            <select className="form-control" {...register("department")} >
                                <option value="">Select Department</option>
                                {departmentList.map((item)=>{
                                    return (
                                        <option value={item.ID}>{item.name}</option>
                                    )
                                })}
                               
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" {...register("description")} placeholder="Description" />
                        </td>
                        <td>
                            <select className="form-control" {...register("status")} >
                                <option value="">Select Status</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={()=>saveDesignation()}>Save</button> &nbsp;
                            <button className="btn btn-primary" onClick={()=>addDesingation(false)}>Cancel</button>
                        </td>
                    </tr>
                    :
                    <tr>
                        <td colSpan={5}><button className="btn btn-primary" onClick={()=>{addDesingation(true); setEdited("");}}>Add</button></td>
                    </tr>}
                </tbody>
            </table>
            {/* <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> */}
        </>
    )
}
export default Designation;