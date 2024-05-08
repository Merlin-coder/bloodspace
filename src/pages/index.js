import SettingsPage from './settings/settings.container';
import AddUnitPage from './add-unit/add-unit.container';
import AddRecepient from 'components/add-recepient/add-recepient.container';
// import AssignPage from './assign/assign-page/assign-page.container';
import MergedAssign from './assign/assign-page/mergedAssign';
import MergedUnassign from './unassign/mergedUnassign';
import UnitDashboard from './unitdashboard/index';
import RecepientPage from './assign/recepient-page/recepient-page.container';
import DashboardPage from '../pages/dashboard';
import ProfilePage from 'pages/profile';
import { ManagePage, RulePage } from './manage';
import StockTally from 'pages/stock-tally';
import SwapOut from 'pages/swapout';
import StockPage from './reports/stock/index';
import StockPage1 from './reports/stock1/index';
import RequestUnit from './request-unit/index';
import ScManage from './manage/ScManage';
import { ImagePage, Subscription } from './manage';
import Database from './database';
import ScManageView from './scView';
import Excel from './excel';
import Rules from './rules';
import Wastedunit from './wastedUnit'; 
import Wastedbatch from './wastedBatch';
import Remoteallocation from './remoteAllocation';
import Compatibilityslip from './compatibilitySlip';
import dashboardEUO from './dashboardEuo';
import dashboardEuoUnits from './dashboardEuoUnits';
import dashboardEuoBatch from './dashboardEuoBatch';
import CompatabilityslipValidation from '../pages/remoteFridge/components/compatabilitySlip/index';
import EdqsBatch from '../pages/remoteFridge/components/edqsBatch/index';
import BatchProductStock from './batchproduct-stock';
import TagConfig from './tag-config';
import Simulation from './simulation';
import TransferUnit from './transfer-unit';
import BarcodeEntry from './barcode-entry';
import MoveIn from './movein';
import MoveOut from './moveOut';
import Batch from './batch';
import ReceiveUnit from './receive-unit';
import TransactionVoucher from './scView/transactionVoucher';
import ActionsInAccordionSummary from './user-role-access';
import AssociateBatch from './associate-batch';
import BatchRecepientPage from './assign-batch/recepient-page/recepient-page.container';

export {
    DashboardPage,
    SettingsPage,
    AddUnitPage,
    StockPage,
    StockPage1,
    AddRecepient,
    // AssignPage,
    MergedAssign,
    MergedUnassign,
    UnitDashboard,
    RecepientPage,
    ManagePage,
    ProfilePage,
    RulePage,
    RequestUnit,
    StockTally,
    SwapOut,
    ScManage,
    ImagePage,
    Subscription,
    Database,
    ScManageView,
    Excel,
    Rules,
    BatchProductStock,
    TagConfig,
    Simulation,
    TransferUnit,
    BarcodeEntry,
    MoveIn,
    MoveOut,
    Batch,
    ReceiveUnit,
    TransactionVoucher,
    ActionsInAccordionSummary,
    AssociateBatch,
    BatchRecepientPage,
    dashboardEUO,
    dashboardEuoUnits,
    dashboardEuoBatch,
    EdqsBatch,
    Wastedunit,
    Wastedbatch,
    Remoteallocation,
    CompatabilityslipValidation,
    Compatibilityslip
};
