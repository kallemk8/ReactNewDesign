import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import AddEmployee from "./addEmployee";
import moment from "moment/moment";
import EditProfileInfo from "./editProfileInfo";
import EditProfileNation from "./editProfileNation";
import EditProfileContact from "./editProfileContact";
import EditProfileBank from "./editProfileBank";
import EditProfileFamily from "./editProfileFamily";
const ViewEployee = () => {
    const [onloadData, setonloadData] = useState({});
    const [show, setShow] = useState(false);
    const [showPersonal, setShowPersonal] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showBank, setShowBank] = useState(false);
    const [showFamily, setShowFamily] = useState(false);
    const handleClose = () => { setShow(false);};
    const handleClosePersonal = () => { setShowPersonal(false);};
    const handleCloseContact = () => { setShowContact(false);};
    const handleCloseBank = () => { setShowBank(false);};
    const handleCloseFamily = () => { setShowFamily(false);};
    const { id } = useParams();
    const getEmployeesList = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${id}`);
            setonloadData(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getEmployeesList();
    }, [])
    const saveProfileFamily = async (data) => {
        console.log(data)

        var req = {
            "family":data,
        }
        console.log(req)
        try {
            const response = await axios.post(`http://localhost:5000/employee/updateProfileFamily/${id}`, req);
            if (response.data.affectedRows) {
                //getEmployeesList();
                setShowFamily(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const saveProfileBank = async (data) => {
        var req = {
            "UserID":onloadData.UserID,
            "Bankname": data.Bankname,
            "BankaccountNo":data.BankaccountNo,
            "IFSCCode": data.IFSCCode,
            "PANNo":data.PANNo,
        }
        console.log(req)
        try {
            const response = await axios.put(`http://localhost:5000/employee/updateProfileBank/${id}`, req);
            if (response.data.affectedRows) {
                getEmployeesList();
                setShowBank(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const saveProfileContact = async (data) => {
        var req = {
            "UserID":onloadData.UserID,
            "PrimaryName": data.PrimaryName,
            "PrimaryRelationship":data.PrimaryRelationship,
            "PrimaryPhone": data.PrimaryPhone,
            "SecondaryName":data.SecondaryName,
            "SecondaryRelationship":data.SecondaryRelationship,
            "SecondaryPhone":data.SecondaryPhone,
        }
        console.log(req)
        try {
            const response = await axios.put(`http://localhost:5000/employee/updateProfileContact/${id}`, req);
            if (response.data.affectedRows) {
                getEmployeesList();
                setShowContact(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const saveProfileNation1 = async (data) => {
        var req = {
            "UserID":onloadData.UserID,
            "Passport": data.PassportNo,
            "Nationality":data.Nationality,
            "Religion": data.Religion,
            "MaritalStatus":data.MaritalStatus,
            "spouse":data.spouse,
            "children":data.children,
        }
        console.log(req)
        try {
            const response = await axios.put(`http://localhost:5000/employee/updateProfileNation/${id}`, req);
            if (response.data.affectedRows) {
                getEmployeesList();
                setShowPersonal(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const saveLeaveType = async (data) => {
        var req = {
            "UserID":onloadData.UserID,
            "Name": data.firstName,
            "lastname":data.lastName,
            "Mobile": data.phone,
            "Gender":data.gender,
            "dob":data.dob,
            "Address":data.address,
            "Reporting": data.department,
            "Department": data.department,
            "Designation": data.designation,
            "state": data.state,
            "country": data.country,
            "pincode": data.pincode,
            
        }
        if(data.profileImage){
            req.profileImage = data.profileImage;
        }
    
        try {
            const response = await axios.put(`http://localhost:5000/employee/updateProfileInfo/${id}`, req);
            if (response.data.affectedRows) {
                getEmployeesList();
                setShow(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const DeleteDepartment = async (deleteid) => {
        try {
            const response = await axios.delete(`http://localhost:5000/leavetype/${deleteid}`);
            if (response.data.affectedRows) {
                getEmployeesList();
                setShow(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const LeaveTypeEdit = (data) => {
        setonloadData(data);
    }
    return (
        <>
            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Employee Profile</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card mb-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="profile-view">
                                    <div className="profile-img-wrap">
                                        <div className="profile-img">
                                            <a href="#"><img alt="" src={onloadData.profileImage ? "http://localhost:5000/"+onloadData.profileImage : ""} /></a>
                                        </div>
                                    </div>
                                    <div className="profile-basic">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="profile-info-left">
                                                    <h3 className="user-name m-t-0 mb-0">{onloadData.Name} {onloadData.lastname}</h3>
                                                    <h6 className="text-muted">{onloadData.Designation_name}</h6>
                                                    <small className="text-muted">{onloadData.Depart_name}</small>
                                                    <div className="staff-id">Employee ID : {onloadData.EmpID}</div>
                                                    <div className="small doj text-muted">Date of Join : {moment(onloadData.DateOfJoining).format("d MMM YYYY")}</div>
                                                    <div className="staff-msg"><a className="btn btn-custom"
                                                        href="chat.html">Send Message</a></div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <ul className="personal-info">
                                                    <li>
                                                        <div className="title">Phone:</div>
                                                        <div className="text"><a href="">{onloadData.Mobile}</a></div>
                                                    </li>
                                                    <li>
                                                        <div className="title">Email:</div>
                                                        <div className="text">{onloadData.Email}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="title">Birthday:</div>
                                                        <div className="text">{moment(onloadData.dob).format("Do MMM")}</div>
                                                    </li>
                                                    <li>
                                                        <div className="title">Address:</div>
                                                        <div className="text">{onloadData.Address + " " + onloadData.state + " " + onloadData.country + " " + onloadData.pincode } </div>
                                                    </li>
                                                    <li>
                                                        <div className="title">Gender:</div>
                                                        <div className="text">{onloadData.Gender == 1 ? "Male" : "Female"}</div>
                                                    </li>
                                                    <li>
                                                        <div className="title">Reports to:</div>
                                                        <div className="text">
                                                            <div className="avatar-box">
                                                                <div className="avatar avatar-xs">
                                                                    <img src="assets/img/profiles/avatar-16.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <a href="profile.html">
                                                                Jeffery Lalor
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pro-edit"><a onClick={()=>{setShow(true)}} ><i className="la la-pencil"></i></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card tab-box">
                    <div className="row user-tabs">
                        <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                            <ul className="nav nav-tabs nav-tabs-bottom">
                                <li className="nav-item"><a href="#emp_profile" data-bs-toggle="tab"
                                    className="nav-link active">Profile</a></li>
                                <li className="nav-item"><a href="#emp_projects" data-bs-toggle="tab"
                                    className="nav-link">Projects</a></li>
                                <li className="nav-item"><a href="#bank_statutory" data-bs-toggle="tab"
                                    className="nav-link">Bank & Statutory <small className="text-danger">(Admin
                                        Only)</small></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tab-content">

                    <div id="emp_profile" className="pro-overview tab-pane fade show active">
                        <div className="row">
                            <div className="col-md-6 d-flex">
                                <div className="card profile-box flex-fill">
                                    <div className="card-body">
                                        <h3 className="card-title">Personal Informations <a href="#" onClick={()=>setShowPersonal(true)} className="edit-icon" ><i  className="la la-pencil"></i></a></h3>
                                        <ul className="personal-info">
                                            <li>
                                                <div className="title">Passport No.</div>
                                                <div className="text">{onloadData.Passport}</div>
                                            </li>
                                            <li>
                                                <div className="title">Passport Exp Date.</div>
                                                <div className="text">{onloadData.Passport}</div>
                                            </li>
                                            <li>
                                                <div className="title">Tel</div>
                                                <div className="text"><a href="">{onloadData.Passport}</a></div>
                                            </li>
                                            <li>
                                                <div className="title">Nationality</div>
                                                <div className="text">{onloadData.Nationality}</div>
                                            </li>
                                            <li>
                                                <div className="title">Religion</div>
                                                <div className="text">{onloadData.Religion}</div>
                                            </li>
                                            <li>
                                                <div className="title">Marital status</div>
                                                <div className="text">{onloadData.MaritalStatus == "1" ? "Single" : "Married"}</div>
                                            </li>
                                            <li>
                                                <div className="title">Employment of spouse</div>
                                                <div className="text">{onloadData.spouse}</div>
                                            </li>
                                            <li>
                                                <div className="title">No. of children</div>
                                                <div className="text">{onloadData.children}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex">
                                <div className="card profile-box flex-fill">
                                    <div className="card-body">
                                        <h3 className="card-title">Emergency Contact <a href="#" className="edit-icon" onClick={()=>setShowContact(true)}><i className="la la-pencil"></i></a></h3>
                                        <h5 className="section-title">Primary</h5>
                                        <ul className="personal-info">
                                            <li>
                                                <div className="title">Name</div>
                                                <div className="text">{onloadData.PrimaryName}</div>
                                            </li>
                                            <li>
                                                <div className="title">Relationship</div>
                                                <div className="text">{onloadData.PrimaryRelationship}</div>
                                            </li>
                                            <li>
                                                <div className="title">Phone </div>
                                                <div className="text">{onloadData.PrimaryPhone}</div>
                                            </li>
                                        </ul>
                                        <hr />
                                        <h5 className="section-title">Secondary</h5>
                                        <ul className="personal-info">
                                            <li>
                                                <div className="title">Name</div>
                                                <div className="text">{onloadData.SecondaryName}</div>
                                            </li>
                                            <li>
                                                <div className="title">Relationship</div>
                                                <div className="text">{onloadData.SecondaryRelationship}</div>
                                            </li>
                                            <li>
                                                <div className="title">Phone </div>
                                                <div className="text">{onloadData.SecondaryPhone}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 d-flex">
                                <div className="card profile-box flex-fill">
                                    <div className="card-body">
                                        <h3 className="card-title">Bank information <a href="#" className="edit-icon" onClick={()=>setShowBank(true)}><i className="la la-pencil"></i></a></h3>
                                        <ul className="personal-info">
                                            <li>
                                                <div className="title">Bank name</div>
                                                <div className="text">{onloadData.Bankname}</div>
                                            </li>
                                            <li>
                                                <div className="title">Bank account No.</div>
                                                <div className="text">{onloadData.BankaccountNo}</div>
                                            </li>
                                            <li>
                                                <div className="title">IFSC Code</div>
                                                <div className="text">{onloadData.IFSCCode}</div>
                                            </li>
                                            <li>
                                                <div className="title">PAN No</div>
                                                <div className="text">{onloadData.PANNo}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex">
                                <div className="card profile-box flex-fill">
                                    <div className="card-body">
                                        <h3 className="card-title">Family Informations <a href="#" className="edit-icon" onClick={()=>setShowFamily(true)} ><i
                                                className="fa fa-pencil"></i></a></h3>
                                        <div className="table-responsive">
                                            <table className="table table-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Relationship</th>
                                                        <th>Date of Birth</th>
                                                        <th>Phone</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Leo</td>
                                                        <td>Brother</td>
                                                        <td>Feb 16th, 2019</td>
                                                        <td>9876543210</td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a aria-expanded="false" data-bs-toggle="dropdown"
                                                                    className="action-icon dropdown-toggle" href="#"><i
                                                                        className="material-icons">more_vert</i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a href="#" className="dropdown-item"><i
                                                                        className="fa fa-pencil m-r-5"></i> Edit</a>
                                                                    <a href="#" className="dropdown-item"><i
                                                                        className="fa fa-trash-o m-r-5"></i> Delete</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 d-flex">
                                <div className="card profile-box flex-fill">
                                    <div className="card-body">
                                        <h3 className="card-title">Education Informations <a href="#" className="edit-icon"
                                            data-bs-toggle="modal" data-bs-target="#education_info"><i
                                                className="fa fa-pencil"></i></a></h3>
                                        <div className="experience-box">
                                            <ul className="experience-list">
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle"></div>
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <a href="#/" className="name">International College of Arts and
                                                                Science (UG)</a>
                                                            <div>Bsc Computer Science</div>
                                                            <span className="time">2000 - 2003</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle"></div>
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <a href="#/" className="name">International College of Arts and
                                                                Science (PG)</a>
                                                            <div>Msc Computer Science</div>
                                                            <span className="time">2000 - 2003</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex">
                                <div className="card profile-box flex-fill">
                                    <div className="card-body">
                                        <h3 className="card-title">Experience <a href="#" className="edit-icon"
                                            data-bs-toggle="modal" data-bs-target="#experience_info"><i
                                                className="fa fa-pencil"></i></a></h3>
                                        <div className="experience-box">
                                            <ul className="experience-list">
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle"></div>
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <a href="#/" className="name">Web Designer at Zen
                                                                Corporation</a>
                                                            <span className="time">Jan 2013 - Present (5 years 2
                                                                months)</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle"></div>
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <a href="#/" className="name">Web Designer at Ron-tech</a>
                                                            <span className="time">Jan 2013 - Present (5 years 2
                                                                months)</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle"></div>
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <a href="#/" className="name">Web Designer at Dalt
                                                                Technology</a>
                                                            <span className="time">Jan 2013 - Present (5 years 2
                                                                months)</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="tab-pane fade" id="emp_projects">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown profile-action">
                                            <a aria-expanded="false" data-bs-toggle="dropdown"
                                                className="action-icon dropdown-toggle" href="#"><i
                                                    className="material-icons">more_vert</i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                                <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                            </div>
                                        </div>
                                        <h4 className="project-title"><a href="project-view.html">Office Management</a></h4>
                                        <small className="block text-ellipsis m-b-15">
                                            <span className="text-xs">1</span> <span className="text-muted">open tasks, </span>
                                            <span className="text-xs">9</span> <span className="text-muted">tasks
                                                completed</span>
                                        </small>
                                        <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. When an unknown printer took a galley of type and
                                            scrambled it...
                                        </p>
                                        <div className="pro-deadline m-b-15">
                                            <div className="sub-title">
                                                Deadline:
                                            </div>
                                            <div className="text-muted">
                                                17 Apr 2019
                                            </div>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Project Leader :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img
                                                        alt="" src="assets/img/profiles/avatar-16.jpg" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Team :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt=""
                                                        src="assets/img/profiles/avatar-02.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img
                                                        alt="" src="assets/img/profiles/avatar-09.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt=""
                                                        src="assets/img/profiles/avatar-10.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img
                                                        alt="" src="assets/img/profiles/avatar-05.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" className="all-users">+15</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                                        <div className="progress progress-xs mb-0">
                                            <div title="" data-bs-toggle="tooltip" role="progressbar"
                                                className="progress-bar bg-success" data-original-title="40%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown profile-action">
                                            <a aria-expanded="false" data-bs-toggle="dropdown"
                                                className="action-icon dropdown-toggle" href="#"><i
                                                    className="material-icons">more_vert</i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                                <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                            </div>
                                        </div>
                                        <h4 className="project-title"><a href="project-view.html">Project Management</a>
                                        </h4>
                                        <small className="block text-ellipsis m-b-15">
                                            <span className="text-xs">2</span> <span className="text-muted">open tasks, </span>
                                            <span className="text-xs">5</span> <span className="text-muted">tasks
                                                completed</span>
                                        </small>
                                        <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. When an unknown printer took a galley of type and
                                            scrambled it...
                                        </p>
                                        <div className="pro-deadline m-b-15">
                                            <div className="sub-title">
                                                Deadline:
                                            </div>
                                            <div className="text-muted">
                                                17 Apr 2019
                                            </div>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Project Leader :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img
                                                        alt="" src="assets/img/profiles/avatar-16.jpg" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Team :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt=""
                                                        src="assets/img/profiles/avatar-02.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img
                                                        alt="" src="assets/img/profiles/avatar-09.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt=""
                                                        src="assets/img/profiles/avatar-10.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img
                                                        alt="" src="assets/img/profiles/avatar-05.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" className="all-users">+15</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                                        <div className="progress progress-xs mb-0">
                                            <div  title="" data-bs-toggle="tooltip" role="progressbar"
                                                className="progress-bar bg-success" data-original-title="40%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown profile-action">
                                            <a aria-expanded="false" data-bs-toggle="dropdown"
                                                className="action-icon dropdown-toggle" href="#"><i
                                                    className="material-icons">more_vert</i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                                <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                            </div>
                                        </div>
                                        <h4 className="project-title"><a href="project-view.html">Video Calling App</a></h4>
                                        <small className="block text-ellipsis m-b-15">
                                            <span className="text-xs">3</span> <span className="text-muted">open tasks, </span>
                                            <span className="text-xs">3</span> <span className="text-muted">tasks
                                                completed</span>
                                        </small>
                                        <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. When an unknown printer took a galley of type and
                                            scrambled it...
                                        </p>
                                        <div className="pro-deadline m-b-15">
                                            <div className="sub-title">
                                                Deadline:
                                            </div>
                                            <div className="text-muted">
                                                17 Apr 2019
                                            </div>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Project Leader :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img
                                                        alt="" src="assets/img/profiles/avatar-16.jpg" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Team :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt=""
                                                        src="assets/img/profiles/avatar-02.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img
                                                        alt="" src="assets/img/profiles/avatar-09.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt=""
                                                        src="assets/img/profiles/avatar-10.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img
                                                        alt="" src="assets/img/profiles/avatar-05.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" className="all-users">+15</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                                        <div className="progress progress-xs mb-0">
                                            <div  title="" data-bs-toggle="tooltip" role="progressbar"
                                                className="progress-bar bg-success" data-original-title="40%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dropdown profile-action">
                                            <a aria-expanded="false" data-bs-toggle="dropdown"
                                                className="action-icon dropdown-toggle" href="#"><i
                                                    className="material-icons">more_vert</i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a data-bs-target="#edit_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                                                <a data-bs-target="#delete_project" data-bs-toggle="modal" href="#"
                                                    className="dropdown-item"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                            </div>
                                        </div>
                                        <h4 className="project-title"><a href="project-view.html">Hospital
                                            Administration</a></h4>
                                        <small className="block text-ellipsis m-b-15">
                                            <span className="text-xs">12</span> <span className="text-muted">open tasks, </span>
                                            <span className="text-xs">4</span> <span className="text-muted">tasks
                                                completed</span>
                                        </small>
                                        <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. When an unknown printer took a galley of type and
                                            scrambled it...
                                        </p>
                                        <div className="pro-deadline m-b-15">
                                            <div className="sub-title">
                                                Deadline:
                                            </div>
                                            <div className="text-muted">
                                                17 Apr 2019
                                            </div>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Project Leader :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor"><img
                                                        alt="" src="assets/img/profiles/avatar-16.jpg" /></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="project-members m-b-15">
                                            <div>Team :</div>
                                            <ul className="team-members">
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Doe"><img alt=""
                                                        src="assets/img/profiles/avatar-02.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Richard Miles"><img
                                                        alt="" src="assets/img/profiles/avatar-09.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="John Smith"><img alt=""
                                                        src="assets/img/profiles/avatar-10.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" data-bs-toggle="tooltip" title="Mike Litorus"><img
                                                        alt="" src="assets/img/profiles/avatar-05.jpg" /></a>
                                                </li>
                                                <li>
                                                    <a href="#" className="all-users">+15</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="m-b-5">Progress <span className="text-success float-end">40%</span></p>
                                        <div className="progress progress-xs mb-0">
                                            <div  title="" data-bs-toggle="tooltip" role="progressbar"
                                                className="progress-bar bg-success" data-original-title="40%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="tab-pane fade" id="bank_statutory">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title"> Basic Salary Information</h3>
                                <form>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label className="col-form-label">Salary basis <span
                                                    className="text-danger">*</span></label>
                                                {/* <select className="select">
                                                    <option>Select salary basis type</option>
                                                    <option>Hourly</option>
                                                    <option>Daily</option>
                                                    <option>Weekly</option>
                                                    <option>Monthly</option>
                                                </select> */}
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label className="col-form-label">Salary amount <small
                                                    className="text-muted">per month</small></label>
                                                <div className="input-group">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control"
                                                        placeholder="Type your salary amount" value="0.00" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label className="col-form-label">Payment type</label>
                                                {/* <select className="select">
                                                    <option>Select payment type</option>
                                                    <option>Bank transfer</option>
                                                    <option>Check</option>
                                                    <option>Cash</option>
                                                </select> */}
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                        <h3 className="card-title"> PF Information</h3>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">PF contribution</label>
                                                    {/* <select className="select">
                                                        <option>Select PF contribution</option>
                                                        <option>Yes</option>
                                                        <option>No</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">PF No. <span
                                                        className="text-danger">*</span></label>
                                                    {/* <select className="select">
                                                        <option>Select PF contribution</option>
                                                        <option>Yes</option>
                                                        <option>No</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">Employee PF rate</label>
                                                    {/* <select className="select">
                                                        <option>Select PF contribution</option>
                                                        <option>Yes</option>
                                                        <option>No</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">Additional rate <span
                                                        className="text-danger">*</span></label>
                                                    {/* <select className="select">
                                                        <option>Select additional rate</option>
                                                        <option>0%</option>
                                                        <option>1%</option>
                                                        <option>2%</option>
                                                        <option>3%</option>
                                                        <option>4%</option>
                                                        <option>5%</option>
                                                        <option>6%</option>
                                                        <option>7%</option>
                                                        <option>8%</option>
                                                        <option>9%</option>
                                                        <option>10%</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">Total rate</label>
                                                    <input type="text" className="form-control" placeholder="N/A" value="11%" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">Employee PF rate</label>
                                                    {/* <select className="select">
                                                        <option>Select PF contribution</option>
                                                        <option>Yes</option>
                                                        <option>No</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">Additional rate <span
                                                        className="text-danger">*</span></label>
                                                    {/* <select className="select">
                                                        <option>Select additional rate</option>
                                                        <option>0%</option>
                                                        <option>1%</option>
                                                        <option>2%</option>
                                                        <option>3%</option>
                                                        <option>4%</option>
                                                        <option>5%</option>
                                                        <option>6%</option>
                                                        <option>7%</option>
                                                        <option>8%</option>
                                                        <option>9%</option>
                                                        <option>10%</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="col-form-label">Total rate</label>
                                                    <input type="text" className="form-control" placeholder="N/A" value="11%" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                            <h3 className="card-title"> ESI Information</h3>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">ESI contribution</label>
                                                        {/* <select className="select">
                                                            <option>Select ESI contribution</option>
                                                            <option>Yes</option>
                                                            <option>No</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">ESI No. <span
                                                            className="text-danger">*</span></label>
                                                        {/* <select className="select">
                                                            <option>Select ESI contribution</option>
                                                            <option>Yes</option>
                                                            <option>No</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Employee ESI rate</label>
                                                        {/* <select className="select">
                                                            <option>Select ESI contribution</option>
                                                            <option>Yes</option>
                                                            <option>No</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Additional rate <span
                                                            className="text-danger">*</span></label>
                                                        {/* <select className="select">
                                                            <option>Select additional rate</option>
                                                            <option>0%</option>
                                                            <option>1%</option>
                                                            <option>2%</option>
                                                            <option>3%</option>
                                                            <option>4%</option>
                                                            <option>5%</option>
                                                            <option>6%</option>
                                                            <option>7%</option>
                                                            <option>8%</option>
                                                            <option>9%</option>
                                                            <option>10%</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Total rate</label>
                                                        <input type="text" className="form-control" placeholder="N/A" value="11%" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="submit-section">
                                                <button className="btn btn-primary submit-btn" type="submit">Save</button>
                                            </div>
                                        </form>
                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
            
                <Modal show={show} onHide={handleClose} size="lg">
                    <div className="modal-header">
                        <h5 className="modal-title">Profile Information</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EditProfileInfo saveLeaveType={(data)=>saveLeaveType(data)} onloadDetails={onloadData} />
                    </div>
                </Modal>

                <Modal show={showPersonal} onHide={handleClosePersonal} size="lg">
                    <div className="modal-header">
                        <h5 className="modal-title">Profile Information</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClosePersonal()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EditProfileNation saveProfileNation={(data)=>saveProfileNation1(data)} onloadDetails={onloadData} />
                    </div>
                </Modal>

                <Modal show={showContact} onHide={handleCloseContact} size="lg">
                    <div className="modal-header">
                        <h5 className="modal-title">Profile Information</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseContact()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EditProfileContact saveProfileContact={(data)=>saveProfileContact(data)} onloadDetails={onloadData} />
                    </div>
                </Modal>

                <Modal show={showBank} onHide={handleCloseBank} size="lg">
                    <div className="modal-header">
                        <h5 className="modal-title">Bank Information</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseBank()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EditProfileBank saveProfileBank={(data)=>saveProfileBank(data)} onloadDetails={onloadData} />
                    </div>
                </Modal>

                <Modal show={showFamily} onHide={handleCloseFamily} size="lg">
                    <div className="modal-header">
                        <h5 className="modal-title">Family Informations</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleCloseFamily()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <EditProfileFamily saveProfileFamily={(data)=>saveProfileFamily(data)} onloadDetails={onloadData} />
                    </div>
                </Modal>
            </>
        )
}
export default ViewEployee;