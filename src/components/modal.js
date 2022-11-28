import React from "react";
import { useForm } from "react-hook-form";

const Modals = (props) => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const close = () => {
        props.handleClose();
    }
    const save = () => {
        var req = {
            "projectname":getValues("projectName"),
            "start":getValues("startDate"),
            "end":getValues("endDate"),
            "info":getValues('projectInfo')
        }
        props.handleSave(req);
    }
    return (
        <>
            <div className={props.open ? "modal fade show" :"modal fade"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="close" onClick={()=>close()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Project Name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" {...register("projectName")} placeholder="Project Name"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Project Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" {...register("projectInfo")} rows="3"></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputstartDate1">Start Date</label>
                            <input type="date" className="form-control" {...register("startDate")} id="exampleInputstartDate1"  />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputendDate1">End Date</label>
                            <input type="date" className="form-control" {...register("endDate")} id="exampleInputendDate1" />
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>close()}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>save()} >Save</button>
                    </div>
                    </div>
                </div>
                </div>
          
        </>
    )
}

export default Modals;