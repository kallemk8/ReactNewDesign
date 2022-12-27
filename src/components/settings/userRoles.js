import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import Breadcrumb from "../header/breadcrumb";
const UserRoles = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [userrolesList, setuserrolesList] = useState([]);
    const [rolesList, setrolesList] = useState([]);
    const [usersList, setusersList] = useState([]);
    const [department, addDepartment] = useState(false);
    const [editDepartment, seteditDepartment] = useState(false);
    const [editID, setEdited] = useState();
    const getuserrolessList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/userroles');
            setuserrolesList(response.data)
          } catch (error) {
            console.error(error);
          }
    }

    const getrolesList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/roles');
            setrolesList(response.data)
          } catch (error) {
            console.error(error);
          }
    }

    const getusersList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setusersList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getusersList();
        getrolesList();
        getuserrolessList();
    }, [])
    const saveDepartment = async () =>{
        var req = {
            "roleID":getValues("role"),
            "userID":getValues("user")
        }
        if(!editID){
            try {
                const response = await axios.post('http://localhost:5000/userroles', req);
                if(response.data.insertId){
                    getuserrolessList();
                    addDepartment(false);
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }else{
            try {
                const response = await axios.put(`http://localhost:5000/userroles/${editID}`, req);
                if(response.data.changedRows){
                    getuserrolessList();
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
            const response = await axios.delete(`http://localhost:5000/userroles/${deleteid}`);
            if(response.data.affectedRows){
                getuserrolessList();
                addDepartment(false);
                reset();
            }
          } catch (error) {
            console.error(error);
          }
    }
    const onloadDetails = (data) => {
        setValue('user', data.userID)
        setValue('role', data.roleID)
    }
    return (
        <>
        <div className="content container-fluid">
            <Breadcrumb title="User Roles" navigation={[{to:"/", name:"Home", show:true}, {to:"/", name:"User Role", show:false}]} />
            <table className="table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userrolesList.map((item, i)=>{
                        return (
                            <tr key={i}>
                                <td>
                                    {!editDepartment ? 
                                    <span>{item.Name}</span>
                                    : <span>
                                        <select className="form-control" {...register("user")} >
                                            <option value="">Select user</option>
                                            {usersList.map((user,i)=>{
                                                return (<option value={user.id}>{user.Name}</option>)
                                            })}
                                        </select>
                                    </span>}
                                </td>
                                <td>
                                    {!editDepartment ? 
                                    <span>{item.role_name}</span>
                                    :<span>
                                        <select className="form-control" {...register("role")} >
                                            <option value="">Select role</option>
                                            {rolesList.map((role,i)=>{
                                                return (<option value={role.id}>{role.role_name}</option>)
                                            })}
                                        </select>
                                    </span>
                                    }
                                    
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
                            <select className="form-control" {...register("user")} >
                                <option value="">Select User</option>
                                {usersList.map((user,i)=>{
                                    return (<option value={user.UserID}>{user.Name}</option>)
                                })}
                            </select>
                        </td>
                        <td>
                            <select className="form-control" {...register("role")} >
                                <option value="">Select Role</option>
                                {rolesList.map((role,i)=>{
                                    return (<option value={role.ID}>{role.role_name}</option>)
                                })}
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
export default UserRoles;