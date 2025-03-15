import { MapPinIcon } from "@heroicons/react/24/outline";
import classes from './Sidebar.module.css';
import { AddressForm } from "../AddressForm/AddressForm";
import { useState } from "react";

export type SidebarProps = {
	profileImage: string;
};

function Sidebar(props?: SidebarProps) {
	// const [address, setAddress] = useState("");
	const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  	return (
		<aside className={classes.container}>
			<div className="">
				<MapPinIcon className={classes.icon}></MapPinIcon>
			</div>
			<div className="">
				<p>
					collapse
				</p>
				<p>
					transport type
				</p>
				<p>
					time taken
				</p>
				<p>
					addresses
				</p>
				<p>
					button
				</p>
				<AddressForm
					// placeholder="	High Street, Sydney, New South Wales, 2052, Australia"
					// name="address"
					// onChange={setAddress}
					// error={false}
					onPlaceSelect={setSelectedPlace}
				></AddressForm>
			</div>

		</aside>
	);
}

export default Sidebar;