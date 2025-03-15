import { MapPinIcon } from "@heroicons/react/24/outline";
import classes from './Sidebar.module.css';

export type SidebarProps = {
	profileImage: string;
};

function Sidebar(props?: SidebarProps) {

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
	</div>

    </aside>
  );
}

export default Sidebar;