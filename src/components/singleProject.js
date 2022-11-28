import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const SingleProject = () => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const [btn, setBtn] = useState(false)
    const [project, setProject] = useState({})
    const [tasksList, setTasksList] = useState([])
    const { id } = useParams();
    const getProjectsList = async () =>{
        try {
            const response = await axios.get(`http://localhost:5000/projects/${id}`);
            if(response.data){
                setProject(response.data)
            }
          } catch (error) {
            console.error(error);
          }
    }
    const gettasksList = async () =>{
        try {
            const response = await axios.get(`http://localhost:5000/tasks/projectID/${id}`);
            if(response.data){
                setTasksList(response.data)
            }
          } catch (error) {
            console.error(error);
          }
    }
    const addtask = async () => {
        var user = localStorage.getItem('user-info');
        var tempuser = JSON.parse(user)
        var req = {
            taskname:getValues('addtask'),
            taskDesc:"",
            taskDate:new Date(),
            status:1,
            companyID:tempuser.CompanyID,
            projectID:id,
            userID:tempuser.UserID
        }
        try {
            const response = await axios.post(`http://localhost:5000/tasks`, req);
            if(response.data.insertId){
                alert("added task success");
                setValue("addtask", "");
            }
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        getProjectsList();
        gettasksList();
    }, [])
    return (
        <> 
            <div className="row">
                <div className="col-md-12 text-right">
                    <div className="createProject">
                        <button className="btn btn-primary" ><Link to="/projects" style={{color:"#fff"}} >Back </Link></button>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="projectHolderSingle">
                        <h4>{project.projectname} </h4>
                        <div className="desc" style={{width:"400px"}}>
                        {project.info}
                        </div>
                        <div className="startDate">
                            Start : {project.start}
                        </div>

                        <div className="startDate">
                            End : {project.end}
                        </div>
                    </div>
                    <div className="taskHolder">
                        <div className="taskList">
                            <ul>
                                {tasksList.map((task, i)=>{
                                    return (<li key={i}>{task.taskname}</li>)
                                })}
                            </ul>
                        </div>
                        <div className="addTask">
                            <div className="row">
                                <div className="col-md-6">
                                    <textarea className="form-control" id="exampleFormControlTextarea1" {...register("addtask")} rows="3"></textarea>
                                </div>
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-primary" disabled={btn} onClick={()=>addtask()}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
           
        </>
    )
}

export default SingleProject;