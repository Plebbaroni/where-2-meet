import {
TimeMapRequestArrivalSearch,
TimeMapRequestDepartureSearch,
TransportationRequestCommons,
TransportationType,
TravelTimeClient
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

        //Converted into try-catch block above because for some reason the function
        //started returning undefined. We could test swapping the function stubs and
        //seeing if any are returning undefined for you as well.

        // travelTimeClient.geocoding(address).then((data) => {
        //     return data.features[0].geometry.coordinates;
        // })
        // .catch((e) => console.error(e));
    };

    //same thing here
    //inputs: coordinates of starting point as a list, transport type (must be very specific), allowable time in minutes
    async generateIsochrones(coordinates : number[], transport : TransportationType, time : number) {
        const departure_search: TimeMapRequestDepartureSearch = {
            id: 'public transport from Trafalgar Square',
            departure_time: new Date().toISOString(),
            travel_time: time * 60,
            coords: { lat: coordinates[0], lng: coordinates[1] },
            transportation: { type: transport },
            properties: ['is_only_walking'],
        };

        try {
            const data = await travelTimeClient.timeMap({departure_searches: [departure_search],});
            return data.results[0].shapes;
        } catch (e) {
            throw (e);
        }
        travelTimeClient.timeMap({
        departure_searches: [departure_search],
        }).then((data) => {
            return data.results[0].shapes;
        })
        .catch((e) => console.error(e));
    }
}

const test = new api();

async function testStuff() {
    const data1 = await test.geocode('5 Gilmore Street, Cabramatta');
    const data2 = await test.generateIsochrones([51.507609,-0.128315], "public_transport", 30);
    console.log(data1);
    console.log(data2);
}

testStuff();

export default new api();
