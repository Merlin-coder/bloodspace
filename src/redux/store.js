/*eslint-disable */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userLoginReducer } from './reducers/userReducers';
import {
    addDeviceReducer,
    clientReducer,
    deleteDeviceReducer,
    deviceTypeReducer,
    getDeviceReducer,
    locationTypeReducer,
    updateDeviceReducer
} from 'components/device/service';
import {
    addLocationReducer,
    deleteLocationReducer,
    getLocationReducer,
    getLocationTypeReducer,
    updateLocationReducer
} from './reducers/manage/manageLocationReducers';
import { themeSwitchReducer } from './reducers/settingsReducers/themeSwitchReducer';
import { getAddDrawerReducer } from './reducers/settingsReducers/drawerAddReducer';
import {
    getDashboardReducer,
    getTemperatureReducer,
    getTemperatureGraphReducer,
    getDashboardEuoReducer,
    getEuoIncompleteUnitsReducer,
    getEuoIncompleteBatchReducer,
    ackNotifyEuoSaveReducer,
    alertsEuoReducer,
    alertsavEuoReducer
} from './reducers/dashboard/dashboardReducers';
import { getFormTableReducer } from './reducers/manage/formTableReducers';
import { profileDetailsReducer } from './reducers/profileDetails/profileDetails';
import {
    rulePageReducer,
    ruleAllPageReducer,
    getAll,
    getNotificationType,
    getResolutionType,
    getResolutionSubType,
    getFactIdReducer,
    getNotificationIdReducer,
    getResolutioinIdReducer,
    postRuleTypeReducer,
    ruleBreakReducer,
    ruleType,
    putRuleTypeReducer
} from './reducers/manage/rulePageReducers';

import {
    changeResponseReducer,
    dateFormatSelectionReducer,
    changeRoutesReducer,
    associateUnitValidationReducer,
    deviceWriteTag,
    lfTagReducer,
    notificationSettingsReducer,
    swapoutEmailReducer
} from './reducers/settingsReducers/changeResponseReducer';
import { getFiltersCriteriaReducer } from './reducers/filters/filtersReducers';
import {
    getFilterReducer,
    getRequestBatchFilterReducer,
    getActivityUnitFilterReducer,
    getActivityBatchFilterReducer,
    getNotifyUnitFilterReducer,
    getNotifyBatchFilterReducer,
    getWastedUnitFilterReducer,
    getWastedBatchFilterReducer,
    getTransfusedUnitFilterReducer,
    getTransfusedBatchFilterReducer,
    getRecipientFilterReducer,
    getUserFilterReducer,
    getSwapoutFilterReducer
} from './reducers/filters/filtersReducers';

import {
    errorReportDataReducer,
    getDataReducer,
    getUserRoleIdReducer,
    getRefSkuDataReducer,
    getResponseDataReducer,
    getUnitBatchReducer,
    postPullOutReducer,
    pullOutCancelActionReducer,
    refreshPulloutDataReducer,
    requestRemoteAllocationReducer,
    compatabilityPdfReducer,
    validationSlipUpdateReducer,
    deviceStatusReducer
} from './reducers/manage/scManageReducers';
import { isDeviceLoggedInReducer, isLoggedInReducer } from './reducers/auth/userLoggedIn';
import { uploadExcelFileReducer } from './reducers/upload/uploadReducers';
import { getVoucherReducer } from './reducers/manage/scManageViewReducer';
import { getDrawerReducer, openDrawerReducer } from './reducers/settingsReducers/drawerReducers';
import {
    getDropDownReducer,
    getFieldsReducer,
    get2ndDropdownReducer,
    postFieldsReducer,
    postSwapoutReducer,
    putSwapoutCancelReducer,
    putFieldsReducer,
    putSwapoutReducer,
    putDisplayConfigReducer,
    activeDeactiveReducer,
    get3rdDropdownReducer,
    get4thDropdownReducer,
    get5thDropdownReducer,
    get6thdDropdownReducer,
    get7thDropdownReducer,
    deleteFieldReducer,
    deactivateFieldReducer,
    deleteDisplayconfigReducer,
    postAddUserGroupReducer,
    postExcelGroupReducer,
    wastedUnitReducer,
    wastedBatchReducer,
    getWastedUnitReducer,
    getWastedBatchReducer,
    getDeviceDataReducer,
    get8thDropdownReducer,
    getCollectionDropdownReducer,
    removeEdqReducer,
    getRecipientCountReducer,
    getDashCountReducer
} from './reducers/manage/getFieldsReducer';
import { voucherDisplayConf } from './reducers/voucherDisplayConfReducer';
import { assignUnitDeviceReducer, getRecipientReducer } from './reducers/assignUnit/assignUnitReducers';
import {
    socketReducer,
    getSocketDevice,
    getSocketDeviceValue,
    getSocketDeviceSerialnumber,
    getSocketDeviceStatus,
    getSocketDeviceConnection,
    getSocketDeviceToken,
    getSocketScanData,
    getSocketStartStopScan,
    getLFConnectionStatus,
    getLFDeviceMethod,
    getLFDevice,
    bulkScanLoadingReducer,
    currentPcReducer,
    assignWriteRecipientReducer,
    preEncodedLocalDataReducer,
    assignDataLocalDataReducer,
    settingsLocalDataReducer,
    settingsBatchDerervationDataReducer,
    settingsRemoteLoginPageReducer,
    associateBatchStateReducer,
    associateBarcodeStateReducer
} from './reducers/socketReducer';
import { getProductCodeReducer } from './reducers/assignUnit/productCodeReducer';
import { postAddUnit } from './reducers/assignUnit/addUnitRecipientReducer';
import { getUnitIdSearchReducer } from './reducers/assignUnit/unitIdSearchReducer';
import { getBatchIdSearchReducer } from './reducers/assignBatchReducers/assignBatchReducer';
import { getBloodGroupReducer } from './reducers/assignUnit/getBloodGroupsReducers';
import { addSkuReducer } from './reducers/associateUnit/addSkuReducer';
import { bulkViewReducer } from './reducers/bulkViewReducer';
import {
    getFilteredDevicesReducer,
    getFilteredLocationsReducer,
    getFilteredStocksReducer,
    getLFStocksReducer,
    getStocksFiltersReducer,
    getStocksReducer,
    getStocksScreenSetReducer
} from './reducers/manage/getStocksReducer';
import { userAccessReducer } from './reducers/userAccessReducer';
import {
    accessbleMenuModulesReducer,
    accessblePathsReducer,
    storeDrawerResponseReducer,
    userAccessCodesReducer,
    userSubMenuCodesReducer
} from './reducers/userAccessCodesReducers';
import {
    deviceLoginReducer,
    forgotPasswordReducer,
    getLicenseReducer,
    getOtpReducer,
    verifyForgotPasswordReducer
} from './reducers/auth/userReducers';
import { versionReducers } from './reducers/versionReducers';
import {
    HeaderLedActionReducer,
    putHeaderActionReducer,
    requestbatchHeaderActionReducer,
    putActionReducer,
    declinedActionReducer
} from './reducers/manage/headerActionReducer';
import { getApplyFiltersReducers } from './reducers/filters/globalFilterReducers';
import {
    getReceivedUnitsReducer,
    getReceiveUnitsReducer,
    getTransferDataReducer,
    transferDataReducer
} from './reducers/transferUnitReducer/transferUnitReducer';
import { changeLocationDataReducere } from './reducers/transferUnitReducer/changeLocationReducer';
import { deleteCollectionReducer } from './reducers/collectionDetailsReducer';
import { flushDataReducer } from './reducers/zebraReducer/flushZebraDataReducer';
import {
    getCurrentRoleActiveDevicesReducres,
    postUserRoleAccessReducers
} from './reducers/userRoleAccessControlReducers';
import { createAlertReducer, errorDialogReducer } from './reducers/alertReducers';
import { appLoadingReducer } from './reducers/appLoaderReducer';
import { requestPulloutDialogReducer, requestPulloutIDReducer } from './reducers/requestUnit';
import {
    associateBatchReducer,
    clearAssociateBatchFormReducer,
    passingAssociatePropsReducer,
    socketResponseReducer
} from './reducers/associateBatchReducers';
import { assignBatchReducers, assignUnitsReducers, multipleAssignReducers } from './reducers/assignBatchReducers';
import {
    breadCrumbsNameReducer,
    deviceAccessDetailsReducer,
    getBatchesByDeviceReducer,
    getRemoteAccessDeviceReducer,
    getRemoteAssignReducer,
    getStatusReportReducer,
    remoteDashboardSocketDataReducer,
    remoteDBAccessDeviceReducers,
    socketSessionIdReducer,
    systemErrorModeReducer
} from './reducers/remoteDashboardReducers';
import { getTableSettingsReducer } from './reducers/settingsReducers/settingsTableReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    deviceLogin: deviceLoginReducer,
    getDevices: getDeviceReducer,
    addDevice: addDeviceReducer,
    updateDevice: updateDeviceReducer,
    deleteDevice: deleteDeviceReducer,
    deviceTypeList: deviceTypeReducer,
    locationTypeList: locationTypeReducer,
    clientList: clientReducer,
    getLocations: getLocationReducer,
    addLocation: addLocationReducer,
    updateLocation: updateLocationReducer,
    deleteLocation: deleteLocationReducer,
    locationTypes: getLocationTypeReducer,
    changeResponse: changeResponseReducer,
    themeSwitch: themeSwitchReducer,
    getDashboard: getDashboardReducer,
    getDashboardEuo: getDashboardEuoReducer,
    getDashboardEuoUnitsIncomplete: getEuoIncompleteUnitsReducer,
    getDashboardEuoBatchIncomplete: getEuoIncompleteBatchReducer,
    ackNotifyEuoSaveStore: ackNotifyEuoSaveReducer,
    alertsEuo: alertsEuoReducer,
    alertsavEuo: alertsavEuoReducer,
    changeRoute: changeRoutesReducer,
    dateFormat: dateFormatSelectionReducer,
    getFiltersCriteria: getFiltersCriteriaReducer,
    getFilter: getFilterReducer,
    getRequestBatchFilter: getRequestBatchFilterReducer,
    getActivityUnitFilter: getActivityUnitFilterReducer,
    getActivityBatchFilter: getActivityBatchFilterReducer,
    getNotifyUnitFilter: getNotifyUnitFilterReducer,
    getNotifyBatchFilter: getNotifyBatchFilterReducer,
    getWastedUnitFilter: getWastedUnitFilterReducer,
    getWastedBatchFilter: getWastedBatchFilterReducer,
    getTransfusedUnitFilter: getTransfusedUnitFilterReducer,
    getTransfusedBatchFilter: getTransfusedBatchFilterReducer,
    getRecipientFilter: getRecipientFilterReducer,
    getUserFilter: getUserFilterReducer,
    getSwapoutFilter: getSwapoutFilterReducer,
    getData: getDataReducer,
    getUserAccessId: getUserRoleIdReducer,
    getDeviceStatus: deviceStatusReducer,
    isLoggedIn: isLoggedInReducer,
    isDeviceLoggedIn: isDeviceLoggedInReducer,
    uploadexcelFile: uploadExcelFileReducer,
    getFormTable: getFormTableReducer,
    getVoucher: getVoucherReducer,
    getDrawer: getDrawerReducer,
    getFormFields: getFieldsReducer,
    postFormFields: postFieldsReducer,
    postSwapoutProcess: postSwapoutReducer,
    putSwapoutCancelProcess: putSwapoutCancelReducer,
    putFormFields: putFieldsReducer,
    putSwapoutProcess: putSwapoutReducer,
    getDropDown: getDropDownReducer,
    get2ndDropdown: get2ndDropdownReducer,
    get3rdDropdown: get3rdDropdownReducer,
    get4thDropdown: get4thDropdownReducer,
    get5thDropdown: get5thDropdownReducer,
    get6thDropdown: get6thdDropdownReducer,
    get7thDropdown: get7thDropdownReducer,
    get8thDropdown: get8thDropdownReducer,
    getCollectionDropdown: getCollectionDropdownReducer,
    profileDetails: profileDetailsReducer,
    voucherRowData: voucherDisplayConf,
    rulePageReducer: rulePageReducer,
    ruleAllPageReducer: ruleAllPageReducer,
    ruleType: ruleType,
    getAll: getAll,
    getNotificationType: getNotificationType,
    putDisplayConfig: putDisplayConfigReducer,
    activeDeactiveActions: activeDeactiveReducer,
    recipientData: getRecipientReducer,
    socketReducer: socketReducer,
    productCodes: getProductCodeReducer,
    addUnitRecipient: postAddUnit,
    getUnitIdSearch: getUnitIdSearchReducer,
    getBatchIdSearch: getBatchIdSearchReducer,
    deleteField: deleteFieldReducer,
    deactivateField: deactivateFieldReducer,
    deleteDisplay: deleteDisplayconfigReducer,
    getBloodGroups: getBloodGroupReducer,
    addSkuUnit: addSkuReducer,
    resolutionType: getResolutionType,
    getResolutionSubType: getResolutionSubType,
    factId: getFactIdReducer,
    notificationId: getNotificationIdReducer,
    resolutionId: getResolutioinIdReducer,
    postRuleType: postRuleTypeReducer,
    getStocks: getStocksReducer,
    getFilteredStocks: getFilteredStocksReducer,
    getFilteredLocations: getFilteredLocationsReducer,
    getFilteredDevices: getFilteredDevicesReducer,
    getStocksFilters: getStocksFiltersReducer,
    getUserAccess: userAccessReducer,
    getStocksScreenSet: getStocksScreenSetReducer,
    ruleBreakReducer: ruleBreakReducer,
    userAccessCodes: userAccessCodesReducer,
    addUserGroup: postAddUserGroupReducer,
    excelData: postExcelGroupReducer,
    postWastedUnit: wastedUnitReducer,
    postWastedBatch: wastedBatchReducer,
    getWastedUnits: getWastedUnitReducer,
    getWastedBatches: getWastedBatchReducer,
    postRemoveEDQ: removeEdqReducer,
    getSocketDevice: getSocketDevice,
    getSocketDeviceValue: getSocketDeviceValue,
    getSocketDeviceSerialnumber: getSocketDeviceSerialnumber,
    getSocketDeviceStatus: getSocketDeviceStatus,
    otpRequest: getOtpReducer,
    forgotPasswordResponse: forgotPasswordReducer,
    verifyForgotPassword: verifyForgotPasswordReducer,
    getAppVersion: versionReducers,
    putHeaderActionResponse: putHeaderActionReducer,
    requestbatchActionResponse: requestbatchHeaderActionReducer,
    putActionResponse: putActionReducer,
    declinedAction: declinedActionReducer,
    HeaderLedActionResponse: HeaderLedActionReducer,
    getStaticFilters: getApplyFiltersReducers,
    bulkViewReducer: bulkViewReducer,
    transferData: transferDataReducer,
    getTransferDataResponse: getTransferDataReducer,
    receivedUnitsStore: getReceivedUnitsReducer,
    changeLocationInfo: changeLocationDataReducere,
    deleteCollection: deleteCollectionReducer,
    flushZebraData: flushDataReducer,
    associateValidation: associateUnitValidationReducer,
    getSocketDeviceConnection: getSocketDeviceConnection,
    getSocketDeviceToken: getSocketDeviceToken,
    postUserRoleAccessStore: postUserRoleAccessReducers,
    getSocketScanData: getSocketScanData,
    getSocketStartStopScan: getSocketStartStopScan,
    alertStore: createAlertReducer,
    deviceWriteTag: deviceWriteTag,
    lfTag: lfTagReducer,
    drawerOpenState: openDrawerReducer,
    globalLoading: appLoadingReducer,
    subMenuCodes: userSubMenuCodesReducer,
    accessablePathsState: accessblePathsReducer,
    accessbleMenuNamesState: accessbleMenuModulesReducer,
    drawerDataState: storeDrawerResponseReducer,
    recieveUnitsStore: getReceiveUnitsReducer,
    postPullOutReducer: postPullOutReducer,
    getLFConnectionStatus: getLFConnectionStatus,
    getLFDevice: getLFDevice,
    getLFStocks: getLFStocksReducer,
    errorDialogState: errorDialogReducer,
    refreshPullOut: refreshPulloutDataReducer,
    requestRemoteAllocation: requestRemoteAllocationReducer,
    compatabilityPdfSlip: compatabilityPdfReducer,
    validationSlipUpdate: validationSlipUpdateReducer,
    pulloutDialog: requestPulloutDialogReducer,
    accessRoleDevices: getCurrentRoleActiveDevicesReducres,
    requestPullOutCancel: pullOutCancelActionReducer,
    refskuTableData: getRefSkuDataReducer,
    requestPulloutIDStore: requestPulloutIDReducer,
    getAddDrawer: getAddDrawerReducer,
    associateBatch: associateBatchReducer,
    assignBatchStore: assignBatchReducers,
    multipleAssignStore: multipleAssignReducers,
    assignUnitsStore: assignUnitsReducers,
    clearAssociateBatchForm: clearAssociateBatchFormReducer,
    deviceAccessDetailsStore: deviceAccessDetailsReducer,
    systemErrorMode: systemErrorModeReducer,
    remoteDashboardSocketData: remoteDashboardSocketDataReducer,
    AccessDeviceStore: getRemoteAccessDeviceReducer,
    getLicense: getLicenseReducer,
    getUnitBatch: getUnitBatchReducer,
    breadCrumbsNameStore: breadCrumbsNameReducer,
    getResponseData: getResponseDataReducer,
    socketSessionIdStore: socketSessionIdReducer,
    remoteDBAccessDeviceStore: remoteDBAccessDeviceReducers,
    remoteAssignStore: getRemoteAssignReducer,
    getBatchesByDeviceStore: getBatchesByDeviceReducer,
    passingAssociatePropStore: passingAssociatePropsReducer,
    socketResponseStore: socketResponseReducer,
    assignUnitSocketStore: assignUnitDeviceReducer,
    getStatusReport: getStatusReportReducer,
    bulkScanLoadingStore: bulkScanLoadingReducer,
    currentPcStore: currentPcReducer,
    assignWriteRecipientStore: assignWriteRecipientReducer,
    putRuleResponse: putRuleTypeReducer,
    errorReportDataStore: errorReportDataReducer,
    getDashboardTemperature: getTemperatureReducer,
    getDashboardGraph: getTemperatureGraphReducer,
    notificationSettingsStore: notificationSettingsReducer,
    swapoutEmailSettingsStore: swapoutEmailReducer,
    preEncodedLocalDataStore: preEncodedLocalDataReducer,
    assignDataLocalDataStore: assignDataLocalDataReducer,
    settingsLocalDataStore: settingsLocalDataReducer,
    settingsBatchDataStore: settingsBatchDerervationDataReducer,
    settingsRemoteLoginPageStore: settingsRemoteLoginPageReducer,
    associateBatchState: associateBatchStateReducer,
    associateBarcodeState: associateBarcodeStateReducer,
    getAllDeviceData: getDeviceDataReducer,
    settingsTable: getTableSettingsReducer,
    getRecipientCount: getRecipientCountReducer,
     getDashCount: getDashCountReducer
});
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        'getDrawer',
        'userLogin',
        'deviceLogin',
        'getLicense',
        'getUserAccess',
        'userAccessCodes',
        'subMenuCodes',
        'accessablePathsState',
        'accessbleMenuNamesState',
        'drawerDataState',
        'deviceWriteTag',
        'lfTag'
    ]
};
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const deviceUserInfoFromStorage = localStorage.getItem('deviceUserInfo')
    ? JSON.parse(localStorage.getItem('deviceUserInfo'))
    : null;
const themeFromStorage = localStorage.getItem('themeColor')
    ? JSON.parse(localStorage.getItem('themeColor'))
    : 'themePrimary';
const apiBehaviorFromStorage = localStorage.getItem('apiBehavior')
    ? JSON.parse(localStorage.getItem('apiBehavior'))
    : 'static';
const clearFormsFromStorage = localStorage.getItem('clearForms')
    ? JSON.parse(localStorage.getItem('clearForms'))
    : false;
const routesTypeFromStorage = localStorage.getItem('routesType')
    ? JSON.parse(localStorage.getItem('routesType'))
    : 'staticRoute';

const dateFormatFromStorage = localStorage.getItem('dateFormat')
    ? JSON.parse(localStorage.getItem('dateFormat'))
    : 'DD-MMM-YYYY HH:mm a';
const associateUnitValidationFromStorage = localStorage.getItem('AssociateUnitValidation')
    ? JSON.parse(localStorage.getItem('AssociateUnitValidation'))
    : true;

const isLoggedInFromStorage = localStorage.getItem('isLoggedIn') ? localStorage.getItem('isLoggedIn') : false;
const isLoggedInDeviceFromStorage = localStorage.getItem('isLoggedInDevice')
    ? localStorage.getItem('isLoggedInDevice')
    : false;
const isPullOutDialogOpen = localStorage.getItem('dialogOpenLocalStore')
    ? localStorage.getItem('dialogOpenLocalStore')
    : false;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    deviceLogin: { deviceUserInfo: deviceUserInfoFromStorage },
    themeSwitch: { themeColor: themeFromStorage },
    changeResponse: { apiBehavior: apiBehaviorFromStorage },
    changeRoute: { routesType: routesTypeFromStorage },
    dateFormat: { dateFormat: dateFormatFromStorage },
    isLoggedIn: { isLoggedIn: isLoggedInFromStorage },
    // isLoggedInDevice: { isLoggedInDevice: isLoggedInDeviceFromStorage },
    associateValidation: { validationRequired: associateUnitValidationFromStorage },
    pulloutDialog: { pullOutDialogOpen: isPullOutDialogOpen },
    clearAssociateBatchForm: { clearForms: clearFormsFromStorage }
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, reducer);
// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export const persistor = persistStore(store);
export default store;
