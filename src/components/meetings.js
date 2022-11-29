import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
const Meetings = () => {
    const [addMeeting, setAddMeeting] = useState(false)
    const [meetingslist, setMeetingsList] = useState([])
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const getMeetingslist = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/meetings`);
            if(response.data){
                setMeetingsList(response.data)
            }
          } catch (error) {
            console.error(error);
          }
    }
    const save = async () =>{
        var user = localStorage.getItem('user-info');
        var tempuser = JSON.parse(user)
        var req = {
        "name":getValues('meetingname'),
        "url":getValues('meetingurl'),
        "startTime":getValues('startTime'),
        "endTime":getValues('endTime'),
        "status":1,
        "companyID":tempuser.CompanyID,
        "userID":tempuser.UserID,
        "projectID":1
        }

        try {
            const response = await axios.post(`http://localhost:5000/meetings`, req);
            if(response.data.insertId){
                alert("added meeting success");
                setAddMeeting(false)
            }
          } catch (error) {
            console.error(error);
          }

    }
    useEffect(()=>{
        getMeetingslist();
    },[])
    return (
        <>
            
            <div className="meetingsHolder">
                <div className="row">
                <div className="col-md-6">
                    <h4>Meeting</h4>
                </div>
                <div className="col-md-6 text-right">
                    <div className="createProject">
                        <button className="btn btn-primary" onClick={()=>setAddMeeting(!addMeeting)}  >{addMeeting ? "Back" : "Create Meeting"} </button>
                    </div>
                </div>
                </div>
                 
                {addMeeting ? <div className="row">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Meeting Name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" {...register("meetingname")} placeholder="Meeting Name"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">URL</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" {...register("meetingurl")} placeholder="URL"  />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Start Time</label>
                            <input type="time" className="form-control" id="exampleInputPassword1" {...register("startTime")} placeholder="Project Name"  />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">End Time</label>
                            <input type="time" className="form-control" id="exampleInputPassword1" {...register("endTime")} placeholder="Project Name"  />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={()=>save()}>Save</button>
                        </div>
                    </div>
                </div> : 
                <div className="row">
                    {meetingslist.map((meeting, i)=>{
                        return (
                            <div className="col-md-4" key={i}>
                                <a href={meeting.url} target="_blank" className="meetingBar">
                                    <div className="Meetingname">{meeting.name}</div>
                                    <div >{meeting.startTime} --- {meeting.endTime}</div>
                                </a>
                            </div>
                        )
                    })}
                    
                    {/* <div className="col-md-4">
                        <a href="" target="_blank" className="meetingBar">
                            <div className="Meetingname">Meeting 2</div>
                            <div >7:00 PM</div>
                        </a>
                    </div>
                    <div className="col-md-4">
                        <a href="" target="_blank" className="meetingBar">
                            <div className="Meetingname">Meeting 3</div>
                            <div >9:30 PM</div>
                        </a>
                    </div> */}
                </div> }
            </div>
        </>
    )
}

export default Meetings;