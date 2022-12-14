import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
const AddEmployee = ({saveLeaveType, isEdited, onloadDetails}) => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [departmentList, setDepartmentList] = useState([])
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
        
        getDesignationList();
        getDepartmentList();
        if(isEdited){
            setValue('firstName', onloadDetails.Name)
            setValue('phone', onloadDetails.Mobile)
            setValue('joiningDate', onloadDetails.DateOfJoining)
            setValue('employeeID', onloadDetails.EmpID)
            setValue('email', onloadDetails.Email)
            setValue('department', onloadDetails.Department)
            setValue('designation', onloadDetails.Designation)
        }
    }, [])
    return (
        <form onSubmit={handleSubmit(saveLeaveType)}>
            <div className="row">
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
                        <label className="col-form-label">Username <span  className="text-danger">*</span></label>
                        <input className="form-control" type="text" {...register("username")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Email <span  className="text-danger">*</span></label>
                        <input className="form-control" type="email" {...register("email")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Password</label>
                        <input className="form-control" type="password" {...register("password")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Confirm Password</label>
                        <input className="form-control" type="password" {...register("confirmpassword")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Employee ID <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" {...register("employeeID")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Joining Date <span className="text-danger">*</span></label>
                        <input className="form-control datetimepicker" type="date" {...register("joiningDate")} />
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
                                return (<option value={department.ID}>{department.name}</option>)
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
                                return (<option value={designation.ID}>{designation.designation}</option>)
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

export default AddEmployee;