import { CustomButton } from 'common';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Chatbox = () => {
    const dispatch = useDispatch();
    return (
        <>
            {/* <Grid container>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <CustomButton variant="contained" color="primary">
                            Connect
                        </CustomButton>
                    </Grid>
                    <Grid item>
                        <CustomButton variant="contained" color="primary">
                            Disconnect
                        </CustomButton>
                    </Grid>
                </Grid>
            </Grid> */}
        </>
    );
};

export default Chatbox;
