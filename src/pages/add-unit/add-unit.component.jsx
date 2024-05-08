import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { MovableTab } from 'common';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const AddUnitComponent = (props) => {
    const location = useLocation();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { tabList, tabPanelItem, tabPanelItemObj, socketRef, setData, setAssociateDevice } = props;
    const [accessableCodes, setAccessableCodes] = useState(false);
    useEffect(() => {
        let tempAccessCodes = [];
        if (userInfo?.data?.user?.['useraccessrole-code'] === 'BS-UAR-1002') {
            setAccessableCodes(true);
        } else {
            let manageAccessCodes =
                userInfo?.data?.userAccess
                    ?.filter((item) => item['drawer-code'] === 'BS-DR-0002')
                    ?.map((subMenu) => subMenu?.menuId)
                    ?.flat()[0] || [];
            let keysOfObject = Object.keys(manageAccessCodes);
            let tempAccessCodes = [];
            keysOfObject.forEach((item) => {
                if (Array.isArray(manageAccessCodes[item])) {
                    manageAccessCodes[item][0] === '1' && tempAccessCodes.push(manageAccessCodes[item][1]);
                }
            });
            if (!tempAccessCodes.includes('BS-ACO-1003') && tempAccessCodes.includes('BS-ACO-1004')) {
                setAccessableCodes(1);
            } else if (tempAccessCodes.includes('BS-ACO-1003') && !tempAccessCodes.includes('BS-ACO-1004')) {
                setAccessableCodes(0);
            } else if (tempAccessCodes.includes('BS-ACO-1003') && tempAccessCodes.includes('BS-ACO-1004')) {
                setAccessableCodes(true);
            }
        }
    }, [location]);

    return (
        <Grid>
            <MovableTab
                associate
                setData={setData}
                tabList={tabList}
                socketRef={socketRef}
                tabPanelItem={tabPanelItem}
                tabPanelItemObj={tabPanelItemObj}
                setAssociateDevice={setAssociateDevice}
                tabSwitch={accessableCodes}
            />
        </Grid>
    );
};

export default AddUnitComponent;
