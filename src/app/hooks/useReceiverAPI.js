import { useSelector } from 'react-redux';
import { selectToken } from '../User/UserSlice';
import { useCallback, useMemo } from 'react';

const useReceiverAPI = () => {
    const token = useSelector(selectToken);

    const uploadReceiverImage = useCallback(async (id, file) => {
        const data = new FormData();
        data.append('file', file);

        return fetch(process.env.REACT_APP_API_HOST + `/api/receivers/${id}/image`, {
            method: 'POST',
            body: data,
            headers: {
                'Authentication': token,
            }
        });
    }, [token]);

    const postReceiverLink = useCallback(async (receiverId, data) => {
        return fetch(process.env.REACT_APP_API_HOST + `/api/links`, {
            method: ' POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authentication': token,
            }
        })
    }, [token]);

    const patchReceiverLink = useCallback(async (data) => {
        return fetch(process.env.REACT_APP_API_HOST + `/api/links/${data.id}`, {
            method: ' PATCH',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Authentication': token,
            }
        })
    }, [token]);

    return useMemo(() => {
        return {
            uploadReceiverImage,
            postReceiverLink,
            patchReceiverLink,
        }
    }, [uploadReceiverImage, postReceiverLink, patchReceiverLink]);
}

export default useReceiverAPI;
