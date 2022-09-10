    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button, TableCell, TableRow } from '@mui/material';

const ReceiverListItem = ({receiver}) => {
    return (
        <TableRow hover={true}>
            <TableCell size={"small"}>{receiver.name}</TableCell>
            <TableCell style={{textAlign: "center"}} size={"small"}>{receiver.position}</TableCell>
            <TableCell style={{textAlign: "right"}} size={"small"}>
                <Link to={`/receivers/${receiver.id}`} style={{textDecoration: "none"}}>
                    <Button variant={"outlined"} type={'button'}>
                        Edit
                    </Button>
                </Link>
            </TableCell>
        </TableRow>
    );
};

export default ReceiverListItem;
