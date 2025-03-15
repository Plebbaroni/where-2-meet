import {
TimeMapRequestArrivalSearch,
TimeMapRequestDepartureSearch,
TransportationRequestCommons,
TransportationType,
TravelTimeClient,
TimeMapRequestUnionOrIntersection,
} from 'traveltime-api';
import { Loader } from "@googlemaps/js-api-loader"
import * as dotenv from 'dotenv'

dotenv.config()

if (
    process.env["TRAVELTIME_APPLICATION_ID"] === undefined ||
    process.env["TRAVELTIME_APPLICATION_ID"] === ""
) {
    console.log("NO APPLICATION ID");
    process.exit(1);
}

if (
    process.env["TRAVELTIME_API_KEY"] === undefined ||
    process.env["TRAVELTIME_API_KEY"] === ""
) {
    console.log("NO API KEY");
    process.exit(1);
}

if (
    process.env["GOOGLE_MAPS_KEY"] === undefined ||
    process.env["GOOGLE_MAPS_KEY"] === ""
) {
    console.log("NO GOOGLE KEY");
    process.exit(1);
}

const travelTimeClient = new TravelTimeClient({
    applicationId: process.env["TRAVELTIME_APPLICATION_ID"],
    apiKey: process.env["TRAVELTIME_API_KEY"],
});

const google_key:string = process.env["GOOGLE_MAPS_KEY"];
class api {

    async autocomplete(input:string) {
        try {
            const body = {
                "input": input,
            }

            const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": google_key,
                    "X-Goog-FieldMask": "suggestions.placePrediction.text"
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                console.error(`Error: ${response.status} - ${await response.text()}`);
            }
            const data = await response.json();
            return data;
        } catch (e) {
            throw e;
        }
    }
    //input: address
    //ouput: longitude and latitute of first result
    async geocode(address : string) {
        try {
            const data = await travelTimeClient.geocoding(address);
            return data.features[0].geometry.coordinates;
        } catch (e) {
            throw e;
        }
    };


    //inputs: TimeMapDepartureSearch (see generateTimeMapDepartureSearch() for how to generate these)
    //output: isochrone for one location
    async generateIsochrones(address : TimeMapRequestDepartureSearch) {
        try {
            const data = await travelTimeClient.timeMap({departure_searches: [address],});
            return data.results[0].shapes;
        } catch (e) {
            throw (e);
        }
        travelTimeClient.timeMap({
        departure_searches: [address],
        }).then((data) => {
            return data.results[0].shapes;
        })
        .catch((e) => console.error(e));
    };

    //input: address (as a string, formatting doesn't matter too much just don't go crazy style. I.e specify an address, suburb, city, country)
    //input: transport type from list of allowable transport types: walking, public_transport, driving, cycling
    //input: time (allowable travel time in minutes)
    //input: id (assign each TimeMapRequestDepartureSearch a unique id when using generate intersections)
    //output: TimeMapRequestDepartureSearch
    async generateTimeMapRequestDepartureSearch(address : string, transport : TransportationType, time : number, id : string) {
        const data1 = await test.geocode(address);

        const longitude: number = data1[0];
        const latitute: number = data1[1];
        let coordinates : number[] = [];
        coordinates.push(latitute);
        coordinates.push(longitude);

        const departure_search: TimeMapRequestDepartureSearch = {
            id: id,
            departure_time: new Date().toISOString(),
            travel_time: time * 60,
            coords: { lat: coordinates[0], lng: coordinates[1] },
            transportation: { type: transport },
            properties: ['is_only_walking'],
        };

        return departure_search;
    }

    //input: list of TimeMapDepartureSearch (list of locations, see generateTimeMapRequestDepartureSearch for more info)
    //output: intersection of the isochrones for every location
    async generateIntersection(addresses : TimeMapRequestDepartureSearch[]) {
        let IDs : string[] = [];
        addresses.forEach(function(item) {
            IDs.push(item["id"]);
        });
        const intersection: TimeMapRequestUnionOrIntersection = {
            id: 'intersection of isochrones',
            search_ids: IDs,
          }

        try {
            const data = await travelTimeClient.timeMap({departure_searches: addresses, intersections: [intersection],});
            return data.results;
        } catch (e) {
            throw (e);
        }
    };

    async googlePlaces(coordinates : number[]) {
        const requestBody = {
            includedTypes: [
                "restaurant",
                "amusement_park",
                "cafe",
                "shopping_mall",
                "park",
                "movie_theater",
                "bowling_alley",
                "zoo",
                "art_gallery",
                "campground",
                "museum",
            ],
            maxResultCount: 10,
            locationRestriction: {
                circle: {
                    center: {
                        //still assuming coordinates are flipped here
                        latitude: coordinates[1],
                        longitude: coordinates[0]
                    },
                    radius: 500.0
                }
            }
        };

        try {
            const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": google_key,
                    "X-Goog-FieldMask": "places.displayName,places.location,places.primaryType"
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${await response.text()}`);
            }
            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}


const test = new api();

//     async function testStuff() {
//         
//     }

// testStuff();

export default new api();
