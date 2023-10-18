import Sidebar from "../components/SideBar";
import '../styles/Record.css';


export default function Record () {
    return (
        <div className="record-page-container">
            <Sidebar />
            <div className="sport-info-container">
                <div className="type-topic-container">
                    <div className="sport-topic"> 
                        Sport 
                    </div> 
                    <select className="type-selector"> </select> 
                </div>
                <div className="sport-info">
                    <div className="date">
                        Compeitition Date: DD / MM / YY
                    </div>
                    <div className="participants">
                        Participating countries: num Countries
                    </div>
                </div>
            </div>
            <div className="recording-container">
                <div className="grid-item"> </div>
                <div className="grid-item"> Gold </div>
                <div className="grid-item"> Silver </div>  
                <div className="grid-item"> Bronze </div>
                <div className="grid-item">
                    <select className="country-selector"> </select> 
                </div>
                <div className="grid-item">
                    <input type="text" className="number-input"/>    
                </div>  
                <div className="grid-item">
                    <input type="text" className="number-input"/>
                </div>
                <div className="grid-item">
                    <input type="text" className="number-input"/>
                </div>
                <div className="grid-item">
                    <select className="country-selector"> </select>     
                </div>  
                <div className="grid-item">
                    <input type="text" className="number-input"/>
                </div>  
                <div className="grid-item">
                    <input type="text" className="number-input"/>    
                </div>  
                <div className="grid-item">
                    <input type="text" className="number-input"/>    
                </div>  
                <div className="grid-item">
                    <select className="country-selector"> </select> 
                </div>  
                <div className="grid-item">
                    <input type="text" className="number-input"/>    
                </div>  
                <div className="grid-item">
                    <input type="text" className="number-input"/>    
                </div>  
                <div className="grid-item">
                    <input type="text" className="number-input"/>    
                </div>  
            </div>
            <div className="record-button-container">
                <input type="button" value="Send record" className="record-button"/>
            </div>
        </div>
    )

}