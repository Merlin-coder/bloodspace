import React from 'react';
import { useHistory } from 'react-router-dom';
import AssignBatchComponent from './assign-page.component';

const AssignBatch = () => {
    const history = useHistory();
    return <AssignBatchComponent history={history} />;
};

export default AssignBatch;
