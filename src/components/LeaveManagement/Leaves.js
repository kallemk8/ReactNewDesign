import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const LeaveType = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [leaveTypeList, setLeaveTypeList] = useState([]);
    const [show, setShow] = useState(false);
    const [editID, setEdited] = useState();
    const getLeaveTypeList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leavetype');
            console.log(response);
            setLeaveTypeList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getLeaveTypeList();
    }, [])
    const saveLeaveType = async () =>{
        var user = JSON.parse(localStorage.getItem('user-info'));
        
        var req = {
            "name":getValues("typeName"),
            "LeaveNumber":getValues("numberOfLeaves"),
            "Applicable":getValues("applicable"),
            "info":getValues("leaveReason"),
            "CompanyID":user.CompanyID
        }
        if(!editID){
            try {
                const response = await axios.post('http://localhost:5000/leavetype', req);
                if(response.data.insertId){
                    getLeaveTypeList();
                    setShow(false)
                    reset();
                }
              } catch (error) {
                console.error(error);
              }
        }else{
            try {
                const response = await axios.put(`http://localhost:5000/leavetype/${editID}`, req);
                if(response.data.changedRows){
                    getLeaveTypeList();
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
            const response = await axios.delete(`http://localhost:5000/leavetype/${deleteid}`);
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
            <div class="content container-fluid">
                <div class="page-header">
                    <div class="row align-items-center">
                        <div class="col">
                            <h3 class="page-title">Leaves</h3>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li class="breadcrumb-item active">Leaves</li>
                            </ul>
                        </div>
                        <div class="col-auto float-end ms-auto">
                            <a href="#" class="btn add-btn" onClick={()=>setShow(true)}><i class="fa fa-plus"></i> Leave Type</a>
                        </div>
                    </div>
                </div>


                {/* <div class="row">
                    <div class="col-md-3">
                        <div class="stats-info">
                            <h6>Today Presents</h6>
                            <h4>12 / 60</h4>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-info">
                            <h6>Planned Leaves</h6>
                            <h4>8 <span>Today</span></h4>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-info">
                            <h6>Unplanned Leaves</h6>
                            <h4>0 <span>Today</span></h4>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-info">
                            <h6>Pending Requests</h6>
                            <h4>12</h4>
                        </div>
                    </div>
                </div> */}


                {/* <div class="row filter-row">
                    <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div class="form-group form-focus">
                            <input type="text" class="form-control floating"/>
                                <label class="focus-label">Employee Name</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div class="form-group form-focus select-focus">
                            <select class="floating form-control">
                                <option> -- Select -- </option>
                                <option>Casual Leave</option>
                                <option>Medical Leave</option>
                                <option>Loss of Pay</option>
                            </select>
                            <label class="focus-label">Leave Type</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div class="form-group form-focus select-focus">
                            <select class="form-control floating">
                                <option> -- Select -- </option>
                                <option> Pending </option>
                                <option> Approved </option>
                                <option> Rejected </option>
                            </select>
                            <label class="focus-label">Leave Status</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div class="form-group form-focus">
                            <div class="cal-icon">
                                <input class="form-control floating datetimepicker" type="text"/>
                            </div>
                            <label class="focus-label">From</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div class="form-group form-focus">
                            <div class="cal-icon">
                                <input class="form-control floating datetimepicker" type="text"/>
                            </div>
                            <label class="focus-label">To</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <a href="#" class="btn btn-success w-100"> Search </a>
                    </div>
                </div> */}

                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-striped custom-table mb-0 datatable">
                                <thead>
                                    <tr>
                                        <th>Leave Type</th>
                                        
                                        <th>Company</th>
                                        <th>Applicable</th>
                                        <th>No of Leaves</th>
                                        <th>Info</th>
                                        <th class="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveTypeList.map((leaveType, i)=>{
                                        return (
                                            <tr>
                                                <td>{leaveType.name}</td>
                                                <td>{leaveType.ComapnyName}</td>
                                                <td>{leaveType.Applicable}</td>
                                                <td>{leaveType.LeaveNumber}</td>
                                                <td>{leaveType.info}</td>
                                                <td class="text-end">
                                                <a  onClick={()=>LeaveTypeEdit(leaveType)} data-bs-toggle="modal" data-bs-target="#add_leave"><i class="fa fa-pencil m-r-5"></i>  Edit</a>
                                                <a  href="#" ><i class="fa fa-trash-o m-r-5"></i> Delete</a>
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

            <div id="add_leave" class={show ? "modal custom-modal fade show" : "modal custom-modal fade"} role="dialog" style={{display:show ? "block" : "none"}}>
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{editID ? "Update" : "Add"} Leave Type</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(saveLeaveType)}>
                                <div class="form-group">
                                    <label>Type Name <span class="text-danger">*</span></label>
                                    <input class="form-control" type="text" {...register("typeName")} />
                                </div>
                                <div class="form-group">
                                    <label>Number of Leaves <span class="text-danger">*</span></label>
                                    <input class="form-control" type="text" {...register("numberOfLeaves")} />
                                </div>
                                <div class="form-group">
                                    <label>Applicable<span class="text-danger">*</span></label>
                                    <input class="form-control" type="text" {...register("applicable")} />
                                </div>
                                <div class="form-group">
                                    <label>Description<span class="text-danger">*</span></label>
                                    <textarea rows="4" class="form-control" {...register("leaveReason")} ></textarea>
                                </div>
                                <div class="submit-section">
                                    <button class="btn btn-primary submit-btn" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal custom-modal fade" id="approve_leave" role="dialog">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="form-header">
                                <h3>Leave Approve</h3>
                                <p>Are you sure want to approve for this leave?</p>
                            </div>
                            <div class="modal-btn delete-action">
                                <div class="row">
                                    <div class="col-6">
                                        <a class="btn btn-primary continue-btn">Approve</a>
                                    </div>
                                    <div class="col-6">
                                        <a data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Decline</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal custom-modal fade" id="delete_approve" role="dialog">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="form-header">
                                <h3>Delete Leave</h3>
                                <p>Are you sure want to delete this leave?</p>
                            </div>
                            <div class="modal-btn delete-action">
                                <div class="row">
                                    <div class="col-6">
                                        <a class="btn btn-primary continue-btn">Delete</a>
                                    </div>
                                    <div class="col-6">
                                        <a  data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Cancel</a>
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

export default LeaveType;