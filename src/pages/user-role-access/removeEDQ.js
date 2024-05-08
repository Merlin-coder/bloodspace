import React from 'react';
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

const RemoveEdqTable = (props) => {
    const classes = useStyles();
    const { columns, rows, handleCheckBox, isChecked, selectedDevices, handlefullMenuCheck, fullAccess, label } = props;
    console.log('checkeddd---', isChecked)
    return (
        <TableContainer elevation={0} component={Paper}>
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
                                   
                                  
                                        <span
                                            style={{
                                                fontSize: 22,
                                                fontWeight: 'bold',
                                                color: CONSTANTS.COLOR_PRIMAY_MAIN
                                            }}
                                        >
                                            Remove EDQs
                                        </span>
                                    
                                </span>
                                <span></span>
                            </span>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <div>
                      
                            <div  style={{ display: 'flex', flexDirection: 'column' }}>
                                <CheckboxComponent
                                handleChange={(e) => handleCheckBox(e?.target?.checked)}
                                checked={isChecked ? true :false}
                                label={<Typography style={{ minWidth: 250 }}>Allow access to remove EDQ</Typography>}
                                />
                               
                            </div>
                       
                    </div>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RemoveEdqTable;
