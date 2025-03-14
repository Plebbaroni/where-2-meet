import {
TimeMapRequestArrivalSearch,
TimeMapRequestDepartureSearch,
TransportationRequestCommons,
TransportationType,
TravelTimeClient
} from 'traveltime-api';

const travelTimeClient = new TravelTimeClient({
applicationId: 'd6fa1dad',
apiKey: '031d5f8d853065441b77de5bfb1615bc',
});


//input: address
//ouput: longitude and latitute of first result
function geocode(address : string) {
    travelTimeClient.geocoding(address).then((data) => {
        return data.features[0].geometry.coordinates;
    })
    .catch((e) => console.error(e));
};

console.log(geocode('5 Gilmore Street, Cabramatta'));
    
//inputs: coordinates of starting point as a list, transport type (must be very specific), allowable time in minutes
function generateIsochrones(coordinates : number[], transport : TransportationType, time : number) {
    const departure_search: TimeMapRequestDepartureSearch = {
    id: 'public transport from Trafalgar Square',
    departure_time: new Date().toISOString(),
    travel_time: time * 60,
    coords: { lat: coordinates[0], lng: coordinates[1] },
    transportation: { type: transport },
    properties: ['is_only_walking'],
    };
    
    travelTimeClient.timeMap({
    departure_searches: [departure_search],
    }).then((data) => {
        return data.results[0].shapes;
    })
    .catch((e) => console.error(e));
}

console.log(generateIsochrones([51.507609,-0.128315], "public_transport", 30))

