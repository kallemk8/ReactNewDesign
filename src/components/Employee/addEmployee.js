import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
const AddEmployee = ({saveLeaveType}) => {
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
    }, [])
    return (
        <form onSubmit={handleSubmit(saveLeaveType)}>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">First Name <span class="text-danger">*</span></label>
                        <input class="form-control" type="text" {...register("firstName")} />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group"> <label class="col-form-label">Last Name</label>
                        <input class="form-control" type="text" {...register("lastName")} />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Username <span  class="text-danger">*</span></label>
                        <input class="form-control" type="text" {...register("username")} />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Email <span  class="text-danger">*</span></label>
                        <input class="form-control" type="email" {...register("email")} />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Password</label>
                        <input class="form-control" type="password" {...register("password")}/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Confirm Password</label>
                        <input class="form-control" type="password" {...register("confirmpassword")}/>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Employee ID <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" {...register("employeeID")} />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Joining Date <span class="text-danger">*</span></label>
                        <div class="cal-icon">
                            <input class="form-control datetimepicker" type="text" {...register("joiningDate")} />
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Phone </label>
                        <input class="form-control" type="text" {...register("phone")} />
                    </div>
                </div>
                {/* <div class="col-sm-6">
                    <div class="form-group">
                        <label class="col-form-label">Company</label>
                        <select class="form-control" {...register("typeName")}>
                            <option value="">Global Technologies</option>
                            <option value="1">Delta Infotech</option>
                        </select>
                    </div>
                </div> */}
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Department <span class="text-danger">*</span></label>
                        <select class="form-control" {...register("department")}>

                            <option>Select Department</option>
                            {departmentList.map((department,i)=>{
                                return (<option value={department.ID}>{department.name}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Designation <span class="text-danger">*</span></label>
                        <select class="form-control" {...register("designation")}>
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