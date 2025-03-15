import { ChevronDoubleRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import classes from './Recommendations.module.css';
import { AddressForm } from "../AddressForm/AddressForm";
import { useState } from "react";
import Button, { ButtonIcons } from "../Button/Button";
import { Place } from "../Map/Map";

type RecommendationsProps = {
  points: Place[];
}

function Recommendations(props: RecommendationsProps) {
  return (
		<aside className={classes.container}>
			<div className={classes.header}>
				<Button
					icon={ButtonIcons.RightChevrons}
					type="button"
				></Button>
				<p className={classes.title}>Hangouts</p>
			</div>
			<ul className="hangouts">
				{props.points.map(x => <li className={classes.rec}
          >{x.displayName.text}
        </li>)}
			</ul>

		</aside>
	);
}

export default Recommendations;