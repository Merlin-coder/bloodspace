import { Grid } from '@material-ui/core';
import { MovableTab } from 'common';
import React from 'react';
import UnassignUnit from './unassignunit.container';
import UnassignBatch from './unassignbatch.container';

const MergedUnassign = () => {
    const tabList = ['Unassign Unit', 'Unassign Batch'];
    const tabPanelItem = ['UnassignUnit', 'UnassignBatch'];
    var tabPanelItemObj = {
        UnassignUnit: <UnassignUnit />,
        UnassignBatch: <UnassignBatch />
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
export default MergedUnassign;
