import { useEffect, useRef, useState } from 'react';
import '../styles/CountrySelector.css';

interface CountrySelectorProps {
    countriesLst: string[];
  }


export default function CountrySelector ({ countriesLst }: CountrySelectorProps)
{

    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const onItemClick = (option: any) => {
        setSelectedValue(option);
    }

    const isSelected = (option: any) => {
        if (!selectedValue) {
            return false;
        }
        return selectedValue === option;
    };

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    const handleInputClick = (e: any) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
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
                    <div className="country-text">
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
                        {getOptions().map((country: string) => (
                            <div 
                                onClick={() => onItemClick(country)}
                                key={country}
                                className={'dropdown-item ${isSelected(country) && "selected"}'}
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
