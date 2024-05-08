import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography } from '@material-ui/core';
import CONSTANTS from '../../common/constants';
import CheckboxComponent from 'components/checkbox/checkbox.component';

const useStyles = makeStyles({
    root: {
        '& .MuiFormControlLabel-root': {
            marginLeft: '0 !important',
            marginRight: '0 !important'
        }
    },
    devices: {
        marginLeft: '10px',
        marginTop: 10,
        display: 'grid',
        gridTemplateRows: 'repeat(5, 1fr)',
        gridAutoFlow: 'column',
        gap: '2px'
    }
});

const NewUserAccessScreen = (props) => {
    const classes = useStyles();
    const {
        columns,
        handlefullMenuCheck,
        handleMenuCheck,
        handleCheckBox,
        fullAccess,
        label,
        rows,
        mainMenuIndex
    } = props;
    return (
        <TableContainer elevation={1} component={Paper} style={{ padding: 15, marginTop: 15 }}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            style={{
                                minWidth: 200,
                                width: 400,
                                padding: '10px 5px',
                                fontSize: 22,
                                color: CONSTANTS.COLOR_PRIMAY_MAIN
                            }}
                        >
                            <span>
                                <span>
                                    <CheckboxComponent
                                        handleChange={(e) =>
                                            handlefullMenuCheck(e?.target?.checked, label, mainMenuIndex)
                                        }
                                        checked={fullAccess === 1}
                                        label={
                                            <span
                                                style={{
                                                    fontSize: 22,
                                                    fontWeight: 'bold',
                                                    color: CONSTANTS.COLOR_PRIMAY_MAIN
                                                }}
                                            >
                                                {label}
                                            </span>
                                        }
                                    />
                                </span>
                                <span></span>
                            </span>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {rows &&
                    rows?.map((row, indexm) => (
                        <TableBody key={indexm}>
                           
                            {console.log('rowcheck', row)}
                            <>
                                <TableRow key={indexm} style={{ border: '0px' }}>
                                    <TableCell style={{ padding: 5, paddingLeft: 25, border: '0px' }}>
                                        <CheckboxComponent
                                            handleChange={(e) =>
                                                handleMenuCheck(
                                                    e?.target?.checked,
                                                    row.name,
                                                    indexm,
                                                    label,
                                                    mainMenuIndex
                                                )
                                            }
                                            checked={row.fullAccess === 1}
                                            label={
                                                <span
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        color: CONSTANTS.COLOR_PRIMAY_MAIN
                                                    }}
                                                >
                                                    {row.name}
                                                </span>
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                                {columns.map((item, indexCOl) => {
                                    if (item.dbproperty in row) {
                                        return (
                                            <TableRow key={indexCOl} style={{ border: '0px' }}>
                                                {console.log('indexxxx', item)}
                                                <TableCell
                                                    style={{
                                                        padding: 5,
                                                        border: '0px',
                                                        paddingLeft: 50,
                                                        marginLeft: 35
                                                    }}
                                                >
                                                    <CheckboxComponent
                                                        handleChange={(e) =>
                                                            handleCheckBox(
                                                                e,
                                                                indexm,
                                                                item.dbproperty,
                                                                label,
                                                                'newUi',
                                                                mainMenuIndex
                                                            )
                                                        }
                                                        checked={row[item.dbproperty]?.[0] === '1'}
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontSize: 16
                                                                }}
                                                            >
                                                                {item?.label}
                                                            </span>
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                            </>
                        </TableBody>
                    ))}
            </Table>
        </TableContainer>
    );
};

export default NewUserAccessScreen;
