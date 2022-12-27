import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import moment from "moment/moment";
const LeavesList = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [leaveList, setLeaveList] = useState([]);
    const [leaveTypeList, setLeaveTypeList] = useState([]);
    const [show, setShow] = useState(false);
    const [showEnd, setshowEnd] = useState(true);
    const [editID, setEdited] = useState();
    const getLeaveTypeList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leavetype');
            setLeaveTypeList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    const getLeaveList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leaves');
            setLeaveList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getLeaveList();
        getLeaveTypeList();
    }, [])
    const selectedDayType = (data) => {
        if(data===1){
            setshowEnd(true);
        }else{
            setshowEnd(false)
        }
    }
    const checknumberOfdays = (start, end) => {
        if(start && end){
            var startDate = moment(start, 'YYYY-MM-DD'); // $('[name="date-start"]').val() === "13.04.2016"
            var endDate   = moment(end, 'YYYY-MM-DD'); // $('[name="date-end"]').val() === "28.04.2016"
            var diff = endDate.diff(startDate, "days");
            setValue('days', diff+1);
        }
    }
    const saveLeaveType = async () =>{
        var user = JSON.parse(localStorage.getItem('user-info'));
        var isHaldDay = 0;
        var halfDaysection = "";
        if(getValues('halfDay')){
            isHaldDay = 1
            halfDaysection = getValues('halfDaysection');
        }else{
            isHaldDay = 0;
        }
        var req = {
            "leaveType":getValues("leaveType"),
            "startDate":getValues("startDate"),
            "endDate":getValues("endDate"),
            "numberOfLeaves":getValues('days'),
            "userID":user.UserID,
            "Reason":getValues("reason"),
            "ComapnyID":user.CompanyID,
            "status":1,
            "halfDay":isHaldDay,
            "halfDaysection":halfDaysection
        }
        console.log(req)
        // if(!editID){
        //     try {
        //         const response = await axios.post('http://localhost:5000/leaves', req);
        //         if(response.data.insertId){
        //             getLeaveList();
        //             setShow(false)
        //             reset();
        //         }
        //       } catch (error) {
        //         console.error(error);
        //       }
        // }else{
        //     try {
        //         const response = await axios.put(`http://localhost:5000/leaves/${editID}`, req);
        //         if(response.data.changedRows){
        //             getLeaveList();
        //             setShow(false)
        //             reset();
        //         }
        //       } catch (error) {
        //         console.error(error);
        //       }
        // }
        
    }
    const DeleteDepartment = async (deleteid) => {
        try {
            const response = await axios.delete(`http://localhost:5000/leaves/${deleteid}`);
            if(response.data.affectedRows){
                getLeaveList();
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
                                <li className="breadcrumb-item active">Leaves List</li>
                            </ul>
                        </div>
                        <div className="col-auto float-end ms-auto">
                            <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_leave" onClick={()=>setShow(true)}><i className="fa fa-plus"></i> Apply Leave </a>
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
                                        <th>Name</th>
                                        
                                        <th>Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Days</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveList.map((leave, i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>{leave.EmpName}</td>
                                                <td>{leave.name}</td>
                                                <td>{moment(leave.startDate).format('DD-MM-YYYY')}</td>
                                                <td>{moment(leave.endDate).format('DD-MM-YYYY')}</td>
                                                <td>{leave.numberOfLeaves}</td>
                                                <td>{leave.status == 1 ?  "Pending": leave.status == 2 ? "Approve" : leave.status == 3 ? "Cancel": "Reject"}</td>
                                                <td className="text-end">
                                                <a  onClick={()=>LeaveTypeEdit(leave)} data-bs-toggle="modal" data-bs-target="#add_leave"><i className="fa fa-pencil m-r-5"></i>  Edit</a>
                                                <a  href="#" ><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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

            <div id="add_leave"  className="modal custom-modal fade" role="dialog" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editID ? "Update" : "Add"} Leave Type</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(saveLeaveType)}>
                                <div className="form-group">
                                    <label>Leave Type <span className="text-danger">*</span></label>
                                    <select className="form-control" {...register("leaveType")} >
                                        <option>Select Leave Type</option>
                                        {leaveTypeList.map((leaveType, i)=>{
                                            return (
                                                <option key={i} value={leaveType.ID}>{leaveType.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-inline">
                                        <input type="radio" name="leaveTypeDay" id="gender_male" {...register("fullDay")}  className="form-check-input" onChange={()=>selectedDayType(1)}/>
                                        <label htmlFor="gender_male" className="form-check-label"> Full Day </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input type="radio" name="leaveTypeDay" id="gender_female" {...register("halfDay")} className="form-check-input" onChange={()=>selectedDayType(2)}/>
                                        <label htmlFor="gender_female" className="form-check-label"> Half Day </label>
                                    </div>
                                </div>
                               
                                <div className="form-group">
                                    <label>Start Date <span className="text-danger">*</span></label>
                                    <input className="form-control" type="date" {...register("startDate")} onChange={(e)=>checknumberOfdays(e.target.value, getValues("endDate") )} />
                                </div>
                                {showEnd ? 
                                <>
                                    <div className="form-group">
                                        <label>End Date <span className="text-danger">*</span></label>
                                        <input className="form-control" type="date" {...register("endDate")} onChange={(e)=>checknumberOfdays(getValues("startDate") ,e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Days<span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" readOnly {...register("days")} />
                                    </div>
                                </>
                                
                                : <div className="form-group">
                                    <label>Select Half Day<span className="text-danger">*</span></label>
                                    <select className="form-control" {...register("halfDaysection")} >
                                        <option value="0">Select Half Day</option>
                                        <option value="1">First Half Day</option>
                                        <option value="2">Second Half Day</option>
                                    </select>
                                </div>}
                                
                                <div className="form-group">
                                    <label>Reason<span className="text-danger">*</span></label>
                                    <textarea rows="4" className="form-control" {...register("reason")} ></textarea>
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

export default LeavesList;