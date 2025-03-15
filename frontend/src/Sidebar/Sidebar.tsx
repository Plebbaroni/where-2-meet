import { ChevronDoubleRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import classes from './Sidebar.module.css';
import { AddressForm } from "../AddressForm/AddressForm";
import { useState } from "react";
import Button, { ButtonIcons } from "../Button/Button";

function Sidebar() {
	// const [address, setAddress] = useState("");
	// const [selectedPlace, setSelectedPlace] =
    // useState<google.maps.places.PlaceResult | null>(null);

  	return (
		<aside className={classes.container}>
			<div className={classes.header}>
				<MapPinIcon className={classes.icon}></MapPinIcon>
				<p className={classes.title}>Where to Meet</p>
				<Button
					icon={ButtonIcons.LeftChevrons}
					type="button"
				></Button>
			</div>
			<div className="inputs">
				
				<p>
					transport type
				</p>
				<p>
					time taken
				</p>
				<p>
					addresses
				</p>
				<div className={classes.plus}>
					<Button
						icon={ButtonIcons.Plus}
						type="button"
					></Button>
				</div>
				
				{/* <AddressForm
					// placeholder="	High Street, Sydney, New South Wales, 2052, Australia"
					// name="address"
					// onChange={setAddress}
					// error={false}
					onPlaceSelect={setSelectedPlace}
				></AddressForm> */}
			</div>

		</aside>
	);
}

export default Sidebar;