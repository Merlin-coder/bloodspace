import DownloadExcelComponent from './download-excel-data.component';
import React from 'react';
const DownloadExcel = () => {
    function onClickExportXLS() {
        // let checkedValues = data.filter((ele) => ele.checked).map((o) => o.skuId._id);
        // setDisableButtons(true);
        // exportXls(checkedValues, search, sort, searchFilter).then((response) => {
        //     if (!response.status) {
        //         showSnackbar(`${response.message}`, 'error');
        //     }
        // const a = document.createElement('a');
        // a.href = window.URL.createObjectURL(response.data);
        // a.setAttribute('download', `Activity - ${new Date(Date.now())}`);
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        // });
    }
    return <DownloadExcelComponent onClickExportXLS={onClickExportXLS} />;
};

export default DownloadExcel;
