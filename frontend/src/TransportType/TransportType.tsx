import pyramidIcon from "../assets/react.svg";
import classes from './TransportType.module.css';
import {useState} from 'react';

function TransportType(props?: TransportTypeProps) {
  function toggleDropdown() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("public_transport");

    const methods = ["public_transport", "driving", "walking", "cycling"];

    function methodDisplayString(method: string) {
      if (method === "public_transport") {
        return "Public Transport";
      }
      else {
        return String(method).charAt(0).toUpperCase() + String(method).slice(1);
      }
    }

    return (
      <div onClick={() => setOpen(!open)} className={classes.dropdownToggle}>
        {open && methods.map(method => (
            <div onClick={() => setType(method)} className={type == method ? classes.selectedDropdown : classes.dropdownOption}>
              {methodDisplayString(method)}
            </div>))
        }

        {!open && methods.map(method => (
          type == method && 
          <div className={classes.selectedDropdown}>
            {methodDisplayString(method)}
          </div>))
        }

      </div>
      );
  }

  return (
    <div className={classes.container}>
        <div className={classes.dropdown}>
            {toggleDropdown()}
        </div>
    </div>
  );


}

export default TransportType;