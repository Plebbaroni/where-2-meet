import classes from './Recommendations.module.css';
import Button, { ButtonIcons } from "../Button/Button";
import { Place } from "../Map/Map";

type RecommendationsProps = {
  places: Place[];
}

function Recommendations(props: RecommendationsProps) {
	const places = Array.isArray(props.places) ? props.places : [];
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
		  {places.map((x, index) => (
			<li key={index} className={classes.rec}>
			  {x.displayName.text}
			</li>
		  ))}
		</ul>
	  </aside>
	);
}

export default Recommendations;