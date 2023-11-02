import '../styles/RecordInputRow.css';
import CountrySelector from './CountrySelector';
import delete_row_icon from '../assets/images/referite_icon/delete_row_icon.png'; 

interface CountrySelectorProps {
    countriesLst: Array<string>;
    onButtonClick: any;
  }

export default function RecordInputRow ({ countriesLst, onButtonClick }: CountrySelectorProps) {

    return (
        <>
            <div className="country-dropdown-bar">
                <CountrySelector countriesLst={countriesLst}/>
            </div>
            <input type="text" className="medal-num-input" placeholder='0'/> 
            <input type="text" className="medal-num-input" placeholder='0'/> 
            <input type="text" className="medal-num-input" placeholder='0'/> 
            <button className='delete-button' onClick={onButtonClick}> <img src={delete_row_icon} className="delete-icon"/> </button>
        </>
    )
}