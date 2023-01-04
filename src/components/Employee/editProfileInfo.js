import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import moment from "moment/moment";
const EditProfileInfo = ({saveLeaveType, onloadDetails}) => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [departmentList, setDepartmentList] = useState([])
    const [profileImage, setprofileImage] = useState()
    const [designationList, setDesignationList] = useState([])
    const getDepartmentList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/department');
            setDepartmentList(response.data)
          } catch (error) {
            console.error(error);
          }
    }

    const getDesignationList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/designation');
            setDesignationList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        console.log(onloadDetails)
        setValue("firstName", onloadDetails.Name)
        setValue("lastName", onloadDetails.lastname)
        setValue("dob", moment(onloadDetails.dob).format('YYYY-MM-DD'))
        setValue("gender", onloadDetails.Gender)
        setValue("address", onloadDetails.Address)
        setValue("phone", onloadDetails.Mobile)
        setValue("department", onloadDetails.Department)
        setValue("designation", onloadDetails.Designation)
        setValue("reportsto", onloadDetails.Reporting)
        setValue("state", onloadDetails.state)
        setValue("country", onloadDetails.country)
        setValue("pincode", onloadDetails.pincode)
        getDesignationList();
        getDepartmentList();
    }, [])
    const uploadFiletoNew = async (data) => {
        const formData = new FormData();
        formData.append("myImage", data.target.files[0]);
        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            setValue('profileImage', response.data.file)
            setprofileImage(response.data.file)
            //setDesignationList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <form onSubmit={handleSubmit(saveLeaveType)}>
            <div className="row">
                <div className="col-md-12">
                    <div className="profile-img-wrap edit-img">
                        <img className="inline-block" src={onloadDetails.profileImage?`http://localhost:5000/${onloadDetails.profileImage}`:"https://i.pravatar.cc/300"}
                            alt="user" />
                        <div className="fileupload btn">
                            <span className="btn-text">edit</span>
                            <input className="upload" type="file" onChange={(e)=>uploadFiletoNew(e)} />
                            
                        </div>
                        <input type="hidden"  {...register("profileImage")} />
                    </div>

                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">First Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" {...register("firstName")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group"> <label className="col-form-label">Last Name</label>
                        <input className="form-control" type="text" {...register("lastName")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Birth Date <span className="text-danger">*</span></label>
                        <input className="form-control datetimepicker" type="date" {...register("dob")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Gender <span  className="text-danger">*</span></label>
                        <select className="form-control" {...register("gender")}>
                            <option value="">Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="form-group">
                        <label className="col-form-label">Address</label>
                        <input className="form-control" type="text" {...register("address")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">State</label>
                        <input className="form-control" type="text" {...register("state")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Country <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" {...register("country")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Pin Code <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" {...register("pincode")} />
                    </div>
                </div>
               
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Phone </label>
                        <input className="form-control" type="text" {...register("phone")} />
                    </div>
                </div>
                {/* <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Company</label>
                        <select className="form-control" {...register("typeName")}>
                            <option value="">Global Technologies</option>
                            <option value="1">Delta Infotech</option>
                        </select>
                    </div>
                </div> */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Department <span className="text-danger">*</span></label>
                        <select className="form-control" {...register("department")}>

                            <option>Select Department</option>
                            {departmentList.map((department,i)=>{
                                return (<option key={i} value={department.ID}>{department.name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Designation <span className="text-danger">*</span></label>
                        <select className="form-control" {...register("designation")}>
                            <option>Select Designation</option>
                            {designationList.map((designation,i)=>{
                                return (<option key={i} value={designation.ID}>{designation.designation}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Reports To <span className="text-danger">*</span></label>
                        <select className="form-control" {...register("reportsto")}>
                            <option>Select Reports To</option>
                            {designationList.map((designation,i)=>{
                                return (<option key={i} value={designation.ID}>{designation.designation}</option>)
                            })}
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="submit-section">
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EditProfileInfo;