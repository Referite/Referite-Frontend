import Sidebar from "../components/SideBar";
import RecordInputRow from "../components/RecordInputRow";
import { useState, useEffect, Fragment } from 'react';
import { getSportData } from '../assets/services/SportsDetails'
import { getMessage } from "../assets/services/RecordMedal";
import { useLocation, useParams } from 'react-router-dom';
import { ErrorPopup, ConfirmationPopup, WarningPopup } from "../components/PopUps";
import { SportData } from "../interfaces/Sport";
import { SelectedCountry } from "../interfaces/Country";
import RecordedDataRow from "../components/RecordedDataRow";
import ClipLoader from "react-spinners/ClipLoader";
import { override, loaderContainerStyle } from '../styles/ClipLoaderStyles'
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

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
    
    const { sport_id, date } = useParams<{ sport_id: string, date: string }>(); // get sport_id from url
    
    // const location = useLocation();
    // const date = location.state?.date;

    // console.log(date);
    // console.log(typeof(date));

    useEffect(() => {
      if (sport_id && date) {
        getSportData(sport_id, date)
          .then(data => setSport(data))
          .catch(err => console.log(err));
      }
    }, [sport_id, date]);
    
    const typesName: string[] = [];
    for (const t of sport.sport_types) {
      typesName.push(t.type_name);
    }
    
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
      
    const handleCountrySelect = (country: string, index: number, id: string) => {
      console.log(country);
      // Update the selected country value for the specified index in selectedCountriesValues array
      setSelectedCountriesValues(prevValues =>
        prevValues.map((prevValue, i) => (i === index ? country : prevValue))
      );
    
      // Update the selectedCountries array of objects
      setSelectedCountries(prevCountries => {
        try {
          // Filter out the object with the same id as the one being updated
          const newCountries = prevCountries.filter(c => c.id !== id);
          // Append the new country object with the provided id and country name
          return [...newCountries, { id, country }];
        } catch (error: any) {
          // Log the error message and return the previous state in case of an error
          console.error(error.message);
          return prevCountries;
        }
      });
    };
    

    useEffect(() => {
      setSelectedCountriesValues(serviceList.map(() => ""));
    }, [selectedType]); 
      
    const RecordButtonClick = async () => {
      const medalValues = serviceList.map((service, index) => {
          // Convert service.id to a string if it's not already, to match the type in selectedCountries
          console.log(selectedCountries);
          const id = index + 1;
          const country = selectedCountries.find(country => country.id == service.id)?.country;
  
          const medal1Value = (document.getElementById(`input1-${id}`) as HTMLInputElement)?.value || '0';
          const medal2Value = (document.getElementById(`input2-${id}`) as HTMLInputElement)?.value || '0';
          const medal3Value = (document.getElementById(`input3-${id}`) as HTMLInputElement)?.value || '0';

          const medal1 = parseFloat(medal1Value);
          const medal2 = parseFloat(medal2Value);
          const medal3 = parseFloat(medal3Value);

          if (isNaN(medal1) || isNaN(medal2) || isNaN(medal3) || 
              !Number.isInteger(medal1) || !Number.isInteger(medal2) || !Number.isInteger(medal3)) {
              ErrorPopup("Medal values must be whole numbers");
          } else {
              // Convert to integer if validation passes
              const medal1Int = parseInt(medal1Value, 10);
              const medal2Int = parseInt(medal2Value, 10);
              const medal3Int = parseInt(medal3Value, 10);
              
              return {
                country,
                medal: {
                    gold: medal1Int,
                    silver: medal2Int,
                    bronze: medal3Int
                }
            };
          }
  
          
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
              if (selectedType === "Select Sport Type...") {
                ErrorPopup("You didn't select any sport type");
              } else {
                filteredMedalValues.map((item) => {
                  if (item.country == null){
                      ErrorPopup("Please select country");
                  }
                })
              }  
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
      // First, find the index of the service to remove
      const indexToRemove = serviceList.findIndex(service => service.id === serviceId);
      
      // If the serviceId is not found in the serviceList, we shouldn't attempt to remove anything
      if (indexToRemove === -1) {
        console.error('Service ID not found:', serviceId);
        return; // Exit the function early
      }
    
      // Update serviceList by filtering out the service with the serviceId
      setServiceList(prevServiceList => prevServiceList.filter((_, index) => index !== indexToRemove));
    
      // Update selectedCountries by filtering out the country with the serviceId
      setSelectedCountries(prevCountries => prevCountries.filter(country => country.id !== serviceId));
    
      // Update medalValuesList by removing the entry at the same index as the removed service
      setMedalValuesList(prevMedalValues => prevMedalValues.filter((_, index) => index !== indexToRemove));
    
      // If you have another state like selectedCountriesValues that is indexed in parallel and needs to be updated
      setSelectedCountriesValues(prevValues => prevValues.filter((_, index) => index !== indexToRemove));
    };
    
    return (
        <>

        {loading ? (
            <div style={loaderContainerStyle}>
              <ClipLoader
                color="#a6a6a6"
                cssOverride={override}
                size={100}
              />
            </div>
            ) : (
              <div>
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
                                    <Fragment key={service.id}>
                                      <RecordInputRow
                                        id={String(index + 1)}
                                        countriesLst={participatingCountries} // replace emptyLst with actual countries list if available
                                        medalValues={medalValuesList[index]}
                                        selectedCountry={selectedCountriesValues[index]}
                                        onButtonClick={(event: { stopPropagation: () => void; }) => {
                                          event.stopPropagation();
                                          RemoveRow(service.id);
                                        }}
                                        onCountrySelect={(country: string) => handleCountrySelect(country, index, service.id)}
                                        onMedalInputChange={(inputName: string, value: string) => handleMedalInputChange(index, inputName, value)}
                                        isNewRowAdded={isNewRowAdded && index === serviceList.length - 1}
                                      />
                                    </Fragment>
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
              </div>
            )}
        </>
    )
}