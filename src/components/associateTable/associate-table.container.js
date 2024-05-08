import AssociateTableComponent from './associate-table.component';
import React, { useState } from 'react';

const columns = [
    {
        id: 'RFID_Code',
        label: 'RFID',
        minWidth: 100,
        align: 'left'
    },
    {
        id: 'Ref#*',
        label: 'Ref#',
        minWidth: 50,
        align: 'left'
    },
    {
        id: 'White/Off-White/Fancy',
        label: 'Appearence',
        minWidth: 150,
        align: 'left'
    },
    {
        id: 'Shape',
        label: 'Shape',
        minWidth: 100,
        align: 'left'
    },
    {
        id: 'Client_color',
        label: 'Client color',
        minWidth: 100,
        align: 'left'
    },
    {
        id: 'Weight',
        label: 'Weight',
        minWidth: 100,
        align: 'left'
    },
    {
        id: 'Clarity',
        label: 'Clarity',
        minWidth: 100,
        align: 'left'
    },
    {
        id: 'Client_$/Ct',
        label: 'Client_$/Ct',
        minWidth: 50,
        align: 'left'
    },
    {
        id: 'Total_USD',
        label: 'Total USD',
        minWidth: 100,
        align: 'left'
    },
    {
        label: 'Lab',
        minWidth: 100,
        id: 'Lab',
        align: 'left'
    },
    {
        label: 'Certificate',
        minWidth: 100,
        id: 'Certificat',
        align: 'left'
    },
    {
        label: 'Certificat Date',
        minWidth: 100,
        id: 'Certificat_Date',
        align: 'left'
    },
    {
        label: 'Grading report shape',
        minWidth: 150,
        id: 'Grading_report_Shape',
        align: 'left'
    },
    {
        label: 'Grading_report_color',
        minWidth: 150,
        id: 'Grading report color',
        align: 'left'
    },
    {
        label: 'Measurements',
        minWidth: 200,
        id: 'Measurements',
        align: 'left'
    },
    {
        label: 'Ms1',
        minWidth: 100,
        id: 'Ms1',
        align: 'left'
    },
    {
        label: 'Ms2',
        minWidth: 100,
        id: 'Ms2',
        align: 'left'
    },
    {
        label: 'Ms3',
        minWidth: 100,
        id: 'Ms3',
        align: 'left'
    }
];
const AssociateTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState(new Array(columns.length).fill(null).map((n, i) => i));
    const [open, setOpen] = React.useState(false);
    const [isTableDisplay, setIsTableDisplay] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const searchDataFromList = () => {
        // console.log({ target: event.target.value });
    };

    return (
        <AssociateTableComponent
            page={page}
            rowsPerPage={rowsPerPage}
            order={order}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            setOrder={setOrder}
            columns={columns}
            open={open}
            setOpen={setOpen}
            isTableDisplay={isTableDisplay}
            setIsTableDisplay={setIsTableDisplay}
            searchDataFromList={searchDataFromList}
        />
    );
};

export default AssociateTable;
