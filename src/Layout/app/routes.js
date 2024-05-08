import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { useSelector } from 'react-redux';

export default function routes() {
    const { drawerCodes } = useSelector((state) => state.userAccessCodes);
    const { subMenuAccessCodes } = useSelector((state) => state.subMenuCodes);
    const { userInfo } = useSelector((state) => state.userLogin);

    let mObj = [];
    console.log("drawerCodes" + drawerCodes);
    if (drawerCodes && drawerCodes.length > 0) {
        for (let objElement of drawerCodes) {
            console.log("objElement.drawerData:", objElement.drawerData);
            let drawerOption = {};
            drawerOption.name = objElement.name;
            drawerOption.path = objElement.path;
            drawerOption.icon = <i className={objElement.icon} style={{ fontSize: 20 }} aria-hidden="true" />;
            drawerOption.items =
                Array.isArray(objElement.drawerData)
                    ? (subMenuAccessCodes?.length > 0
                        ? objElement.drawerData.filter((drawerCode) => subMenuAccessCodes?.includes(drawerCode.code))
                        : objElement.drawerData
                    ).map((item) => {
                        return {
                            ...item,
                            mainMenuCode: objElement.code
                        };
                    })
                    : [];
            objElement.sequence ? (mObj[objElement.sequence] = drawerOption) : mObj.unshift(drawerOption);
        }
    }


    if (mObj && mObj.findIndex((item) => item?.name === 'Settings') === -1) {
        let drawerOption = {};
        drawerOption.name = 'Settings';
        drawerOption.path = '/dashboard/settings';
        drawerOption.icon = <i className={'fa fa-cog'} style={{ fontSize: 20 }} aria-hidden="true" />;
        mObj.push(drawerOption);
        console.log('mObj after adding drawerOption:', mObj);
        console.log('drawerOption:', drawerOption);
        return mObj;
    }
    return mObj;
}
