import React, { useState } from "react";

//import {FormInput, Table} from 'react-bootstrap';
import { FormInput, Table } from 'react-bootstrap'


function DisplayTable(){

 const [tableData, setTableData] = useState([])
 const [formInputData, setformInputData] = useState(
     {
         Name: '',
         username: '',
         Email:'',
         Account_Nums: ''
    }
 );
 
 const handleChange=(e)=>{  
     const newInput = (data)=>({...data, [e.target.name]:e.target.value})
    setformInputData(newInput)
 }
  
 const handleSubmit= (e) =>{
     e.preventDefault();
     const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
     if(checkEmptyInput)
     {
      const newData = (data)=>([...data, formInputData])
      setTableData(newData);
      const emptyInput= {Name:'', Email:'', Account_Nums:''}
      setformInputData(emptyInput)
     }
 }

 return(
     <>
     <div className="container">
     <div className="row">
         <div className="col-sm-8">
         <FormInput handleChange={handleChange} formInputData={formInputData} handleSubmit={handleSubmit}/>
         <Table tableData={tableData}/>
         </div>
         <div className="col-sm-4">

         </div>
     </div>
    </div>
     </>
 );
}
export default DisplayTable;