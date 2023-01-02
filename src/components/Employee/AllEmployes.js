import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import AddEmployee from "./addEmployee";
import moment from "moment/moment";
const AllEmployees = () => {
    const [employeesList, setemployeesList] = useState([]);
    const [onloadData, setonloadData] = useState({});
    const [show, setShow] = useState(false);
    const [editID, setEdited] = useState();
    const [EmployeeView, setEmployeeView] = useState("List");
    const handleClose = () => {setShow(false); setEdited("")};
    const getEmployeesList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employee');
            setemployeesList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getEmployeesList();
    }, [])
    const saveLeaveType = async (data) =>{
        var user = JSON.parse(localStorage.getItem('user-info'));
       var req = {
            "Name":data.firstName,
            "lastname":data.lastName,
            "Mobile":data.phone,
            "Email":data.email,
            "Password":data.password,
            "CompanyID":user.CompanyID,
            "Singin":false,
            "status":2,
            "EmpID":data.employeeID,
            "DateOfJoining":data.joiningDate,
            "Department":data.department,
            "Designation":data.designation,
            "username":data.username
        }
        if(!editID){
            try {
                const response = await axios.post('http://localhost:5000/employee', req);
                if(response.data.insertId){
                    getEmployeesList();
                    setShow(false)
                }
              } catch (error) {
                console.error(error);
              }
        }else{
            try {
                const response = await axios.put(`http://localhost:5000/employee/${editID}`, req);
                if(response.data.changedRows){
                    getEmployeesList();
                    setShow(false)
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
                getEmployeesList();
                setShow(false)
            }
          } catch (error) {
            console.error(error);
          }
    }
    const LeaveTypeEdit = (data) => {
        setonloadData(data);
        setEdited(data.ID)
    }
    const changeEmployeeView = (data) => {
        setEmployeeView(data);
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
                            <div className="view-icons">
                                <div className="grid-view btn btn-link" onClick={()=>changeEmployeeView("Gird")}><i className="fa fa-th"></i></div>
                                <div className="list-view btn btn-link active" onClick={()=>changeEmployeeView("List")}><i className="fa fa-bars"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                {EmployeeView == "List" ? 
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table mb-0 datatable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Employee ID</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Join Date</th>
                                        <th>Role</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeesList.map((employee, i)=>{
                                        return (
                                            <tr key={i}>
                                                <td><Link to={`/ViewEployee/${employee.ID}`} >{employee.Name}</Link></td>
                                                <td>{employee.EmpID}</td>
                                                <td>{employee.Email}</td>
                                                <td>{employee.Mobile}</td>
                                                <td>{moment(employee.DateOfJoining).format("d MMM YYYY")}</td>
                                                <td>{employee.Depart_name}</td>
                                                <td className="text-end">
                                                <a  onClick={()=>{LeaveTypeEdit(employee); setShow(true)}} ><i className="fa fa-pencil m-r-5"></i>  Edit</a>
                                                <a onClick={()=>{DeleteDepartment(employee.ID);}} ><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : 
                <div className="row staff-grid-row">
                    {employeesList.map((employee, i)=>{
                        return (
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img">
                                <a  href="#" className="avatar"><img src="https://i.pravatar.cc/300" alt="" /></a>
                            </div>
                            <div className="dropdown profile-action">
                                <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={()=>{LeaveTypeEdit(employee); setShow(true)}} ><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                    <a className="dropdown-item" onClick={()=>{DeleteDepartment(employee.ID);}} ><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                </div>
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><a href="#">{employee.Name}</a></h4>
                            <div className="small text-muted">{employee.Depart_name}</div>
                        </div>
                    </div>
                     )
                    })}
                </div>
                }
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <div className="modal-header">
                    <h5 className="modal-title">{editID ? "Update" : "Add"} Employee</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>handleClose()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <AddEmployee saveLeaveType={(data)=>saveLeaveType(data)} isEdited={editID} onloadDetails={onloadData} />
                </div>
            </Modal>
        </>
    )
}

export default AllEmployees;