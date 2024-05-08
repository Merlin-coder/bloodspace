import React, { useState, useEffect } from 'react';
import SearchTablecomponent from './searchTable.component';
import { useHistory } from 'react-router-dom';

const SearchTable = ({ tData, searchKey }) => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pages, setPages] = useState(parseInt(tData.length / 5));
    const [currentPage, setCurrentPage] = useState(0);
    const [rows, setRows] = useState(tData.slice(0, rowsPerPage));
    const [rowsCount, setRowsCount] = useState(5);

    let tHeadData = ['Recipient Name', 'DOB', 'Hospital Number (MRN)', 'Gender', 'Blood Group'];
    let rowKeys = ['name', 'dob', 'badgeNumber', 'gender', 'bloodGroup'];

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);

        setRowsCount(rowsCount - rowsPerPage + event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
        if (newPage > currentPage) {
            setRowsCount(rowsCount + rowsPerPage);
        } else {
            setRowsCount(rowsCount - rowsPerPage);
        }
    };
    const history = useHistory();

    const handleRowClick = (rowId) => {
        // console.log(rowId,"rowId")
        history.push(`/dashboard/assignunit/${rowId}`);
    };

    useEffect(() => {
        if (currentPage > 0) {
            if (tData.length > rowsCount) {
                setRows(tData.slice(rowsCount - rowsPerPage, rowsPerPage + rowsPerPage));
            } else {
                setRows(tData.slice(rowsCount - rowsPerPage));
            }
        } else {
            setRows(tData.slice(0, rowsPerPage));
        }
        setPages(parseInt(tData / rowsPerPage));
    }, [rowsPerPage, rowsCount]);

    return (
        <SearchTablecomponent
            tHeadData={tHeadData}
            count={tData.length}
            rowKeys={rowKeys}
            tBodyData={rows}
            pages={pages}
            currentPage={currentPage}
            searchKey={searchKey}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleRowClick={handleRowClick}
        />
    );
};

export default SearchTable;
