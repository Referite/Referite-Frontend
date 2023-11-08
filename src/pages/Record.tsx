import Sidebar from "../components/SideBar";
import RecordInputRow from "../components/RecordInputRow";
import '../styles/Record.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSportData } from '../assets/services/SportsDetails'
import { getMessage, UpdateToIOC } from "../assets/services/RecordMedal";
import incorrect_icon from '../assets/images/referite_icon/incorrect_icon.png';
import warning_icon from '../assets/images/referite_icon/warning_icon.png'
import complete_icon from '../assets/images/referite_icon/complete_icon.png'
import Swal from 'sweetalert2';

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

interface SelectedCountry {
    id: number;
    country: string;
}
  
  export default function Record () {
    // load data
    
    const { sport_id } = useParams<{ sport_id: string }>(); // get sport_id from url

    // get sport type
    const [sport, setSport] = useState<SportData>({
        sport_name: '',
        sport_types: []
    });

    useEffect(() => {
        if (sport_id) {
            getSportData(sport_id).then(data => setSport(data)).catch(err => console.log(err));
    }
    }, [sport_id]);

    const typesName: string[] = [];

    for (const t of sport.sport_types) {
        typesName.push(t.type_name);
    }

    // show compettion date and participant countries count
    var [selectedType, setSelectedType] = useState('');

    const handleChangeType = (e: any) => {
        setSelectedType(e.target.value);
    };

    // get participants countries list
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

    // popup

    // error popup

    function ErrorPopup (message: string) {
        Swal.fire({
            title: `<span class="incorrect-title-class" style="color: #b04d4c; font-size: 3vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> Incorrect Condition! </span>`,
            html: ` <span> ${message} </span>`,
            iconHtml: `<img src="${incorrect_icon}" alt="Custom Icon"  style="width: 6vw;">`,
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#b04d4c',
            customClass: {
                icon: 'no-border'
              }
          });
    }

    function WarningPopup (message: string, medalValues: any) {
        Swal.fire({ 
            title: `<span style="color: #de9f00; font-size: 3vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> Warning! </span>`,
            html: ` <span> ${message} </span>`,
            iconHtml: `<img src="${warning_icon}" alt="Custom Icon"  style="width: 6vw;">`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm',
            confirmButtonColor: '#4d5499',
            customClass: {
                icon: 'no-border'
              }
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (sport_id) {
                    const type_id = findTypeIdByTypeName(selectedType, sport.sport_types);
                    const iocBody = {
                      sport_id: parseInt(sport_id),
                      sport_type_id: type_id,
                      participants: medalValues
                    };
                    const status = await UpdateToIOC(iocBody);
                    successPopup(status);
                  } else {
                    // Handle the case where sport_id is undefined
                    console.error("sport_id is undefined");
                  }
            } 
        });
    }

    function successPopup (status: number) {
        if (status === 200) {
            Swal.fire({
                iconHtml: `<img src="${complete_icon}" alt="Custom Icon"  style="width: 6vw;">`,
                title: `<span style="color: #363b7a; font-size: 3vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> Recorded Successfully! </span>`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    // duplicate country
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

    function findTypeIdByTypeName(typeName: string, sportTypes: any) {
        for (const item of sportTypes) {
            if (item.type_name === typeName) {
                return item.type_id;
            }
        }
        return null; // Return null if no matching type_name is found
    }

    
    // button functions
    
    // record Medal button
    const [selectedCountries, setSelectedCountries] = useState<SelectedCountry[]>([]);

    const handleCountrySelect = (country: string, id: number) => {
        setSelectedCountries(prevCountries => {
            try {
                const newCountries = prevCountries.filter(c => c.id !== id);
    
                if (newCountries.some(c => c.country === country)) {
                    ErrorPopup(`You have selected the same country`);
                }
    
                return [...newCountries, { id, country }];
    
            } catch (error: any) {
                console.error(error.message);
                return prevCountries;
            }
        });
    };
    
    const RecordButtonClick = async () => {
        const medalValues = serviceList.map((_, index) => {
            const id = index + 1;
            const country = selectedCountries.find(country => country.id == index + 1)?.country;
    
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
    
        const jsonString = {
            sport_name: sport.sport_name,
            participants: medalValues
        };
        try {
            if (hasDuplicateCountries(jsonString.participants) == true) {
                throw new Error("You have selected the same country");
            } else if (hasNegativeMedal(jsonString.participants) == true) {
                throw new Error("Medal values cannot be negative");
            }
            const msg: any = await getMessage(jsonString);
            if (msg.data.hasOwnProperty("Monosport")) {
                if (msg.data.hasOwnProperty("Warning")) {
                    const mono_warning_msg = "There are only 1 country in this medal allocation. " + msg.data.Warning;
                    WarningPopup(mono_warning_msg, medalValues);
                } else {
                    WarningPopup(msg.data.Monosport, medalValues);
                }
            }
            else if (msg.data.hasOwnProperty("Warning")) {
                WarningPopup(msg.data.Warning, medalValues);
            } else {
                let medalsHtml = medalValues.map((item) => `
                <div>
                    <span> ${item.country}: </span>&nbsp;&nbsp;
                    <span>Gold: ${item.medal.gold}</span>&nbsp;
                    <span>Silver: ${item.medal.silver}</span>&nbsp;
                    <span>Bronze: ${item.medal.bronze}</span>
                </div>
            `).join('');
                Swal.fire({ 
                    title: `<span style="color: #4d5499; font-size: 3vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> Carefully Check! </span>`,
                    html: `
                        <p> 
                            <span style="color: #4d5499; font-size: 2vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> 
                                Sport: 
                            </span> 
                            ${sport.sport_name} 
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="color: #4d5499; font-size: 2vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> 
                                Event: 
                            </span> 
                            ${selectedType}
                        </p>
                        ${medalsHtml}
                        <br><br>
                        <span style="color: red; font-size: 1.5vw; font-family: 'TH SarabunPSK';"> 
                            After confirmation, any medal changes require contacting the IOC.
                        </span>
                    `,
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Confirm',
                    confirmButtonColor: '#4d5499',
                    customClass: {
                        container: 'confirmation-popup-container'
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        if (sport_id) {
                            const type_id = findTypeIdByTypeName(selectedType, sport.sport_types);
                            const iocBody = {
                              sport_id: parseInt(sport_id),
                              sport_type_id: type_id,
                              participants: medalValues
                            };
                            const status = await UpdateToIOC(iocBody);
                            successPopup(status);
                          } else {
                            // Handle the case where sport_id is undefined
                            console.error("sport_id is undefined");
                          }
                    } 
                });
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
                    const errorMessage = error.response.data.detail;
                    ErrorPopup(errorMessage); 
                } else if (error.response.status === 422) {
                    console.log("Error 422 occurred");
                    medalValues.map((item) => {
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
    
    // add country button
    const [serviceList, setServiceList] = useState([
        { service: '' },
        { service: '' },
        { service: '' }
        
    ]);

    const AddMoreCountry = () => {
        setServiceList([...serviceList, { service: '' }])
        setRecordInputRowCounter(prevCounter => prevCounter + 1); // Increment the counter
    }

    // row remove button
    const RemoveRow = (index: number, id: number) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    
        setSelectedCountries(prevCountries => {
            const updatedCountries = prevCountries.filter(c => c.id !== id);
            return updatedCountries;
        });
    }
    
    // add id to components
    const [, setRecordInputRowCounter] = useState(0);

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
                            {serviceList.map((_singleService, index) => (
                            <RecordInputRow 
                                key={`input${index + 1}`} 
                                countriesLst={participatingCountries} 
                                onButtonClick={() => RemoveRow(index, index+1)} 
                                onCountrySelect={handleCountrySelect} 
                                id={String(index + 1)}                           
                            />
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
                    <input 
                        type="button" 
                        value="Record Medal" 
                        className="record-button"         
                        onClick={RecordButtonClick}            
                    />
                </div>
            </div>
        </>
    )
}