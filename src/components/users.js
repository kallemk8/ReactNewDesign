import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
const Users = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [userList, setUserList] = useState([]);
    const [user, addUser] = useState(false);
    //const [editDesignation, seteditDesignation] = useState(false);
    const [editID, setEdited] = useState();
    const getUsersList = async () => {
        var user = localStorage.getItem('user-info');
        var tempuser = JSON.parse(user)
        try {
            const response = await axios.get(`http://localhost:5000/users/companyID/${tempuser.CompanyID}`);
            console.log(response);
            setUserList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    
    useEffect(()=>{
        getUsersList();
    }, [])
    const saveUser = async () =>{
        var user = localStorage.getItem('user-info');
        var tempuser = JSON.parse(user)
        console.log(tempuser)
        var req = {
            "Name":getValues("Name"),
            "Email":getValues("Email"),
            "Mobile":getValues("Mobile"),
            "dob":getValues("dob"),
            "Singin":"No",
            "Gender":getValues("Gender"),
            "status":2,
            "password":getValues("Name")+123,
            "CompanyID":tempuser.CompanyID
        }
        if(!editID){  
            
           
            try {
                const response = await axios.post('http://localhost:5000/users', req);
                if(response.data.insertId){
                    getUsersList();
                    addUser(false);
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }else{
            req.status = getValues("status")
            req.Singin = getValues('Singin');
            delete req.password;
            try {
                const response = await axios.put(`http://localhost:5000/users/${editID}`, req);
                if(response.data.changedRows){
                    getUsersList();
                    addUser(false);
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }
        
    }
    const DeleteUser = async (deleteid) => {
        try {
            const response = await axios.delete(`http://localhost:5000/users/${deleteid}`);
            if(response.data.affectedRows){
                getUsersList();
                addUser(false);
                reset();
            }
          } catch (error) {
            console.error(error);
          }
    }
    const onloadDetails = (data) => {
        setValue('Name', data.Name)
        setValue('Email', data.Email)
        setValue('Mobile', data.Mobile)
        setValue('Gender', data.Gender)
        setValue('dob', data.dob)
        setValue('Singin', data.Singin)
        

        setValue('status', data.status)
    }
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">User</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Form</li>
                </ol>
            </nav>

            
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Mobile</th>
                        <th>Gender</th>
                        <th>Sing in</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((item, i)=>{
                        return (
                            <tr key={i}>
                                <td><span>{item.Name}</span></td>
                                <td><span>{item.Email}</span> </td>
                                <td><span>{item.Mobile}</span> </td>
                                <td><span>{item.Gender}</span> </td>
                                <td><span>{item.Singin}</span> </td>
                                <td><span> {item.status === 1 ?  "Active" : "Inactive"}</span></td>
                                <td>
                                    
                                    <><button className="btn btn-primary" style={{marginRight:"15px"}} onClick={()=>{addUser(true); setEdited(item.UserID); onloadDetails(item)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                  </svg> </button>
                                    <button className="btn btn-danger" onClick={()=>{DeleteUser(item.UserID)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg></button></>
                                </td>
                            </tr>
                        )
                    })}
                    {user ?
                    <tr>
                        <td>
                            <input type="text" className="form-control" {...register("Name")}   placeholder="Name"/>
                        </td>
                        <td>
                            <input type="text" className="form-control" {...register("Email")}   placeholder="Email"/>
                        </td>
                        <td>
                            <input type="text" className="form-control" {...register("Mobile")} placeholder="Mobile" />
                        </td>
                        <td>
                            <select className="form-control" {...register("Gender")} >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </td>
                        <td>
                            <input type="date" className="form-control" {...register("dob")} placeholder="dob" />
                        </td>

                        {editID !== "" ? 
                        <td>
                            <select className="form-control"  {...register("status")}  >
                                <option value="">Select Status</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                            </select>

                            <select className="form-control"  {...register("Singin")}  >
                                <option value="">Select Status</option>
                                <option value="yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </td> : "" }
                        <td>
                            <button className="btn btn-primary" onClick={()=>saveUser()}>Save</button> &nbsp;
                            <button className="btn btn-primary" onClick={()=>addUser(false)}>Cancel</button>
                        </td>
                    </tr>
                    :
                    <tr>
                        <td colSpan={5}><button className="btn btn-primary" onClick={()=>{addUser(true); setEdited("");}}>Add</button></td>
                    </tr>}

                </tbody>
            </table>
          
        </>
    )
}
export default Users;