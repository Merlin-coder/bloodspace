import { Grid, InputLabel, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useStyles } from './editUnitStyle.js';
//import EventIcon from '@material-ui/icons/Event';
import { DatePicker } from 'common';

import CustomInput from 'components/inputfeild/index.js';

const EditUnit = (props) => {
    const { handleUnitId, tagIdRef, expiryDateRef, genericValues,rowData } = props;
    // const classes = useStyles();
    console.log(genericValues, 'genericValues');
    console.log('row---',rowData)

    return (
        <Grid item xs={12}>
            <Grid item xs={12}>
                <Grid container xs={12} justify="space-between" spacing="6">
                    <Grid item xs={4}>
                        <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'GTIN Number *'}</InputLabel>
                        <CustomInput
                            fullWidth
                            value={genericValues['gtinNumber']}
                            onChange={(e) =>
                                handleUnitId ? handleUnitId(e?.target?.value, undefined, 'gtinNumber') : null
                            }
                            focus={true}
                            size="lg"
                            disabled={rowData.isEditable  === true  ? false : true }
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'Batch Number *'}</InputLabel>
                        <CustomInput
                            fullWidth
                            value={genericValues['batchNumber']}
                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'batchNumber')}
                            disabled={rowData.isEditable === true ? false : true}
                        />
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        {/* <Grid item xs={12}>
                            <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'Tag ID *'}</InputLabel>
                            <CustomInput
                                fullWidth
                                value={genericValues['rfidNumber']}
                                // onChange={(e) => handleLocalDescription(e.target.value, 'rfidNumber')}
                                inputRef={tagIdRef ? tagIdRef : null}
                                disabled={true}
                            />
                        </Grid> */}
                    </Grid>
                </Grid>

                <Grid container xs={12} justify="space-between" spacing="6" style={{ marginTop: 5 }}>
                    <Grid item xs={4}>
                        <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'Expiry Date *'}</InputLabel>
                        <DatePicker
                            inputVariant={'outlined'}
                            handleDate={(e, x) => handleUnitId(e, x, 'expiryDate')}
                            value={genericValues['expiryDate']}
                            format="dd/MM/yy"
                            placeholder=" "
                            width="100%"
                            padding={'5px'}
                            size="small"
                            inputRef={expiryDateRef ?? null}
                            refuse={'/^(?:&>)(?:[0-9]{10})/gi'}
                            mask={'_________________________________________________________________________________'}
                            //disablePast={true}
                            disabled={rowData.isEditable === true ? false : true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'Serial Number *'}</InputLabel>
                        <CustomInput
                            fullWidth
                            value={genericValues['serialNumber']}
                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'serialNumber')}
                            disabled={rowData.isEditable === true ? false : true}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container spacing={6} style={{ display: 'flex', justifyContent: 'start', marginTop: 5 }}>
                    <Grid item xs={12}>
                        <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'Product Description *'}</InputLabel>
                        <CustomInput
                            fullWidth
                            value={genericValues['batchProduct']}
                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'batchProduct')}
                            disabled={rowData.isEditable === true ? false : true}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={6} style={{ display: 'flex', justifyContent: 'start', marginTop: 5 }}>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'Description'}</InputLabel>
                        <CustomInput
                            fullWidth
                            value={genericValues['localDescription']}
                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'localDescription')}
                            multiline
                            disabled={rowData.isEditable === true ? false : true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 4, fontSize: 14 }}>{'GTIN Description'}</InputLabel>
                        <CustomInput
                            fullWidth
                            value={genericValues['gtinDescription']}
                            multiline
                            onChange={(e) => handleUnitId(e?.target?.value, undefined, 'gtinDescription')}
                            disabled={rowData.isEditable === true ? false : true}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditUnit;
