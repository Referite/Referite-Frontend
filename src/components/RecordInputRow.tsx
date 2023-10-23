import '../styles/RecordInputRow.css';

export default function RecordInputRow () {
    return (
        <>
            <div className="input-container-item"> 
                <select className="country-selector"/> 
            </div>
            <div className="input-container-item"> 
                <input type="text" className="medal-num-input"/> 
            </div>
            <div className="input-container-item"> 
                <input type="text" className="medal-num-input"/> 
            </div>
            <div className="input-container-item"> 
                <input type="text" className="medal-num-input"/> 
            </div>
        </>
    )
}