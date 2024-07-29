import Swal from "sweetalert2";

interface IProps{
    actionTitle: string
}

const confirmSuccess = ({actionTitle}: IProps) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: `${actionTitle} Successfully!`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        //setShowConfirmation(false);
      });
}

const confirmError = ({actionTitle}: IProps) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: `${actionTitle} Failed!`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        //setShowConfirmation(false);
      });
}

export {confirmError, confirmSuccess};