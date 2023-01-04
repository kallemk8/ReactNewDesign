import React, {useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const EditProfileFamily = ({saveProfileFamily, onloadDetails}) => {
    const { register, handleSubmit:handleSubmit3, setValue, formState: { errors } } = useForm();
    const [familyMembers, setfamilyMembers] = useState([{"FamilyName":"", "FamilyRelation":"", "FamilyDateofbirth":"", "FamilyPhone":"", "userID":onloadDetails.UserID}])
    useEffect(()=>{
        setValue("Bankname", onloadDetails.Bankname)
        setValue("BankaccountNo", onloadDetails.BankaccountNo)
        setValue("IFSCCode", onloadDetails.IFSCCode)
        setValue("PANNo", onloadDetails.PANNo)
    }, [])
    const AddMoreFamilyMembers = () => {
        setfamilyMembers([...familyMembers, {"FamilyName":"", "FamilyRelation":"", "FamilyDateofbirth":"", "FamilyPhone":"", "userID":onloadDetails.UserID}])
    }
    const removeFamilyMembers = (id) => {
        var tempArray = familyMembers;
        tempArray.splice(id,1);
        setfamilyMembers([...tempArray])
    }
    const changeQuestionsList = (event, index) => {
        let newValues = [...familyMembers];
        newValues[index][event.target.name] = event.target.value;
        setfamilyMembers(newValues);
    }
    const saveProfileFamily2 = () => {
        saveProfileFamily(familyMembers);
    }
    return (
        <form onSubmit={handleSubmit3(saveProfileFamily2)}>
            {familyMembers.map((family,i)=>{
                return (
                <div className="card">
                    <div className="card-body">
                    <h3 class="card-title">Family Member <a class="delete-icon" onClick={()=>removeFamilyMembers(i)}><i class="la la-trash-o"></i></a></h3>
                    <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="col-form-label">Name  <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" name={"FamilyName"} value={family.FamilyName}  onChange={(e)=>{changeQuestionsList(e,i); family.FamilyName = e.target.value}}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="col-form-label">Relationship <span className="text-danger">*</span></label>
                            <input className="form-control datetimepicker" type="text" name={"FamilyRelation"} value={family.FamilyRelation}  onChange={(e)=>{changeQuestionsList(e,i); family.FamilyRelation = e.target.value}}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="col-form-label">Date of birth</label>
                            <input className="form-control" type="date" name={"FamilyDateofbirth"}  value={family.FamilyDateofbirth}  onChange={(e)=>{changeQuestionsList(e,i); family.FamilyDateofbirth = e.target.value}}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="col-form-label">Phone </label>
                            <input className="form-control" type="text" name={"FamilyPhone"}  value={family.FamilyPhone}  onChange={(e)=>{changeQuestionsList(e,i); family.FamilyPhone = e.target.value}}/>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
                
            )})}
            <div class="add-more">
                <a onClick={()=>AddMoreFamilyMembers()}><i class="fa fa-plus-circle"></i> Add More</a>
            </div>
            <div className="submit-section">
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default EditProfileFamily;