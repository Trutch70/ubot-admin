import React from 'react';
import ReceiverListItem from './ReceiverListItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ReceiversList = ({receivers}) => {
    return (
        <TableContainer>
            <Table >
                <colgroup>
                    <col width={"40%"} />
                    <col width={"20%"} />
                    <col width={"40%"} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell size={"small"} variant={"head"}>name</TableCell>
                        <TableCell style={{textAlign: "center"}} size={"small"} variant={"head"}>position</TableCell>
                        <TableCell size={"small"} variant={"head"}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        receivers.map((receiver) => {
                            return <ReceiverListItem key={receiver.id} receiver={receiver}/>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReceiversList;
