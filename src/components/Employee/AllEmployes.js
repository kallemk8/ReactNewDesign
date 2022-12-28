import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import AddEmployee from "./addEmployee";
const AllEmployees = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [leaveTypeList, setLeaveTypeList] = useState([]);
    const [show, setShow] = useState(false);
    const [editID, setEdited] = useState();
    const handleClose = () => {setShow(false); reset();};
    const getLeaveTypeList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leavetype');
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
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Employees</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Employees</li>
                            </ul>
                        </div>
                        <div className="col-auto float-end ms-auto">
                            <a href="#" className="btn add-btn" onClick={()=>{setShow(true); setEdited("")}}><i className="fa fa-plus"></i> Add Employee</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table mb-0 datatable">
                                <thead>
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Company</th>
                                        <th>Applicable</th>
                                        <th>No of Leaves</th>
                                        <th>Info</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveTypeList.map((leaveType, i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>{leaveType.name}</td>
                                                <td>{leaveType.ComapnyName}</td>
                                                <td>{leaveType.Applicable}</td>
                                                <td>{leaveType.LeaveNumber}</td>
                                                <td>{leaveType.info}</td>
                                                <td className="text-end">
                                                <a  onClick={()=>{LeaveTypeEdit(leaveType); setShow(true)}} ><i className="fa fa-pencil m-r-5"></i>  Edit</a>
                                                <a onClick={()=>{DeleteDepartment(leaveType.ID);}} ><i className="fa fa-trash-o m-r-5"></i> Delete</a>
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

            <Modal show={show} onHide={handleClose} size="lg">
                <div className="modal-header">
                    <h5 className="modal-title">{editID ? "Update" : "Add"} Employee</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handleClose()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <AddEmployee />
                </div>
            </Modal>
        </>
    )
}

export default AllEmployees;