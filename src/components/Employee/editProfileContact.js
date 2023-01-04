import React, {useEffect } from "react";
import { useForm } from "react-hook-form";
const EditProfileContact = ({saveProfileContact, onloadDetails}) => {
    const { register, handleSubmit:handleSubmit1, setValue, formState: { errors } } = useForm();
    useEffect(()=>{
        console.log(onloadDetails)
        setValue("PrimaryName", onloadDetails.PrimaryName)
        setValue("PrimaryRelationship", onloadDetails.PrimaryRelationship)
        setValue("PrimaryPhone", onloadDetails.PrimaryPhone)
        setValue("SecondaryName", onloadDetails.SecondaryName)
        setValue("SecondaryRelationship", onloadDetails.SecondaryRelationship)
        setValue("SecondaryPhone", onloadDetails.SecondaryPhone)
    }, [])
    return (
        <form onSubmit={handleSubmit1(saveProfileContact)}>
            <div className="card">
                <div className="card-body">
                    <h3 class="card-title">Primary Contact</h3>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-form-label">Primary Name <span className="text-danger">*</span></label>
                                <input className="form-control" type="text" {...register("PrimaryName")} />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-form-label">Primary Relationship <span className="text-danger">*</span></label>
                                <input className="form-control datetimepicker" type="text" {...register("PrimaryRelationship")} />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-form-label">Primary Phone</label>
                                <input className="form-control" type="text" {...register("PrimaryPhone")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h3 class="card-title">Secondary Contact</h3>
            <div className="row">    
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Secondary Name</label>
                        <input className="form-control" type="text" {...register("SecondaryName")}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Secondary Relationship <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" {...register("SecondaryRelationship")} />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label className="col-form-label">Secondary Phone <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" {...register("SecondaryPhone")} />
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div className="submit-section">
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EditProfileContact;