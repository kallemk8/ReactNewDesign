import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import moment from "moment/moment";
const Meetings = () => {
    const [addMeeting, setAddMeeting] = useState(false)
    const [addDailyTask, setaddDailyTask] = useState(false)
    const [meetingslist, setMeetingsList] = useState([])
    const [dailytasklist, setdailytasklist] = useState([])
    const [userList, setUserList] = useState([])
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const getUsersList = async () => {
        var user = localStorage.getItem('user-info');
        var tempuser = JSON.parse(user)
        try {
            const response = await axios.get(`http://localhost:5000/users/companyID/${tempuser.CompanyID}`);
            console.log(response);
            setUserList(response.data)
          } catch (error) {
            console.error(error);
          }
    }
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

    const getdailytaskList = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/dailytasks`);
            if(response.data){
                setdailytasklist(response.data)
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
    const addtask = async () => {
        var user = localStorage.getItem('user-info');
        var tempuser = JSON.parse(user)
        var req = {
            "name":getValues('taskname'),
            "description":getValues('taskdesc'),
            "status":1,
            "companyID":tempuser.CompanyID,
            "userID":getValues('user'),
        }
        try {
            const response = await axios.post(`http://localhost:5000/dailytasks`, req);
            if(response.data.insertId){
                alert("added task success");
                setaddDailyTask(false)
                getdailytaskList();
            }
          } catch (error) {
            console.error(error);
          }
    }
    const isDailyTask = () => {
        setaddDailyTask(true)
    }
    const changetocompleted = async (id, status) =>{
        var req = {

        }
        if(status == 1){
            req = {
                status:2
            }
        }else{
            req = {
                status:1
            }
        }
        
        try {
            const response = await axios.put(`http://localhost:5000/dailytasks/status/${id}`, req);
            if(response.data){
                alert("updated task success");
                getdailytaskList();
            }
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getMeetingslist();
        getdailytaskList();
        getUsersList();
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
                </div> }
                
                 <div className="row">
                 {!addDailyTask ?<div className="col-md-12">
                        <div className="">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Task</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Change Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailytasklist.map((tasks, i)=>{
                                    return (
                                        <tr>
                                            <td>{tasks.Name}</td>
                                            <td>{tasks.name}</td>
                                            <td>{moment(tasks.startDate).format("DD-MMMM-YYYY hh:mm A")}</td>
                                            <td>{tasks.status == 1 ? "Not Completed" : "Completed"}</td>
                                            <td><button className="btn btn-warning" onClick={()=>changetocompleted(tasks.ID, tasks.status)}> {tasks.status == 1 ? "Completed" : "Not Completed"}</button></td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td colSpan={5}><button className="btn btn-primary" onClick={isDailyTask}>Add Daily Task</button></td>
                                </tr>
                            </tbody>
                        </table>

                        
                        </div>
                    </div>:
                    <>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Task Name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" {...register("taskname")} placeholder="task"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Description</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" {...register("taskdesc")} placeholder="task desc"  />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">User</label>
                            <select class="form-control" id="exampleFormControlSelect1"  {...register("user")} >
                                <option>Select User</option>
                                {userList.map((item, i)=>{
                                    return (<option value={item.UserID}>{item.Name}</option>)
                                })}
                            </select>
                        </div>        
                       
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={()=>addtask()}>Save</button> &nbsp;
                            <button className="btn btn-warning" onClick={()=>setaddDailyTask(false)}>Cancel</button>
                        </div>
                    </div></>}
                </div>
            </div>
        </>
    )
}

export default Meetings;