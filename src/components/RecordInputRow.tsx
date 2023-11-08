import '../styles/RecordInputRow.css';
import CountrySelector from './CountrySelector';
import delete_row_icon from '../assets/images/referite_icon/delete_row_icon.png'; 

interface CountrySelectorProps {
    countriesLst: Array<string>;
    onButtonClick: any;
    onCountrySelect: any;
    id: string;
  }

export default function RecordInputRow ({ countriesLst, onButtonClick, onCountrySelect, id }: CountrySelectorProps) {

    return (
        <>
            <div className="country-dropdown-bar">
                <CountrySelector countriesLst={countriesLst} onCountrySelect={country => onCountrySelect(country, id)} id={`countrySelector-${id}`} />
            </div>
            <input type="text" className="medal-num-input" placeholder='0' id={"input1-" + id}/> 
            <input type="text" className="medal-num-input" placeholder='0' id={"input2-" + id}/> 
            <input type="text" className="medal-num-input" placeholder='0' id={"input3-" + id}/> 
            <button className='delete-button' onClick={onButtonClick} id={id}> <img src={delete_row_icon} className="delete-icon"/> </button>
        </>
    )
}