import React from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';

import { searchTableStyles } from './searchTable.style';
import { CONSTANTS } from 'common';
const SearchTablecomponent = ({
    currentPage,
    count,
    tHeadData,
    tBodyData,
    rowKeys,
    searchKey,
    handleChangeRowsPerPage,
    handleChangePage,
    rowsPerPage,
    handleRowClick
}) => {
    const classes = searchTableStyles();
    return (
        <Grid container>
            <Grid item xs={12}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {tHeadData.map((item, index) => (
                                <TableCell
                                    key={index}
                                    style={{
                                        textAlign: item === 'Blood Group' ? 'center' : 'left',
                                        color: theme.palette.colors.gray.main,
                                        fontWeight: 'bold',
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}
                                >
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tBodyData.map((data, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleRowClick(data['badgeNumber'])}
                                style={{ borderBottom: '1px solid #777777' }}
                            >
                                {rowKeys.map((item, index) => (
                                    <TableCell
                                        key={index}
                                        className={classes.alignLeft}
                                        style={{
                                            color: theme.palette.colors.gray.main,
                                            paddingTop: 13,
                                            paddingBottom: 13
                                        }}
                                    >
                                        {(item === 'badgeNumber' || item === 'name') &&
                                        data[item]?.includes(searchKey) ? (
                                            <Typography>
                                                <span className={classes.colorBlue}>{searchKey}</span>
                                                {data[item].substr(searchKey.length)}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                style={{ textAlign: item === 'bloodGroup' ? 'center' : 'left' }}
                                            >
                                                {data[item]}
                                            </Typography>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item xs={12}>
                {count > 3 ? (
                    <TablePagination
                        className={classes.tablePagiNation}
                        rowsPerPageOptions={[3, 5, 10]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage="Rows Per Page"
                        page={currentPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                ) : null}
            </Grid>
        </Grid>
    );
};

export default SearchTablecomponent;
