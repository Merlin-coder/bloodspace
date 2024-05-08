import AddUnitComponent from './add-unit.component';
import React from 'react';
import { AddUnitForm, PreEncodedTab } from 'components';
import { useSelector } from 'react-redux';
import { AssociateBatch } from 'pages';

const AddUnit = () => {
    const socketRef = React.useRef();
    // const [barcodeAccess, setBarcodeAccess] = React.useState(false);
    // const [preEncodedAccess, setPreEncodedAccess] = React.useState(false);

    const [data, setData] = React.useState();
    // const { userAccessData } = useSelector((state) => state.getUserAccess);
    // React.useEffect(() => {
    //     if (userAccessData) {
    //         userAccessData?.data[0]?.moduleId?.map((item) => {
    //             if (item.code === 'BS-MO-1003') {
    //                 setBarcodeAccess(true);
    //             } else if (item.code === 'BS-MO-1004') {
    //                 setPreEncodedAccess(true);
    //             }
    //         });
    //     }
    // }, [userAccessData]);

    const tabList = ['Barcode', 'Pre-encoded', 'Associate-Batch'];
    const tabPanelItem = ['AddUnitForm', 'Pre_encodedTab', 'AssociateBatch'];
    const [associateDevice, setAssociateDevice] = React.useState(false);
    var tabPanelItemObj = {
        //Whatever component you what to display just add in this object
        AddUnitForm: <AddUnitForm associateDevice={associateDevice} />,
        Pre_encodedTab: <PreEncodedTab associateDevice={associateDevice} socketRef={socketRef} dataJson={data} />,
        AssociateBatch: <AssociateBatch associateDevice={associateDevice} />
    };
    return (
        <AddUnitComponent
            setData={setData}
            socketRef={socketRef}
            tabList={tabList}
            tabPanelItem={tabPanelItem}
            tabPanelItemObj={tabPanelItemObj}
            setAssociateDevice={setAssociateDevice}
        />
    );
};

export default AddUnit;
