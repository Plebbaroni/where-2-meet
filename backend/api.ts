import {
TimeMapRequestArrivalSearch,
TimeMapRequestDepartureSearch,
TransportationRequestCommons,
TransportationType,
TravelTimeClient,
TimeMapRequestUnionOrIntersection,
} from 'traveltime-api';
import * as dotenv from 'dotenv'

dotenv.config()

if (
    process.env["TRAVELTIME_APPLICATION_ID"] === undefined ||
    process.env["TRAVELTIME_APPLICATION_ID"] === ""
) {
    console.log("NO APPLICATIONID");
    process.exit(1);
}

if (
    process.env["TRAVELTIME_API_KEY"] === undefined ||
    process.env["TRAVELTIME_API_KEY"] === ""
) {
    console.log("NO API KEY");
    process.exit(1);
}

const travelTimeClient = new TravelTimeClient({
    applicationId: process.env["TRAVELTIME_APPLICATION_ID"],
    apiKey: process.env["TRAVELTIME_API_KEY"],
});

class api {
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
            return data.results[0].shapes;
        } catch (e) {
            throw (e);
        }
    };
}

const test = new api();

// async function testStuff() {
//     // const data22 = await test.geocode("5 Gilmore Street, Cabramatta");

//     // const BITCH = await test.generateTimeMapRequestDepartureSearch("5 Gilmore Street, Cabramatta", "public_transport", 30, "1")
//     // console.log(BITCH);
//     // const data1 = await test.generateIsochrones(BITCH);

//     const FUCK: TimeMapRequestDepartureSearch = await test.generateTimeMapRequestDepartureSearch("5 Gilmore Street, Cabramatta", "public_transport", 30, "1")

//     const SHIT: TimeMapRequestDepartureSearch = {
//         id: '2',
//         departure_time: new Date().toISOString(),
//         travel_time: 30 * 60,
//         coords: { lat: -34.00, lng: 151.00 },
//         transportation: { type: "public_transport" },
//         properties: ['is_only_walking'],
//     };

//     let addresses : TimeMapRequestDepartureSearch[] = [];
//     addresses.push(FUCK);
//     addresses.push(SHIT);

//     const dataFUCK = await test.generateIntersection(addresses);
//     console.log(dataFUCK);


//     // console.log(data22);
//     // console.log(data1);
// }

//testStuff();

export default new api();
