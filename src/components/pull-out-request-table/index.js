import React, { useState } from 'react';
import PullOutTable from './pull-out-request-dialog-table';
import { useSelector } from 'react-redux';

function PullOutDialogTable(props) {
    const { requestedIds, pulledOutIds, selectedRecords, setSelectedRecords } = props;
    const { refskuDataSuccess } = useSelector((state) => state.refskuTableData);
    // const [checkedRows, setCheckedRows] = useState([]);
    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setSelectedRecords(requestedIds);
        } else {
            setSelectedRecords([]);
        }
    };
    const singleRowCheck = (e, id) => {
        let tempCheckedRows = [...selectedRecords];
        if (e) {
            tempCheckedRows.push(id);
        } else {
            tempCheckedRows = tempCheckedRows.filter((i) => i !== id);
        }
        setSelectedRecords(tempCheckedRows);
    };
    return (
        <PullOutTable
            {...props}
            refskuDataSuccess={refskuDataSuccess}
            checkedRows={selectedRecords}
            handleCheckAll={handleCheckAll}
            singleRowCheck={singleRowCheck}
            pulledOutIds={pulledOutIds}
        />
    );
}

export default PullOutDialogTable;
