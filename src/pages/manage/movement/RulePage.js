import { Grid } from '@material-ui/core';
import React from 'react';
import { MovableTab } from 'common';
import RuleType from './RuleType';

const RulePage = () => {
    const tabList = ['Facts', 'Notification', 'Resolution', 'Rule'];
    const tabPanelItem = ['Facts', 'Notification', 'Resolution', 'Rule'];
    var tabPanelItemObj = {
        Facts: <RuleType ruleType="Facts" />,
        Notification: <RuleType ruleType="Notification" />,
        Resolution: <RuleType ruleType="Resolution" />,
        Rule: <RuleType ruleType="Rule" />
    };

    return (
        <Grid>
            <MovableTab
                tabList={tabList}
                page={'rule'}
                tabPanelItem={tabPanelItem}
                tabPanelItemObj={tabPanelItemObj}
                tabSwitch={true}
            />
        </Grid>
    );
};

export default RulePage;
