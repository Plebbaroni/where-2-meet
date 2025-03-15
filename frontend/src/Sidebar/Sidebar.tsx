import { ChevronDoubleRightIcon, MapPinIcon, ArrowTurnDownRightIcon } from "@heroicons/react/24/outline";
import classes from './Sidebar.module.css';
//import { AddressForm } from "../AddressForm/AddressForm";
import { useState, useEffect } from "react";
import { AddressForm } from "../AddressForm/AddressForm";
import Button, { ButtonIcons } from "../Button/Button";
import InputBlock from "../InputBlock/InputBlock";

type InputType = {
	location:string;
	transportationType:string;
	maxTravelTime: number;
	idx: number;
}

function Sidebar({ inputForms, addInputBlock, updateInputBlock, onSubmit }) {
	// const [address, setAddress] = useState("");
	// const [selectedPlace, setSelectedPlace] =
    // useState<google.maps.places.PlaceResult | null>(null);
	// const [isClicked, setIsClicked] = useState(false);
	// const [locations, setLocations] = useState<LocationData | {}>({});
	//const [inputForms, setInputForms] = useState<InputType[]>([{location: '', transportationType: 'public_transport', maxTravelTime: 0, idx:0}]);
	// const fillBar = (result:string) => {
	// 	setInput(result);
	// 	setLocations([]);
	// 	setIsClicked(true)
	// }

	// if (
	// 	import.meta.env.VITE_GOOGLE_MAPS_KEY === undefined ||
	// 	import.meta.env.VITE_GOOGLE_MAPS_KEY === ""
	//   ) {
	// 	console.log("NO GOOGLE KEY");
	// 	process.exit(1);
	//   }

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

	// const handleInputChange = (
	// 	e: React.ChangeEvent<HTMLInputElement>,
	// 	index: number,
	// 	field: keyof InputType
	//   ) => {
	// 	const updateForms = [...inputForms];
	// 	if (!updateForms) {
	// 		return;
	// 	}
	// 	updateForms[index][field] = e.target.value;
	// 	setInputForms(updateForms);
	//   };
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submitted");
		onSubmit(inputForms); 
	  };

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
			<div className={classes.inputBlocks}>
			<form className={classes.form} onSubmit={handleSubmit}>
				{inputForms.map((form) => (
					<InputBlock
					key={form.idx}
					idx={form.idx}
					location={form.location}
					maxTravelTime={form.maxTravelTime}
					transportType={form.transportationType}
					onUpdate={updateInputBlock}
					/>
				))}

				<div className={classes.plus}>
					<Button
						icon={ButtonIcons.Plus}
						type="button"
						onClick={addInputBlock}
					></Button>
					<Button
						icon={ButtonIcons.EnterRight}
						type="submit"
					></Button>
			</div>
			</form>
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