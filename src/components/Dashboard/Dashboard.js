import React, { useEffect, useState } from 'react';
import ContentContainer from '../Common/ContentContainer';
import ReceiversList from './ReceiversList';
import { Link } from 'react-router-dom';
import ReceiversProvider from '../../app/Receiver/ReceiversProvider';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLoading } from '../Layout/Loading/LoadingSlice';

const Dashboard = () => {
    const [receivers, setReceivers] = useState([]);
    const [page, setPage] = useState(1);
    const [nextActive, setNextActive] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        ReceiversProvider.fetchReceivers(page, 10)
            .then(data => {
                setReceivers(data);
                dispatch(setLoading(false));

                if (data.length < 10) {
                    setNextActive(false);
                }
            })
    }, [page]);

    const nextPage = () => {
        dispatch(setLoading(true));
        ReceiversProvider.fetchReceivers(page + 1, 10)
            .then(data => {
                if (data.length > 0) {
                    setPage(page + 1);
                    setReceivers(data);

                }

                if (data.length < 10) {
                    setNextActive(false);
                }

                dispatch(setLoading(false));
            })
    }

    const previousPage = () => {
        dispatch(setLoading(true));
        ReceiversProvider.fetchReceivers(page -1, 10)
            .then(data => {
                setReceivers(data);
                setPage(page - 1);
                setNextActive(true);
                dispatch(setLoading(false));
            })
    }

    return (
        <>
            <ContentContainer>
                <div className={'header-container'}>
                    <h1 className={"text-blue"}>Businesses</h1>
                    <div style={{textAlign: "right"}}>
                        <Link to={"/receivers/new"}>
                            <Button type={"button"} variant={"contained"}>Add new</Button>
                        </Link>
                    </div>
                </div>
                <Box>
                    <Box sx={{mt: 4}} style={{textAlign: "center"}}>
                        <Box>Page {page}</Box>
                        <Button type={"button"} variant={"text"} disabled={page < 2} onClick={previousPage}>{'< Prev'}</Button>
                        <Button type={"button"} variant={"text"} disabled={!nextActive} onClick={nextPage}>Next ></Button>
                    </Box>
                    <ReceiversList receivers={receivers} />
                </Box>
            </ContentContainer>
        </>
    );
};

export default Dashboard;
