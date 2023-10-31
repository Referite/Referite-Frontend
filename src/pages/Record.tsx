import Sidebar from "../components/SideBar";
import RecordInputRow from "../components/RecordInputRow";
import '../styles/Record.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSportData } from '../assets/services/SportsDetails'


export default function Record () {
    // load data

    interface SportType {
        type_name: string;
        competition_date: string;
        participating_country_count: number;
        participating_countries: Array<string>;
    }

    interface SportData {
        sport_name: string;
        sport_types: Array<SportType>;
      }

    const [sport, setSport] = useState<SportData>({
        sport_name: '',
        sport_types: []
    });

    const { sport_id } = useParams()

    useEffect(() => {
        if (sport_id) {
            getSportData(sport_id).then(data => setSport(data)).catch(err => console.log(err));
        }
    }, [sport_id]);

    const typesName: string[] = [];

    for(const t of sport.sport_types) {
        typesName.push(t.type_name);
    }

    var [selectedType, setSelectedType] = useState('');
    const [competitionDate, setCompetitionDate] = useState('');

    const updateLabelText = () => {
        if (selectedType) {
          const selectedTypeData = sport.sport_types.find(type => type.type_name === selectedType);
          if (selectedTypeData) {
            const formattedDate = formatDate(selectedTypeData.competition_date);
            setCompetitionDate(formattedDate);
          }
        }
      };

    useEffect(() => {
    // Set initial label text when the component mounts
    updateLabelText();
    }, [selectedType]); 

    const handleChangeType = (e: any) => {
        setSelectedType(e.target.value);
    };

    const participatingCountries = selectedType && sport.sport_types.find((type) => type.type_name === selectedType)?.participating_countries || [];

    // daate formater
    const formatDate = (dateString: any) => {
        const date = dateString ? new Date(dateString) : null;
      
        if (date) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
      
          return `${day} / ${month} / ${year}`;
        }
      
        return '';
      };

  
    // add country button

    const [serviceList, setServiceList] = useState([
        { service: '' },
        
    ]);

    const AddMoreCountry = () => {
        setServiceList([...serviceList, { service: '' }])
    }

    return (
        <>
            <Sidebar />
            <div className="record-page-container">
                
                <div className="sport-info-container">
                    <div className="type-topic-container">
                        <label className="sport-topic"> {sport.sport_name} </label>
                        <select
                            className="type-selector"
                            value={selectedType}
                            onChange={handleChangeType}
                            >
                            <option > Select Sport Type... </option>
                            {typesName.map((i, index) => (
                                <option key={index} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="sport-info">
                        <label className="participants"> 
                            Competition Date: {" "}
                            <span className="countries-num"> 
                                {selectedType && formatDate(
                                    sport.sport_types.find((type) => type.type_name === selectedType)?.competition_date
                                )}
                                {" "}  
                            </span> 
                        </label>
                        <label className="participants"> 
                            Participating countries: {" "}
                            <span className="countries-num"> 
                                {selectedType && sport.sport_types.find((type)=> type.type_name == selectedType)?.participating_country_count}
                                {" "}  
                            </span> 
                        </label>
                    </div>
                </div>
                <div className="border-container">
                    <div className="recording-container">
                        <div className="header-container">
                            <div className="header-item"> <label className="medal"> Gold </label> </div>
                            <div className="header-item"> <label className="medal"> Silver </label> </div>
                            <div className="header-item"> <label className="medal"> Bronze </label> </div>
                        </div>
                        <div className='big-input-container'>

                        <div className="input-container">
                            <RecordInputRow key="input1" countriesLst={participatingCountries} />
                            <RecordInputRow key="input2" countriesLst={participatingCountries} />  
                            {serviceList.map((singleService, index) => (
                                <RecordInputRow key={`input${index + 3}`} countriesLst={participatingCountries} />
                            ))}                        
                        </div>
                        </div>
                    </div>
                </div>
                <div className="buttons-container">
                    <input 
                        className="add-country-button"
                        type="button" 
                        value="Add more Country" 
                        onClick={AddMoreCountry}
                    />
                    <input type="button" value="Send record" className="record-button"/>
                </div>
            </div>
        </>
    )
}