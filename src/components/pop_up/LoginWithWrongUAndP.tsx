import Swal from "sweetalert2";

interface PopupElements {
    title: any, 
    html: any; 
}

function LoginWithWrongUAndP({ title, html }: PopupElements) {
    Swal.fire({
        title,
        html,
        confirmButtonText: 'OK',
        width: '400px',
    });
};

export default LoginWithWrongUAndP;