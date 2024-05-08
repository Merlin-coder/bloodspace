import React from 'react';
import { Table, TableBody, TableHead, TableRow, Checkbox, makeStyles } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import CustomTableCell from '../../components/scTable/scTableCell';

const useStyles = makeStyles({
    checkboxHead: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '-20px',
        '& :nth-child(1)': {
            padding: 0,
            paddingLeft: 5,
            paddingTop: 6
        }
    },
    checkboxBody: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& :nth-child(1)': {
            padding: 0,
            paddingLeft: 5,
            marginRight: 3
        }
    }
});
function PullOutTable(props) {
    const {
        refskuDataSuccess,
        requestedIds,
        triggeredLedList,
        handleCheckAll,
        checkedRows,
        singleRowCheck,
        pulledOutIds,
        requestHistory
    } = props;
    const classes = useStyles();
    // console.log(checkedRows, 'checkedRows');
    return (
        <Table>
            <TableHead>
                <TableRow
                    style={{
                        position: 'sticky',
                        top: 0,
                        whiteSpace: 'nowrap',
                        height: 5,
                        backgroundColor: '#f2f2f2',
                        zIndex: 1
                    }}
                >
                    {requestHistory ? null : (
                        <span className={classes.checkboxHead}>
                            <Checkbox color="primary" onChange={handleCheckAll} />
                        </span>
                    )}
                    <CustomTableCell>{'Unit ID'}</CustomTableCell>
                    <CustomTableCell>{'RFID Number'}</CustomTableCell>
                    <CustomTableCell>{'Blood Group'}</CustomTableCell>
                    <CustomTableCell>{'Product Group'}</CustomTableCell>
                    <CustomTableCell>{'Product Description'}</CustomTableCell>
                    <CustomTableCell>{'Device'}</CustomTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {refskuDataSuccess?.data?.map((row) => (
                    <>
                        {requestedIds?.includes(row._id) ? (
                            <TableRow
                                key={row._id}
                                style={{
                                    backgroundColor: pulledOutIds?.includes(row?._id) ? '#e3fce4' : ''
                                }}
                            >
                                {requestHistory ? null : (
                                    <CustomTableCell>
                                        <span className={classes.checkboxBody}>
                                            <Checkbox
                                                color="primary"
                                                checked={checkedRows.includes(row?._id)}
                                                onChange={(e) => singleRowCheck(e?.target?.checked, row?._id)}
                                            />
                                            <FlareIcon
                                                style={{
                                                    fontSize: 15,
                                                    color: triggeredLedList?.includes(row._id) ? '#DD0004' : 'gray'
                                                }}
                                            />
                                        </span>
                                    </CustomTableCell>
                                )}
                                <CustomTableCell>{row?.donationCode}</CustomTableCell>
                                <CustomTableCell>{row?.rfidNumber}</CustomTableCell>
                                <CustomTableCell>{row?.bloodgroupId?.[0]?.name}</CustomTableCell>
                                <CustomTableCell>{row?.productcodeId?.[0]?.isbtcode}</CustomTableCell>
                                <CustomTableCell>{row?.productcodeId?.[0]?.isbtdescription}</CustomTableCell>
                                <CustomTableCell>{row?.deviceId[0]?.name}</CustomTableCell>
                            </TableRow>
                        ) : null}
                    </>
                ))}
            </TableBody>
        </Table>
    );
}

export default PullOutTable;
