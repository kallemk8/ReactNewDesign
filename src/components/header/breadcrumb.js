import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({title, navigation, subnavigation}) => {
    return (
        <>
            <div className="page-header">
                <div className="row">
                    <div className="col-sm-12">
                        <h3 className="page-title">{title}</h3>
                        <ul className="breadcrumb">
                            {navigation.map((item,i)=>{
                                if(item.show){
                                    return (<li className="breadcrumb-item active"><Link to={item.to}>{item.name}</Link></li>)
                                }else{
                                    return (<li className="breadcrumb-item active">{item.name}</li>)
                                }
                                
                            })}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Breadcrumb;