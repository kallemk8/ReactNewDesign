import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
const Department = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [departmentList, setDepartmentList] = useState([]);
    const [department, addDepartment] = useState(false);
    const [editDepartment, seteditDepartment] = useState(false);
    const [editID, setEdited] = useState();
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
        getDepartmentList();
    }, [])
    const saveDepartment = async () =>{
        var req = {
            "name":getValues("name"),
            "sub_depat":getValues("sub_depat"),
            "testing":getValues("desc"),
            "status":getValues("status")
        }
        if(!editID){
            try {
                const response = await axios.post('http://localhost:5000/department', req);
                if(response.data.insertId){
                    getDepartmentList();
                    addDepartment(false);
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }else{
            try {
                const response = await axios.put(`http://localhost:5000/department/${editID}`, req);
                if(response.data.changedRows){
                    getDepartmentList();
                    addDepartment(false);
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }
        
    }
    const DeleteDepartment = async (deleteid) => {
        try {
            const response = await axios.delete(`http://localhost:5000/department/${deleteid}`);
            if(response.data.affectedRows){
                getDepartmentList();
                addDepartment(false);
                reset();
            }
          } catch (error) {
            console.error(error);
          }
    }
    const onloadDetails = (data) => {
        setValue('name', data.name)
        setValue('sub_depat', data.sub_depat)
        setValue('desc', data.testing)
        setValue('status', data.status)
    }
    return (
        <>
            <div className="container">
                
            <table className="table">
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Sub Department</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {departmentList.map((item, i)=>{
                        return (
                            <tr key={i}>
                                <td>
                                    {!editDepartment ? 
                                    <span>{item.name}</span>
                                    : <span><input type="text" className="form-control"  {...register("name")}  placeholder="Name"/></span>}
                                </td>
                                <td>
                                    {!editDepartment ? 
                                    <span>{item.sub_depat}</span>
                                    :<span><input type="text" className="form-control" {...register("sub_depat")}   placeholder="Name"/></span>}
                                    
                                </td>
                                <td>
                                    {!editDepartment ?<span>{item.testing}</span> :
                                    <span><input type="text" className="form-control" {...register("desc")} placeholder="Name"/></span>}
                                </td>
                                <td>
                                    {editDepartment ?<span>
                                        <select className="form-control"  {...register("status")}  >
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </select>
                                    </span>:
                                    <span>{item.status === 1 ?  "Active" : "Inactive"}</span>}
                                </td>
                                <td>
                                    {editDepartment ? <><button className="btn btn-primary" onClick={()=>saveDepartment()}>Save</button> 
                                    <button className="btn btn-primary" >Cancel</button></>:
                                    <>
                                        <button className="btn btn-primary" style={{marginRight:"15px"}} onClick={()=>{addDepartment(true); setEdited(item.ID); onloadDetails(item)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg> 
                                        </button>
                                        <button className="btn btn-danger" onClick={()=>{DeleteDepartment(item.ID)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </button>
                                    </>
                                   }
                                </td>
                            </tr>
                        )
                    })}
                    {department ?
                    <tr>
                        <td>
                            <input type="text" className="form-control" {...register("name")}   placeholder="Name"/>
                        </td>
                        <td>
                            <input type="text" className="form-control" {...register("sub_depat")}  placeholder="Sub Department" />
                        </td>
                        <td>
                            <input type="text" className="form-control" {...register("desc")} placeholder="Description" />
                        </td>
                        <td>
                            <select className="form-control" {...register("status")} >
                                <option value="">Select Status</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={()=>saveDepartment()}>Save</button> &nbsp;
                            <button className="btn btn-primary" onClick={()=>addDepartment(false)}>Cancel</button>
                        </td>
                    </tr>
                    :
                    <tr>
                        <td colSpan={5}><button className="btn btn-primary" onClick={()=>{addDepartment(true); setEdited("");}}>Add</button></td>
                    </tr>}
                </tbody>
            </table>
            </div>
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
export default Department;