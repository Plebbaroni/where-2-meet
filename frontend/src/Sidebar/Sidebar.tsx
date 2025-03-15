import { MapPinIcon } from "@heroicons/react/24/outline";
import classes from './Sidebar.module.css';
//import { AddressForm } from "../AddressForm/AddressForm";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

export type SidebarProps = {
	profileImage: string;
};

function Sidebar(props?: SidebarProps) {
	// const [address, setAddress] = useState("");
	// const [selectedPlace, setSelectedPlace] =
    // useState<google.maps.places.PlaceResult | null>(null);
	// const [isClicked, setIsClicked] = useState(false);
	// const [locations, setLocations] = useState<LocationData | {}>({});
	// const [input, setInput] = useState("");
	// const fillBar = (result:string) => {
	// 	setInput(result);
	// 	setLocations([]);
	// 	setIsClicked(true)
	// }

	if (
		import.meta.env.VITE_GOOGLE_MAPS_KEY === undefined ||
		import.meta.env.VITE_GOOGLE_MAPS_KEY === ""
	  ) {
		console.log("NO GOOGLE KEY");
		process.exit(1);
	  }

	//const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;

	// this google API is scary man
	// const getLocations = debounce (async (input:string) => {
	// 	const response = await fetch(
	// 		`http://localhost:5180/backend/autocomplete`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			credentials: "include",
	// 			body: JSON.stringify({ input }),
	// 		}
	// 	);
	// 	if (!response) {
	// 		console.error('null');
	// 		return;
	// 	}
	// 	const data = await response.json();
	// 	setLocations(data);
	// }, 500);

	// useEffect(() => {
	// 	getLocations(input);
	// },[input, getLocations])

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
				<div className={classes.inputBar}>
					<input type="text" name="" id="" className={classes.inputText} value={input} onChange={(e) => setInput(e.target.value)}  onKeyDown={(e) => {
						}} placeholder="Your Location"/>
						{/* {locations.length > 0 && !isClicked && (
							<ul className={classes.resultsList}>
							{locations.suggestions.map((index) => (
								<li key={index} className={classes.resultItem} onClick={() => fillBar(index.placePrediction.text)}>
								{index.placePrediction.text}
								</li>
							))}
							</ul>
						)} */}
				</div>
			</div>

		</aside>
	);
}

export default Sidebar;

/*

import classes from "./InputBar.module.css"
import birds from "./birds.json"
import { useState, useEffect} from "react";

interface InputBarProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  results: string[];
  setResults: React.Dispatch<React.SetStateAction<string[]>>;
  handleGuess: (guess:string) => void;
}


function InputBar({ input, setInput, results, setResults, handleGuess }:InputBarProps) {

  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (input.length >= 2) {
      const lowerQuery = input.toLowerCase();
      lowerQuery.concat('  ');
      const res = Object.keys(birds).filter(bird => bird.toLowerCase().includes(lowerQuery));
      setResults(res);
      setIsClicked(false);
    } else {
      setResults([]);
    }
  }, [input, setResults]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseInput = input.trim().toLowerCase();
    const birdExists = Object.keys(birds).find((bird) => bird.toLowerCase() === lowerCaseInput);
    if (birdExists) {
        const guessId = birds[birdExists];
        const results = await fetch(`http://localhost:5181/api/guess`, 
          {
            method: 'POST', 
            credentials: "include", 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({birdId: guessId})});
        const resultsJSON = await results.json();
        handleGuess(resultsJSON);
    }
}

  const fillBar = (result:string) => {
    setInput(result);
    setResults([]);
    setIsClicked(true)
  }

  return (  
    <div className={classes.wrapper}>
        <div className={classes.inputBar}>
          <input type="text" name="" id="" className={classes.inputText} value={input} onChange={(e) => setInput(e.target.value)}  onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }} placeholder="Enter Your Guess Here"/>
          {results.length > 0 && !isClicked && (
            <ul className={classes.resultsList}>
              {results.map((result, index) => (
                <li key={index} className={classes.resultItem} onClick={() => fillBar(result)}>
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>
  )
}

export default InputBar
*/