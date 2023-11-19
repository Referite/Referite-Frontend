import Swal from 'sweetalert2';
import { useEffect } from 'react';

interface PopupElements {
    title: any, 
    html: any; 
}

const RecordConfirmation = ({ title, html }: PopupElements) => {
    useEffect(() => {
      Swal.fire({
        title,
        html, 
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      });
    }, [title, html]);
  
    return null;
  };
  
export default RecordConfirmation;
