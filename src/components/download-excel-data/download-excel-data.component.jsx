import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PropTypes from 'prop-types';

const DownloadExcelComponent = (props) => {
    const { onClickExportXLS } = props;
    return (
        <Tooltip title="Export in Excel">
            <IconButton aria-label="Download" onClick={onClickExportXLS}>
                <CloudDownloadIcon />
            </IconButton>
        </Tooltip>
    );
};
DownloadExcelComponent.propTypes = {
    onClickExportXLS: PropTypes.func
};

export default DownloadExcelComponent;
