import React, {useEffect } from "react";
import { useForm } from "react-hook-form";
const EditProfileNation = ({saveProfileNation, onloadDetails}) => {
    const { register, handleSubmit:handleSubmit1, setValue, formState: { errors } } = useForm();
    useEffect(()=>{
        console.log(onloadDetails)
        setValue("PassportNo", onloadDetails.Passport)
        setValue("PassportExpiryDate", "")
        setValue("Tel", "")
        setValue("Nationality", onloadDetails.Nationality)
        setValue("Religion", onloadDetails.Religion)
        setValue("Maritalstatus", onloadDetails.MaritalStatus)
        setValue("spouse", onloadDetails.spouse)
        setValue("children", onloadDetails.children)
    }, [])
    return (
        <form onSubmit={handleSubmit1(saveProfileNation)}>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Passport No <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" {...register("PassportNo")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Passport Expiry Date <span className="text-danger">*</span></label>
                        <input className="form-control datetimepicker" type="date" {...register("PassportExpiryDate")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Tel</label>
                        <input className="form-control" type="text" {...register("Tel")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Nationality</label>
                        <input className="form-control" type="text" {...register("Nationality")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Religion <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" {...register("Religion")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Marital status <span  className="text-danger">*</span></label>
                        <select className="form-control" {...register("Maritalstatus")}>
                            <option value="">Select Marital status</option>
                            <option value="1">Single</option>
                            <option value="2">Married</option>
                        </select>
                    </div>
                </div>
                
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Employment of spouse <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" {...register("spouse")} />
                    </div>
                </div>
               
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">No. of children </label>
                        <input className="form-control" type="text" {...register("children")} />
                    </div>
                </div>
            </div>
            
            <div className="submit-section">
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EditProfileNation;