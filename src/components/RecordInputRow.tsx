import '../styles/RecordInputRow.css';

export default function RecordInputRow () {
    return (
        <>
            <div className="input-container-item"> 
                <select className="country-selector" placeholder='Select'/> 
                
            </div>
            <div className="input-container-item"> 
                <input type="text" className="medal-num-input" placeholder='0'/> 
            </div>
            <div className="input-container-item"> 
                <input type="text" className="medal-num-input" placeholder='0'/> 
            </div>
            <div className="input-container-item"> 
                <input type="text" className="medal-num-input" placeholder='0'/> 
            </div>
        </>
    )
}