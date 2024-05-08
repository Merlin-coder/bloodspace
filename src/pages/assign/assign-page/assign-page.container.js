import React from 'react';
import { useHistory } from 'react-router-dom';
import AssignPageComponent from './assign-page.component';

const AssignPage = () => {
    const history = useHistory();
    return <AssignPageComponent history={history} />;
};

export default AssignPage;
