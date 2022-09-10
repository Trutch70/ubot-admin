const fetchReceivers = async (page = 1, limit = 8) => {
    return fetch(process.env.REACT_APP_API_HOST + '/api/receivers?page=' + page + '&limit=' + limit)
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            return response.json();
        })
        ;
};

const fetchReceiver = async (id) => {
    return fetch(process.env.REACT_APP_API_HOST + '/api/receivers/' + id)
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

const ReceiversProvider = {
    fetchReceiver,
    fetchReceivers
};

export default ReceiversProvider;
