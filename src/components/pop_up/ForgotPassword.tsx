import Swal from "sweetalert2";

interface PopupElements {
    title: any, 
    html: any; 
}

function ForgotPassword({ title, html }: PopupElements) {
    Swal.fire({
        title,
        html,
        confirmButtonText: 'OK',
        width: '400px',
    });
}

export default ForgotPassword;