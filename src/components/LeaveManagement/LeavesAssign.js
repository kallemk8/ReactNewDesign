import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const LeavesAssign = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [leaveTypeList, setLeaveTypeList] = useState([]);
    const [leaveassignList, setleaveassignList] = useState([]);
    const [usersList, setusersList] = useState([]);
    const [show, setShow] = useState(false);
    const [editID, setEdited] = useState();
    const getLeaveTypeList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leavetype');
            setLeaveTypeList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    const getleaveassignList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leaveassign');
            setleaveassignList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    const getUserList = async () => {
        var user = JSON.parse(localStorage.getItem('user-info'));
        try {
            const response = await axios.get(`http://localhost:5000/users/companyID/${user.CompanyID}`);
            setusersList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getleaveassignList();
        getLeaveTypeList();
        getUserList();
    }, [])
    const saveLeaveType = async () =>{
        var user = JSON.parse(localStorage.getItem('user-info'));
        
        var req = {
            "leaveType":getValues("leaveType"),
            "userID":getValues("usersList"),
            "CurrentDate":new Date(),
            "CompanyID":user.CompanyID
        }
        if(!editID){
            try {
                const response = await axios.post('http://localhost:5000/leaveassign', req);
                if(response.data.insertId){
                    getleaveassignList();
                    setShow(false)
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }else{
            try {
                const response = await axios.put(`http://localhost:5000/leaveassign/${editID}`, req);
                if(response.data.changedRows){
                    getleaveassignList();
                    setShow(false)
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }
        
    }
    const DeleteDepartment = async (deleteid) => {
        try {
            const response = await axios.delete(`http://localhost:5000/leaveassign/${deleteid}`);
            if(response.data.affectedRows){
                getLeaveTypeList();
                setShow(false)
                reset();
            }
          } catch (error) {
            console.error(error);
          }
    }
    const onloadDetails = (data) => {
        setValue('typeName', data.name)
        setValue('numberOfLeaves', data.LeaveNumber)
        setValue('applicable', data.Applicable)
        setValue('leaveReason', data.info)
    }
    const LeaveTypeEdit = (data) => {
        onloadDetails(data);
        setEdited(data.ID)
    }
    return (
        <>
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Leaves</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Leaves</li>
                            </ul>
                        </div>
                        <div className="col-auto float-end ms-auto">
                            <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_leave" ><i className="fa fa-plus"></i> Leave Type</a>
                        </div>
                    </div>
                </div>


                {/* <div className="row">
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Today Presents</h6>
                            <h4>12 / 60</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Planned Leaves</h6>
                            <h4>8 <span>Today</span></h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Unplanned Leaves</h6>
                            <h4>0 <span>Today</span></h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Pending Requests</h6>
                            <h4>12</h4>
                        </div>
                    </div>
                </div> */}


                {/* <div className="row filter-row">
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus">
                            <input type="text" className="form-control floating"/>
                                <label className="focus-label">Employee Name</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus select-focus">
                            <select className="floating form-control">
                                <option> -- Select -- </option>
                                <option>Casual Leave</option>
                                <option>Medical Leave</option>
                                <option>Loss of Pay</option>
                            </select>
                            <label className="focus-label">Leave Type</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus select-focus">
                            <select className="form-control floating">
                                <option> -- Select -- </option>
                                <option> Pending </option>
                                <option> Approved </option>
                                <option> Rejected </option>
                            </select>
                            <label className="focus-label">Leave Status</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus">
                            <div className="cal-icon">
                                <input className="form-control floating datetimepicker" type="text"/>
                            </div>
                            <label className="focus-label">From</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus">
                            <div className="cal-icon">
                                <input className="form-control floating datetimepicker" type="text"/>
                            </div>
                            <label className="focus-label">To</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <a href="#" className="btn btn-success w-100"> Search </a>
                    </div>
                </div> */}

                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table mb-0 datatable">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Company</th>
                                        <th>Leave Type</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveassignList.map((leaveType, i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>{leaveType.Name}</td>
                                                <td>{leaveType.ComapnyName}</td>
                                                <td>{leaveType.name}</td>
                                                <td className="text-end">
                                                <a  onClick={()=>LeaveTypeEdit(leaveType)} data-bs-toggle="modal" data-bs-target="#add_leave"><i className="fa fa-pencil m-r-5"></i>  Edit</a>
                                                <a  href="#" data-bs-toggle="modal" data-bs-target="#delete_approve"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div id="add_leave" className="modal custom-modal fade" role="dialog" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editID ? "Update" : "Add"} Leave Assign</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(saveLeaveType)}>
                                <div className="form-group">
                                    <label>Leave Type <span className="text-danger">*</span></label>
                                    <select className="form-control" {...register("leaveType")} multiple style={{height:"100px"}}>
                                        <option>Select Leave Type</option>
                                        {leaveTypeList.map((leaveType, i)=>{
                                            return (
                                                <option value={leaveType.ID}>{leaveType.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Select Employee <span className="text-danger">*</span></label>
                                    <select className="form-control" {...register("usersList")} >
                                        <option>Select Employee</option>
                                        {usersList.map((user, i)=>{
                                            return (
                                                <option value={user.UserID}>{user.Name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal custom-modal fade" id="approve_leave" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Leave Approve</h3>
                                <p>Are you sure want to approve for this leave?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a className="btn btn-primary continue-btn">Approve</a>
                                    </div>
                                    <div className="col-6">
                                        <a data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Decline</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal custom-modal fade" id="delete_approve" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Delete Leave</h3>
                                <p>Are you sure want to delete this leave?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a className="btn btn-primary continue-btn">Delete</a>
                                    </div>
                                    <div className="col-6">
                                        <a  data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeavesAssign;