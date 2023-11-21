import { useEffect, useRef, useState } from 'react';
import '../styles/CountrySelector.css';

interface CountrySelectorProps {
    countriesLst: string[];
    onCountrySelect: (country: string, countryText: string) => any; // Added countryText
    id: string; 
    selectedCountry: any;
    isNewRowAdded: any;
}


export default function CountrySelector ({ countriesLst, onCountrySelect, id, selectedCountry }: CountrySelectorProps)
{

    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [disabled, ] = useState(false);
    const [disabledItems, ] = useState(new Set<string>());
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleItemClick = (option: any) => {
        if (!disabledItems.has(option)) {
            setSelectedValue(option);
            onCountrySelect(option, id);
            setShowMenu(false);

        }
    }

    useEffect(() => {
        const handler = (e: any) => {
            // Close the menu if a click happens outside the dropdown
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    }, []);

    useEffect(() => {
        // Only update the internal state if the prop has actually changed
        if (selectedCountry !== selectedValue) {
          setSelectedValue(selectedCountry || null);
        }
      }, [selectedCountry]); // Only listen to changes of selectedCountry

    const handleInputClick = () => {
        // e.stopPropagation();
        if (!disabled) {
            setShowMenu(!showMenu);
        }
    }

    const isSelected = (option: any) => {
        if (!selectedValue) {
            return false;
        }
        return selectedValue === option;
    }

    const getDisplay = () => {
        return selectedCountry ? <span className="selected">{selectedCountry}</span> : <span className="default">Select Country</span>;
    }

    

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    const onSearch = (e: any) => {
        setSearchValue(e.target.value);
    };
    const getOptions = () => {
        if (!searchValue) {
            return countriesLst;
        }
        return countriesLst.filter((country) => country.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
    };

    

    return (
        <>
            <div className="input-container-item">
                <div className="dropdown">
                    <div className="country-selector" ref={inputRef} onClick={handleInputClick}> 
                    <div className="country-text" id={id}>
                        {getDisplay()}
                    </div>
                        <div className="dropdown-tools">
                            <div className="dropdown-tool"> ⌄ </div>
                        </div>
                    </div>
                    {showMenu && (
                        <div className="dropdown-menu">
                        <div className="search-box">
                            <input onChange={onSearch} value={searchValue} ref={searchRef} />
                        </div>
                        {getOptions().map((country) => (
                            <div 
                                onClick={() => handleItemClick(country)}
                                key={country}
                                className={`dropdown-item ${isSelected(country) && "selected"} ${disabledItems.has(country) ? 'disabled' : ''}`}
                            > 
                                {country}
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>  
        </>
    ) 
}
