import { Grid } from '@material-ui/core';
import { MovableTab } from 'common';
import AssignBatch from 'pages/assign-batch/assign-page/assign-page.container';
import React from 'react';
import AssignPage from './assign-page.container';

const MergedAssign = () => {
    const tabList = ['Assign Unit', 'Assign Batch'];
    const tabPanelItem = ['AssignUnit', 'AssignBatch'];
    var tabPanelItemObj = {
        AssignUnit: <AssignPage />,
        AssignBatch: <AssignBatch />
    };

    return (
        <Grid>
            <MovableTab
                tabList={tabList}
                tabPanelItem={tabPanelItem}
                tabPanelItemObj={tabPanelItemObj}
                tabSwitch={true}
            />
        </Grid>
    );
};
export default MergedAssign;
