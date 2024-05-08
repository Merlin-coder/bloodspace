import React from 'react';

import ManageComponent from './manage.component';

const ManagePage = (props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');
    const [resultsCount, setResultsCount] = React.useState('');
    const [filterKeys, setFilterKeys] = React.useState('');

    const handleDialog = () => {
        setDialogOpen(!dialogOpen);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <ManageComponent
            {...props}
            resultsCount={resultsCount}
            setResultsCount={setResultsCount}
            handleDialog={handleDialog}
            handleDialogClose={handleDialogClose}
            dialogOpen={dialogOpen}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            filterKeys={filterKeys}
            setFilterKeys={setFilterKeys}
        />
    );
};

export default ManagePage;
