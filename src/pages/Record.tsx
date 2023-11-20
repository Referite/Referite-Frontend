import Sidebar from "../components/SideBar";
import RecordInputRow from "../components/RecordInputRow";
import { useState, useEffect } from 'react';
import { getSportData } from '../assets/services/SportsDetails'
import { getMessage } from "../assets/services/RecordMedal";
import { useLocation, useParams } from 'react-router-dom';
import { ErrorPopup, ConfirmationPopup, WarningPopup } from "../components/PopUps";
import { SportData } from "../interfaces/Sport";
import { SelectedCountry } from "../interfaces/Country";
import RecordedDataRow from "../components/RecordedDataRow";
import React from "react";
import '../styles/Record.css';

interface MedalValues {
  input1: string;
  input2: string;
  input3: string;
}
  
export default function Record () {

  const [sport, setSport] = useState<SportData>({
  sport_name: '',
  sport_types: []
  });
  
  const [selectedType, setSelectedType] = useState('Select Sport Type...'); 

  const [serviceList, setServiceList] = useState(() => [
  { service: '', id: `service-${Date.now()}` },
  { service: '', id: `service-${Date.now() + 1}` },
  { service: '', id: `service-${Date.now() + 2}` }
  ]);

  const [medalValuesList, setMedalValuesList] = useState<MedalValues[]>(serviceList.map(() => ({
    input1: '',
    input2: '',
    input3: '',
  })));

  const [selectedCountriesValues, setSelectedCountriesValues] = useState<string[]>(serviceList.map(() => ""));
  const [isNewRowAdded, setIsNewRowAdded] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountry[]>([]);

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
    
    const { sport_id } = useParams<{ sport_id: string }>(); // get sport_id from url
    
    const location = useLocation();
    const date = location.state?.date;

    useEffect(() => {
      if (sport_id) {
        getSportData(sport_id, date)
          .then(data => setSport(data))
          .catch(err => console.log(err));
      }
    }, [sport_id]);
    
    const typesName: string[] = [];
    for (const t of sport.sport_types) {
      typesName.push(t.type_name);
    }

    // useEffect(() => {
    //   setSelectedCountriesValues(serviceList.map(() => ""));
    // }, [selectedType, serviceList]);
    
    const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedType(e.target.value);
    
      // Reset medal values for all rows to allow input after type change
      setMedalValuesList(serviceList.map(() => ({
        input1: '',
        input2: '',
        input3: '',
      })));
    };

    const handleMedalInputChange = (rowIndex: number, inputName: string, value: string) => {
      setMedalValuesList((prevValues) => prevValues.map((values, index) => {
        if (index === rowIndex) {
          return { ...values, [inputName]: value };
        }
        return values;
      }));
    };

    const getTypeStatus = (typeName: string): string | undefined => {
      return (
        typeName &&
        sport?.sport_types?.find((type) => type.type_name === typeName)?.status
      );
    };

    const recordStatus = getTypeStatus(selectedType);
    console.log(recordStatus);

    const participatingCountries = recordStatus === "TROPHY"
    ? selectedType && sport?.sport_types.find((type) => type.type_name === selectedType)?.participating_countries || []
    : [];

    const medalsData = recordStatus === "RECORDED"
        ? selectedType && sport?.sport_types.find((type) => type.type_name === selectedType)?.participants
        : null;

    function hasDuplicateCountries(participants: { country: string | undefined; medal: { gold: number; silver: number; bronze: number; }; }[]): boolean {
      const countriesSet = new Set<string>();
    
      for (const participant of participants) {
        const country = participant.country;
    
        if (country !== undefined && countriesSet.has(country)) {
          return true; // Found a duplicate country
        } else if (country !== undefined) {
          countriesSet.add(country);
        }
      }
    
      return false; // No duplicate countries found
    }
    
    function hasNegativeMedal(participants: { country: string | undefined; medal: { gold: number; silver: number; bronze: number; }; }[]): boolean {
      for (let i = 0; i < participants.length; i++) {
        const medal = participants[i].medal;
        if (medal.gold < 0 || medal.silver < 0 || medal.bronze < 0) {
          return true;
        }
      }
      return false;
    }
      
    const handleCountrySelect = (country: string, index: number, id: number) => {
      console.log(country);
      // Update the selected country value for the specified index
      setSelectedCountriesValues(prevValues =>
        prevValues.map((prevValue, i) => (i === index ? country : prevValue))
      );

      setSelectedCountries(prevCountries => {
        try {
            const newCountries = prevCountries.filter(c => c.id !== id);
            return [...newCountries, { id, country }];

            
        } catch (error: any) {
            console.error(error.message);
            return prevCountries;
        }
    });
    };

    useEffect(() => {
      setSelectedCountriesValues(serviceList.map(() => ""));
    }, [selectedType]); 
      
      
    
    const RecordButtonClick = async () => {
      const medalValues = serviceList.map((_, index) => {
          // Convert service.id to a string if it's not already, to match the type in selectedCountries
          console.log(selectedCountries);
          const id = index + 1;
          const country = selectedCountries.find(country => country.id == index + 1)?.country;
          console.log(country);
  
          const medal1 = parseInt((document.getElementById(`input1-${id}`) as HTMLInputElement)?.value || '0', 10);
          const medal2 = parseInt((document.getElementById(`input2-${id}`) as HTMLInputElement)?.value || '0', 10);
          const medal3 = parseInt((document.getElementById(`input3-${id}`) as HTMLInputElement)?.value || '0', 10);
  
          if (isNaN(medal1) || isNaN(medal2) || isNaN(medal3)) {
              ErrorPopup("Medal values must be numbers");
          }
  
          return {
              country,
              medal: {
                  gold: medal1,
                  silver: medal2,
                  bronze: medal3
              }
          };
      });
  
      const filteredMedalValues = medalValues.filter((medalEntry) => {
          return !(medalEntry.medal.gold === 0 && medalEntry.medal.silver === 0 && medalEntry.medal.bronze === 0);
      });

      const jsonString = {
          sport_name: sport.sport_name,
          participants: filteredMedalValues
      };

      try {
          if (hasDuplicateCountries(jsonString.participants) == true) {
              throw new Error("You have selected the same country");
          } else if (hasNegativeMedal(jsonString.participants) == true) {
              throw new Error("Medal values cannot be negative");
          }
          console.log(filteredMedalValues);
          const msg: any = await getMessage(jsonString);
          if (msg.data.hasOwnProperty("Monosport")) {
              if (msg.data.hasOwnProperty("Warning")) {
                  const mono_warning_msg = "There are only 1 country in this medal allocation. " + msg.data.Warning;
                  WarningPopup(mono_warning_msg, filteredMedalValues, sport, selectedType, sport_id);
              } else {
                  WarningPopup(msg.data.Monosport, filteredMedalValues, sport, selectedType, sport_id);
              }
          }
          else if (msg.data.hasOwnProperty("Warning")) {
              WarningPopup(msg.data.Warning, filteredMedalValues, sport, selectedType, sport_id);
          } else {
              ConfirmationPopup(filteredMedalValues, sport, selectedType, sport_id);
          };
      } catch (error: any) {
        if (error.message === "You have selected the same country") {
            // Handle the specific error message
            ErrorPopup(error.message); 
        } else if (error.message === "Medal values cannot be negative") {
            ErrorPopup(error.message); 
        } 
        else if (error.response) {
            // Handle other HTTP response status codes
            if (error.response.status === 400) {
              if (selectedType === "Select Sport Type...") {
                ErrorPopup("You didn't select any sport type");
              } else {
                const errorMessage = error.response.data.detail;
                ErrorPopup(errorMessage); 
              }
            } else if (error.response.status === 422) {
                filteredMedalValues.map((item) => {
                    if (item.country == null){
                        ErrorPopup("Please select country");
                    }
                })
            } else {
                console.log(error.response.status);
            }
        } else {
            console.log(error)
        }
      }
    }
    
    const AddMoreCountry = () => {
      const newService = { service: '', id: `service-${Date.now()}` };
    
      setServiceList([...serviceList, newService]);
      setMedalValuesList([...medalValuesList, { input1: '', input2: '', input3: '' }]);
      setSelectedCountriesValues([...selectedCountriesValues, '']); // Append a new empty string for the new country
    };

    // Then reset the flag on the next render
    useEffect(() => {
      if (isNewRowAdded) {
          // Give enough time for the child components to pick up the new flag
          const timer = setTimeout(() => {
              setIsNewRowAdded(false);
          }, 0);

          return () => clearTimeout(timer);
      }
    }, [isNewRowAdded]);

    const RemoveRow = (serviceId: string) => {
      console.log(serviceId);
      setServiceList(serviceList.filter(service => service.id !== serviceId));
      setMedalValuesList(medalValuesList.filter((_, index) => serviceList[index].id !== serviceId));
      setSelectedCountriesValues(selectedCountriesValues.filter((_, index) => serviceList[index].id !== serviceId));
    };
  
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
                                {formatDate(date)}
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
                            {recordStatus === "RECORDED" ? (
                              // Directly map over medalsData to display recorded rows
                              // Assuming medalsData is available in the component's scope
                              medalsData.map((data: { country: string; medal: { gold: number; silver: number; bronze: number; }; }) => (
                                <RecordedDataRow
                                  key={data.country}
                                  country={data.country}
                                  goldValue={data.medal.gold}
                                  silverValue={data.medal.silver}
                                  bronzeValue={data.medal.bronze}
                                />
                              ))
                            ) : (
                              // Render input rows for adding new data or editing existing data
                              serviceList.map((service, index) => (
                                <React.Fragment key={service.id}>
                                  <RecordInputRow
                                    id={String(index + 1)}
                                    countriesLst={participatingCountries} // replace emptyLst with actual countries list if available
                                    medalValues={medalValuesList[index]}
                                    selectedCountry={selectedCountriesValues[index]}
                                    onButtonClick={(event: { stopPropagation: () => void; }) => {
                                      event.stopPropagation();
                                      RemoveRow(service.id);
                                    }}
                                    onCountrySelect={(country: string) => handleCountrySelect(country, index, index + 1)}
                                    onMedalInputChange={(inputName: string, value: string) => handleMedalInputChange(index, inputName, value)}
                                    isNewRowAdded={isNewRowAdded && index === serviceList.length - 1}
                                  />
                                </React.Fragment>
                              ))
                            )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons-container">
                  {recordStatus === "RECORDED" ? (
                    // handle button when status is "RECORDED"
                    <div className="already-recorded-container">
                      Already Recorded
                    </div>
                  ) : (
                    // default button and handle button when status is "TROPHY"
                    <>
                      <input 
                        className="add-country-button"
                        type="button" 
                        value="Add more Country" 
                        onClick={AddMoreCountry}
                      />
                      <input 
                        type="button" 
                        value="Record Medal" 
                        className="record-button"         
                        onClick={RecordButtonClick}            
                      />
                    </>
                  )}
                </div>
            </div>
        </>
    )
}