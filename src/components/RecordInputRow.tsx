import '../styles/RecordInputRow.css';
import CountrySelector from './CountrySelector';
import delete_row_icon from '../assets/images/referite_icon/delete_row_icon.png'; 
import { CountrySelectorProps } from "../interfaces/Country";

export default function RecordInputRow ({ 
    countriesLst, 
    onButtonClick, 
    onCountrySelect, 
    id, 
    medalValues ,
    onMedalInputChange,
    selectedCountry,
    isNewRowAdded
}: CountrySelectorProps
) {

    return (
        <>
            <div className="country-dropdown-bar">
        <CountrySelector
          countriesLst={countriesLst}
          onCountrySelect={(country) => onCountrySelect(country, id)}
          id={`countrySelector-${id}`}
          selectedCountry={selectedCountry}
          isNewRowAdded={isNewRowAdded}
        />
      </div>
      <input
        type="text"
        className="medal-num-input gold-input"
        placeholder='0'
        id={`input1-${id}`}
        value={medalValues.input1}
        onChange={(e) => onMedalInputChange('input1', e.target.value)}
      />
      <input
        type="text"
        className="medal-num-input silver-input"
        placeholder='0'
        id={`input2-${id}`}
        value={medalValues.input2}
        onChange={(e) => onMedalInputChange('input2', e.target.value)}
      />
      <input
        type="text"
        className="medal-num-input bronze-input"
        placeholder='0'
        id={`input3-${id}`}
        value={medalValues.input3}
        onChange={(e) => onMedalInputChange('input3', e.target.value)}
      />
      <button className='delete-button' onClick={onButtonClick} id={id}>
        <img src={delete_row_icon} className="delete-icon" alt="Delete" />
      </button>
        </>
    )
}