import pyramidIcon from "../assets/react.svg";
import classes from './TransportType.module.css';
import {useState} from 'react';

function TransportType({type, setType}) {
  function toggleDropdown() {
    const [open, setOpen] = useState(false);


    return (
      <div onClick={() => setOpen(!open)} className={classes.dropdownToggle}>
        {open &&
          <div className={classes.dropdownSelection}>
            <div onClick={() => setType("public_transport")} className={type == "public_transport" ? classes.selectedDropdown : classes.dropdownOption}>
              <p>Public Transport</p>
            </div>
            <div onClick={() => setType("driving")} className={type == "driving" ? classes.selectedDropdown : classes.dropdownOption}>
              <p>Driving</p>
            </div>
            <div onClick={() => setType("walking")} className={type == "walking" ? classes.selectedDropdown : classes.dropdownOption}>
              <p>Walking</p>
            </div>
            <div onClick={() => setType("cycling")} className={type == "cycling" ? classes.selectedDropdown : classes.dropdownOption}>
              <p>Cycling</p>
            </div>
          </div>
        }

        {!open && 
          <div className={classes.dropdownSelection}>
            {type == "cycling" && <div className={classes.selectedDropdown}>
              Cycling
            </div>}
            {type == "driving" && <div className={classes.selectedDropdown}>
              Driving
            </div>}
            {type == "public_transport" && <div className={classes.selectedDropdown}>
              Public Transport
            </div>}
            {type == "walking" && <div className={classes.selectedDropdown}>
              Walking
            </div>}
          </div>
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