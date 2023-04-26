import { ErrorIcon, ModalCheck } from "../../assets/svgs";
import { toast } from "react-toastify";
import "./index.css";

export function success(title, text) {
  return toast.success(
    <div className="row">
    <div className="col-2">
      <ModalCheck className="mr-3 check" />
    </div>
    <div className="col-10">
      <span className="pop-title"> {title} </span>
      <p className="pop-text p-0 m-0">{text}</p>
    </div>
  </div>
  );
}

export function error(title, text) {
  return toast.error(
    <div className="row">
      <div className="col-2">
        <ErrorIcon className="mr-3" />
      </div>
      <div className="col-10">
        <span className="pop-title"> {title} </span>
        <p className="pop-text p-0 m-0">{text}</p>
      </div>
    </div>
  );
}
