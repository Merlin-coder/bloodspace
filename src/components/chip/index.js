import React from 'react';
import { CustomChipStyles } from './style';
import Chip from '@material-ui/core/Chip';
import { Grid, Tooltip } from '@material-ui/core';
const CustomChip = (props) => {
    const { dataArray, handleDelete, module, tooltip, extra } = props;
    const classes = CustomChipStyles();
    return (
        <Grid container style={{ position: 'relative', overflow: 'hidden' }}>
            {dataArray && (
                <Grid
                    style={{
                        display: module === 'manage' ? 'flex' : null,
                        //overflow: module === 'manage' ? 'scroll' : null
                    }}
                >
                    {tooltip
                        ? dataArray.map((data) => {
                              let icon;

                              return (
                                  <Tooltip key={data} title={data}>
                                      <Chip
                                          key={data}
                                          icon={icon}
                                          label={data}
                                          onDelete={handleDelete && handleDelete(data)}
                                          className={classes.chip}
                                      />
                                  </Tooltip>
                              );
                          })
                        : dataArray.map((data) => {
                              let icon;

                              return (
                                  <Chip
                                      key={data}
                                      icon={icon}
                                      label={data}
                                      onDelete={handleDelete && handleDelete(data)}
                                      className={extra ? classes.chipRed : classes.chip}
                                  />
                              );
                          })}
                </Grid>
            )}
        </Grid>
    );
};

export default CustomChip;
