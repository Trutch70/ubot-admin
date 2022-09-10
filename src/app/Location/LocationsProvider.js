const fetchLocations = async () => {
    return fetch(process.env.REACT_APP_API_HOST + '/api/locations')
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            return response.json();
        })
        ;
}

const fetchLocation = async (id) => {
    return fetch(process.env.REACT_APP_API_HOST + '/api/locations/' + id)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('NOTFOUND');
                }
                throw new Error('Something went wrong.');
            }

            return response.json();
        })
        ;
};

const LocationsProvider =  {
    fetchLocations,
    fetchLocation,
}


export default LocationsProvider;
