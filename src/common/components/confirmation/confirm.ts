import Swal from "sweetalert2";

interface IProps{
    actionTitle: string,
    resolveFn?: () => void
}

const confirmSuccess = ({actionTitle, resolveFn}: IProps) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: `${actionTitle} Successfully!`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
         if(resolveFn) resolveFn();
      });
}

const confirmError = ({actionTitle, resolveFn}: IProps) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: `${actionTitle} Failed!`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if(resolveFn) resolveFn();
      });
}

export {confirmError, confirmSuccess};