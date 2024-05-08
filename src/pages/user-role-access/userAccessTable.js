import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import CONSTANTS from '../../common/constants';
import CheckboxComponent from 'components/checkbox/checkbox.component';

const useStyles = makeStyles({
    root: {
        '& .MuiFormControlLabel-root': {
            marginLeft: '0 !important',
            marginRight: '0 !important'
        }
    }
});

const UserAccessTable = (props) => {
    const [dummyHeader, setDummyHeader] = useState([]);
    const classes = useStyles();
    const { rows, columns, handleCheckBox, label } = props;
    useEffect(() => {
        if (rows && rows.length > 0) {
            let tempHeader = ['name', ...columns];
            setDummyHeader(tempHeader);
        }
    }, [rows]);

    return (
        <TableContainer elevation={0} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {dummyHeader.map((item, indexh) =>
                            item === 'name' ? (
                                <>
                                    <TableCell
                                        style={{
                                            minWidth: 200,
                                            width: 400,
                                            padding: '10px 5px',
                                            fontSize: 22,
                                            color: CONSTANTS.COLOR_PRIMAY_MAIN
                                        }}
                                        key={indexh}
                                    >
                                        {label}
                                    </TableCell>
                                </>
                            ) : (
                                <TableCell
                                    align="left"
                                    style={{
                                        minWidth: 100,
                                        padding: '10px 5px',
                                        color: CONSTANTS.COLOR_PRIMAY_MAIN
                                    }}
                                    key={indexh}
                                >
                                    {item.label}
                                </TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows &&
                        rows?.map((row, indexm) => (
                            <TableRow key={indexm} style={{ border: '0px' }}>
                                {console.log('indexxxx', row)}
                                {dummyHeader.map((col, indexc) =>
                                    col === 'name' ? (
                                        <TableCell style={{ padding: 5, border: '0px' }} key={indexc}>
                                            {row.name}
                                        </TableCell>
                                    ) : (
                                        <TableCell align="left" style={{ padding: 2, border: '0px' }} key={indexc}>
                                            <span style={{ marginLeft: 20 }}>
                                                <FormControlLabel
                                                    className={classes.root}
                                                    aria-label="Acknowledge"
                                                    onClick={(e) => handleCheckBox(e, indexm, col.dbProperty, label)}
                                                    control={<Checkbox color="primary" />}
                                                    checked={row[col.dbProperty]?.[0] === '1'}
                                                />
                                            </span>
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserAccessTable;
