import '../styles/RecordInputRow.css';
import CountrySelector from './CountrySelector';

interface CountrySelectorProps {
    countriesLst: Array<string>;
  }

export default function RecordInputRow ({ countriesLst }: CountrySelectorProps) {

    return (
        <>
            <CountrySelector countriesLst={countriesLst}/>

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