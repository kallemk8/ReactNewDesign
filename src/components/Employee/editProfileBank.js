import React, {useEffect } from "react";
import { useForm } from "react-hook-form";
const EditProfileBank = ({saveProfileBank, onloadDetails}) => {
    const { register, handleSubmit:handleSubmit2, setValue, formState: { errors } } = useForm();
    useEffect(()=>{
        setValue("Bankname", onloadDetails.Bankname)
        setValue("BankaccountNo", onloadDetails.BankaccountNo)
        setValue("IFSCCode", onloadDetails.IFSCCode)
        setValue("PANNo", onloadDetails.PANNo)
    }, [])
    return (
        <form onSubmit={handleSubmit2(saveProfileBank)}>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Bank name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" {...register("Bankname")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Bank Account No <span className="text-danger">*</span></label>
                        <input className="form-control datetimepicker" type="text" {...register("BankaccountNo")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">IFSC Code</label>
                        <input className="form-control" type="text" {...register("IFSCCode")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">PAN No</label>
                        <input className="form-control" type="text" {...register("PANNo")}/>
                    </div>
                </div>
            </div>
            
            <div className="submit-section">
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EditProfileBank;