import React, { useEffect, useState } from "react";
import axios from 'axios';
import Modal from "./modal";
import { useNavigate } from "react-router-dom";
const Projects = () => {
    const [open, setOpen] = useState(false)
    const [projectsList, setProjectsList] = useState([])
    const navigate = useNavigate()
    const handleOpen = () =>{
        setOpen(!open)
    }
    const getProjectsList = async () =>{
        try {
            const response = await axios.get(`http://localhost:5000/projects`);
            if(response.data){
                setProjectsList(response.data)
            }
          } catch (error) {
            console.error(error);
          }
    }
    const handdleSaveProject = async (data) => {
        var user = localStorage.getItem('user-info');
        var tempuser = JSON.parse(user)
        var req = {
            "projectname":data.projectname,
            "start":data.start,
            "end":data.end,
            "info":data.info,
            "companyID":tempuser.CompanyID,
            "status":1
        }
        try {
            const response = await axios.post(`http://localhost:5000/projects`, req);
            if(response.data.insertId){
                alert("added Project success");
                setOpen(false)
            }
          } catch (error) {
            console.error(error);
          }
    }
    const navigationtoSingle = (data) =>{
        navigate(`/project/${data}`)
    }
    useEffect(()=>{
        getProjectsList();
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-md-12 text-right">
                    <div className="createProject">
                        <button className="btn btn-primary" onClick={handleOpen} >Create Project</button>
                    </div>
                </div>
                {projectsList.map((item, i)=>{
                   return( <div className="col-md-4" key={i} onClick={()=>navigationtoSingle(item.ID)}>
                        <div className="projectHolder">
                            <div className="projectTitle">
                                {item.projectname}

                            </div>
                            <div className="projectDesc">
                            {item.info}
                        </div>
                        <div className="timeDideLine">
                                <div className="start">
                                Start :   {item.start}
                                </div>
                                <div className="end">
                                End:  {item.end}
                                </div>
                            </div>
                        </div>

                    </div>
                   )
                })}
                
            </div>
            <Modal open={open} handleClose={handleOpen} handleSave={(data)=>handdleSaveProject(data)} title="Add Project"  />
        </>
    )
}

export default Projects;