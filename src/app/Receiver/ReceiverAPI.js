const uploadReceiverImage = async (id, file, token) => {
    const data = new FormData();
    data.append('file', file);

    return fetch(process.env.REACT_APP_API_HOST + `/api/receivers/${id}/image`, {
        method: 'POST',
        body: data,
        headers: {
            'Authentication': token,
        }
    });
};

const postReceiverLink = async (receiverId, data, token) => {
    const body = {...data, receiver: receiverId};

    return fetch(process.env.REACT_APP_API_HOST + `/api/links`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authentication': token,
        }
    })
};

const patchReceiverLink = async (data, token) => {
    return fetch(process.env.REACT_APP_API_HOST + `/api/links/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authentication': token,
        }
    })
};

const deleteReceiverLink = async (id, token) => {
    return fetch(process.env.REACT_APP_API_HOST + `/api/links/${id}`, {
        method: 'DELETE',
        headers: {
            'Authentication': token,
        }
    })
};

const ReceiverAPI = {
    uploadReceiverImage,
    postReceiverLink,
    patchReceiverLink,
    deleteReceiverLink,
}

export default ReceiverAPI;
