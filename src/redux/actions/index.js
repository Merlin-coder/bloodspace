import { getDrawer, clearDrawer, openDrawerAction } from './settings/drawerActions';
import { getUserAccessData } from './userAccessAction';
import { getVersion } from './versionAction';
import {
    get2ndDropdown,
    get3rdDropdown,
    getDropDown,
    get4thDropdown,
    get8thDropdown,
    clearPutResponse,
    putFormData,
    putSwapoutData,
    putEditData,
    postFormData,
    postSwapOutData,
    putSwapOutCancel,
    clearDropDown,
    getSettings,
    getBatchSettings,
    getRemote,
    clearPostResponse, postExcelSheet,
    postRemoveEDQ,
    getRecipientCount,
    getDashCount
} from './manage/manageFieldsAction';
import { putHeaderAction, ledSelection, clearheaderActionsResponse, clearRequestbatchActions } from './manage/headerActions';
import { changeLOcationData, clearChangeLocationData } from './transferUnitActions/changeLocationAction';
import {
    clearGetTransactionData,
    getTransferData,
    getReceiveUnits,
    postTransferData
} from './transferUnitActions/transferUnitActions';
import { getData, clearData, clearUnitBatchData } from './scGenericApiCalls';
import { postUserRoleAction, clearPostUserRoleAction, getCurrentRoleActiveDevices } from './userRoleAccessControl';
import { createAlert, removeAlert, createErrorDialog, removeErrorDialog } from './alertActions';
import { clearLoginState } from './auth/authActions';
import {
    getUserAccessDrawerCodes,
    getSubMenuDrawerCodes,
    getAccessblePaths,
    getAccessbleMenuModules,
    storeDrawerResponseAction
} from './userAccessRoutingActions';
import { getAppLoader } from './appLoaderAction';
import {
    refreshPullOutData,
    clearRefreshPullOutData,
    clearPullOutData,
    pullOutCancelAction,
    errorReportData,
    clearErrorReportData
} from './manage/scManageActions';
import { requestPulloutDialogOpen, requestPullOutId, requestErrorDialogOpen } from './requestUnit';
import { associateBatchAction, passingAssociateProps, socketResponse } from '../actions/associateBatch';
import {
    deviceAccessDetails,
    removeDeviceAccessDetails,
    systemError,
    clearSystemError,
    remoteDashboardSocketDataAction,
    getRemoteAccessDevice,
    handleBredcrumbsNameAction,
    handleBredcrumbsNameClear,
    socketSessionIdAction,
    clearSocketSessionId,
    remoteDBAccessDeviceAction,
    getRemoteAssignAction
} from '../actions/remoteDashboardActions';
import { assignUnitDeviceAction } from './assignUnit/assignPageActions';
import { notificationSettingsAction, dereservationSettingAction, dereservationBatchSettingAction, settingSwapoutEmail } from './settings/settingsActions';
export {
    getDrawer,
    getUserAccessData,
    getVersion,
    get2ndDropdown,
    get3rdDropdown,
    get4thDropdown,
    getDropDown,
    putHeaderAction,
    clearheaderActionsResponse,
    clearRequestbatchActions,
    changeLOcationData,
    clearChangeLocationData,
    clearGetTransactionData,
    getTransferData,
    postTransferData,
    clearPutResponse,
    putFormData,
    putSwapoutData,
    putEditData,
    getData,
    getRemote,
    clearData,
    postFormData,
    postSwapOutData,
    putSwapOutCancel,
    postUserRoleAction,
    clearPostUserRoleAction,
    clearDropDown,
    getSettings,
    getBatchSettings,
    createAlert,
    removeAlert,
    clearPostResponse,
    clearLoginState,
    getUserAccessDrawerCodes,
    clearDrawer,
    openDrawerAction,
    getAppLoader,
    getSubMenuDrawerCodes,
    getAccessblePaths,
    getAccessbleMenuModules,
    storeDrawerResponseAction,
    getReceiveUnits,
    ledSelection,
    createErrorDialog,
    removeErrorDialog,
    refreshPullOutData,
    clearRefreshPullOutData,
    errorReportData,
    clearErrorReportData,
    clearPullOutData,
    requestPulloutDialogOpen,
    requestErrorDialogOpen,
    getCurrentRoleActiveDevices,
    pullOutCancelAction,
    requestPullOutId,
    associateBatchAction,
    deviceAccessDetails,
    removeDeviceAccessDetails,
    systemError,
    remoteDashboardSocketDataAction,
    getRemoteAccessDevice,
    handleBredcrumbsNameAction,
    handleBredcrumbsNameClear,
    socketSessionIdAction,
    clearSocketSessionId,
    clearUnitBatchData,
    remoteDBAccessDeviceAction,
    getRemoteAssignAction,
    passingAssociateProps,
    socketResponse,
    assignUnitDeviceAction,
    notificationSettingsAction,
    dereservationSettingAction,
    dereservationBatchSettingAction,
    settingSwapoutEmail,
    get8thDropdown,
    postExcelSheet,
    postRemoveEDQ,
    getRecipientCount,
    getDashCount
};
