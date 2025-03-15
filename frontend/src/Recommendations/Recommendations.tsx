import classes from './Recommendations.module.css';
import Button, { ButtonIcons } from "../Button/Button";
import { Place } from "../Map/Map";

type RecommendationsProps = {
  places: Place[];
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
				{props.places.map(x => <li className={classes.rec}
          >{x.displayName.text}
        </li>)}
			</ul>

		</aside>
	);
}

export default Recommendations;