import Swal from 'sweetalert2';
import incorrect_icon from '../assets/images/referite_icon/incorrect_icon.png';
import warning_icon from '../assets/images/referite_icon/warning_icon.png'
import complete_icon from '../assets/images/referite_icon/complete_icon.png'
import { UpdateToIOC } from "../assets/services/RecordMedal";
import '../styles/PopUps.css';


function findTypeIdByTypeName(typeName: string, sportTypes: any) {
    for (const item of sportTypes) {
        if (item.type_name === typeName) {
            return item.type_id;
        }
    }
    return null; // Return null if no matching type_name is found
}


// error popup
export function ErrorPopup (message: string) {
    Swal.fire({
        title: `<span class="incorrect-title-class" style="color: #b04d4c; font-size: 3vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> Incorrect Condition! </span>`,
        html: `<span style="font-size: 1.7vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> ${message} </span>`,
        iconHtml: `<img src="${incorrect_icon}" alt="Custom Icon" style="width: auto; max-width: 100px; height: auto;">`,
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#b04d4c',
        customClass: {
            icon: 'no-border',
            popup: 'popup-icon',
            confirmButton: 'my-swal-button', 
            cancelButton: 'my-swal-button'
        }
      });
}


// confirmation popup
export function ConfirmationPopup (medalValues: any, sport:any, selectedType: string, sport_id: any) {
    let medalsHtml = medalValues.map((item: any) => `
            <div style="font-size: 1.7vw; font-family: 'TH SarabunPSK'; font-weight: bold;">
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
                        <span style="color: #4d5499; font-size: 2.5vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> 
                            Sport: 
                        </span> 
                        <span style="font-size: 1.7vw; font-family: 'TH SarabunPSK';"> ${sport.sport_name} </span> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style="color: #4d5499; font-size: 2.5vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> 
                            Event: 
                        </span> 
                        <span style="font-size: 1.7vw; font-family: 'TH SarabunPSK';"> ${selectedType} </span> 
                    </p>
                    <div style="overflow-y: auto; max-height: 15vh">
                        ${medalsHtml}
                    </div>
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
                    container: 'confirmation-popup-container',
                    confirmButton: 'my-swal-button', 
                    cancelButton: 'my-swal-button'
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (sport_id) {
                        const type_id = findTypeIdByTypeName(selectedType, sport.sport_types);
                        console.log(medalValues);
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


// warning popup
export function WarningPopup (message: string, medalValues: any, sport:any, selectedType: string, sport_id: any) {
    Swal.fire({ 
        title: `<span style="color: #de9f00; font-size: 3vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> Warning! </span>`,
        html: ` <span style="font-size: 1.7vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> ${message} </span>`,
        iconHtml: `<img src="${warning_icon}" alt="Custom Icon"  style="width: auto; max-width: 100px; height: auto;">`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#4d5499',
        customClass: {
            icon: 'no-border',
            popup: 'popup-icon',
            confirmButton: 'my-swal-button', 
            cancelButton: 'my-swal-button'
          }
    }).then(async (result) => {
        if (result.isConfirmed) {
            ConfirmationPopup(medalValues, sport, selectedType, sport_id);
        } 
    });
}


// success popup
export function successPopup (status: number) {
    if (status === 200) {
        Swal.fire({
            iconHtml: `<img src="${complete_icon}" alt="Custom Icon" style="width: auto; max-width: 100px; height: auto;">`,
            title: `<span style="color: #363b7a; font-size: 3vw; font-family: 'TH SarabunPSK'; font-weight: bold;"> Recorded Successfully! </span>`,
            showConfirmButton: false,
            width: '35vw',
            timer: 1500,
            customClass: {
                popup: 'popup-icon'
            }
        });
        // Set a timeout to reload the page after the popup closes
        setTimeout(() => {
            window.location.reload();
        }, 1600); // Delay slightly longer than the popup timer
    }
}