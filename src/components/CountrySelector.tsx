import { useEffect, useRef, useState } from 'react';
import '../styles/CountrySelector.css';

interface CountrySelectorProps {
    countriesLst: string[];
    onCountrySelect: (country: string, countryText: string) => any; // Added countryText
    id: string; 
}


export default function CountrySelector ({ countriesLst, onCountrySelect, id }: CountrySelectorProps)
{

    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [disabled, ] = useState(false);
    const [disabledItems, ] = useState(new Set<string>());

    const handleItemClick = (option: any) => {
        if (!disabledItems.has(option)) {
            setSelectedValue(option);
            onCountrySelect(option, id);
        }
    }

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    const handleInputClick = (e: any) => {
        e.stopPropagation();
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
        if (selectedValue) {
            return <span className="selected">{selectedValue}</span>;
        }
        return <span className="default">Select Country</span>;
    }

    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);

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
                    <div className="country-selector" onClick={handleInputClick}> 
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