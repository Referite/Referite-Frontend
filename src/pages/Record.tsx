import Sidebar from "../components/SideBar";
import RecordInputRow from "../components/RecordInputRow";
import '../styles/Record.css';
import { useState, useEffect } from 'react';


export default function Record () {
    
    const [serviceList, setServiceList] = useState([
        { service: '' },
        
    ]);

    const AddMoreCountry = () => {
        setServiceList([...serviceList, { service: '' }])
    }
    return (
        <>
            <Sidebar />
            <div className="record-page-container">
                
                <div className="sport-info-container">
                    <div className="type-topic-container">
                        <label className="sport-topic"> Sport </label>
                        <select className="type-selector"> </select> 
                    </div>
                    <div className="sport-info">
                        <label className="date"> Compeitition Date: <span className="copetition-date"> DD / MM / YY </span> </label>
                        <label className="participants"> Participating countries: <span className="countries-num"> num Countries </span> </label>
                    </div>
                </div>
                <div className="recording-container">
                    <div className='big-input-container'>
                        <div className="input-container">
                            <label className="blank-space">&nbsp;</label>
                            <label className="medal"> Gold </label>
                            <label className="medal"> Silver </label>
                            <label className="medal"> Bronze </label>
                            <RecordInputRow/>
                            <RecordInputRow/>                        
                        </div>
                        {serviceList.map((singleService, index) => (
                            <div key={index} className="input-container">
                                <RecordInputRow/>                          
                            </div>
                        ))}  
                    </div>
                </div>
                <div className="buttons-container">
                    <input 
                        className="add-country-button"
                        type="button" 
                        value="Add more Country" 
                        onClick={AddMoreCountry}
                    />
                    <input type="button" value="Send record" className="record-button"/>
                </div>
            </div>
        </>
    )

}