import '../styles/RecordInputRow.css';
import CountrySelector from './CountrySelector';

export default function RecordInputRow () {

    const sample_coutries = [
        "Thailand", 
        "Japan",
        "USA",
        "France",
        "Italy",
        "Korea"
    ];

    return (
        <>
            <CountrySelector countriesLst={sample_coutries}/>

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