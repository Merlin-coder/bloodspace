import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

//local imports
import pageBreadcrumbsMappings from '../components/breadcrumbs/page-breadcrumbs-mappings';
import PrivateRoute from './PrivateRoute';
import PageNotFound from 'components/404Page';
import FormBuilder from 'components/formBuilder/index2';
import {
    SettingsPage,
    AddUnitPage,
    StockPage,
    StockPage1,
    DashboardPage,
    // AssignPage,
    MergedAssign,
    RecepientPage,
    RulePage,
    ProfilePage,
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
    Wastedunit,
    Wastedbatch,
    Remoteallocation,
    Compatibilityslip,
    TagConfig,
    TransferUnit,
    BarcodeEntry,
    MoveIn,
    MoveOut,
    Batch,
    ReceiveUnit,
    ActionsInAccordionSummary,
    TransactionVoucher,
    AssociateBatch,
    BatchRecepientPage,
    BatchProductStock,
    dashboardEUO,
    dashboardEuoUnits,
    dashboardEuoBatch,
    CompatabilityslipValidation,
    EdqsBatch,
} from '../pages';
import simulation from 'pages/simulation/index';
import remoteAssign from 'pages/remoteAssign/index'
import MergedUnassign from 'pages/unassign/mergedUnassign';
import UnitDashboard from 'pages/unitdashboard/index';
import AccessDevicePage from 'pages/remoteFridge';
import RemoteDashboardPage from 'pages/remoteFridge/remoteDashboard';
import AssignBatch from 'pages/assign-batch/assign-page/assign-page.container';
import RequestBatch from 'pages/request-batch';

const AppRoutes = () => {
    let mOption = pageBreadcrumbsMappings();

    //global state
    const { accessablePaths } = useSelector((state) => state.accessablePathsState);
    const { accessbleMenuNames } = useSelector((state) => state.accessbleMenuNamesState);

    console.log('accessablePaths' + accessablePaths);
    console.log('accessbleMenuNames' + accessbleMenuNames);
    console.log('mOption' + mOption);

    return (
        <Switch>
            {/* dynamic routes */}
            {console.log('mOption:', mOption)};
            {mOption.map((item) =>
                item.name === '/dashboard/remote-dashboard' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/remote-dashboard"
                        component={RemoteDashboardPage}
                        />
                 ) : item.name === '/dashboard/settings' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/settings"
                        data={item.breadcrumbs}
                        component={SettingsPage}
                    />
                ) : item.name === '/dashboard' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard" component={DashboardPage} />
                ) : item.name === '/dashboard/associate-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/associate-unit" component={AddUnitPage} />
                ) : item.name === '/dashboard/dashboard-euo' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/dashboard-euo" component={dashboardEUO} />
                ) : item.name === '/dashboard/dashboard-euo' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/dashboard-euo/recipientUnits"
                        component={dashboardEuoUnits}
                    />
                                ) : item.name === '/dashboard/Edqs-batch' && accessablePaths?.includes(item.name) ? (
                                    <PrivateRoute
                                        key={item?.name}
                                        exact
                                            path="/dashboard/Edqs-batch"
                                            component={EdqsBatch}
                                    />
                                        )
                                            : item.name === '/dashboard/compatability-slip' && accessablePaths?.includes(item.name) ? (
            <PrivateRoute
                key={item?.name}
                exact
                path="/dashboard/compatability-slip"
                component={CompatabilityslipValidation}
            />
            )

                                    : item.name === '/dashboard/dashboard-euo' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/barcode-entry/movein" component={MoveIn} />
                ) : item.name === '/dashboard/dashboard-euo' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/barcode-entry/moveout" component={MoveOut} />
                ) : item.name === '/dashboard/dashboard-euo' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/barcode-entry/batch" component={Batch} />
                ) : item.name === '/dashboard/assign-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/assign-unit" component={MergedAssign} />
                ) : item.name === '/dashboard/unit-dashboard' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/unit-dashboard" component={UnitDashboard} />
                ) : item.name === '/dashboard/unassign-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/unassign-unit" component={MergedUnassign} />
                ) : item.name === '/dashboard/database' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/database" component={Database} />
                ) : item.name === '/dashboard/stock' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/stock" component={StockPage1} />
                ) : item.name === '/dashboard/stock-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/stock-unit" component={StockPage} />
                ) : item.name === '/dashboard/manage/rule' ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/manage/rule" component={RulePage} />
                ) : item.name === '/dashboard/request-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/request-unit"
                        data={item.breadcrumbs}
                        component={RequestUnit}
                    />
                ) : item.name === '/dashboard/reports/wasted-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/reports/wasted-unit"
                        data={item.breadcrumbs}
                        component={Wastedunit}
                    />
                ) : item.name === '/dashboard/reports/wasted-batch' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/reports/wasted-batch"
                        data={item.breadcrumbs}
                        component={Wastedbatch}
                    />
                ) : item.name === '/dashboard/LIS-Simulation' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/LIS-Simulation"
                        data={item.breadcrumbs}
                        component={Remoteallocation}
                    />
                //) : item.name === '/dashboard/simulation' && accessablePaths?.includes(item.name) ? (
                //    <PrivateRoute
                //        key={item?.name}
                //        exact
                //        path="/dashboard/simulation"
                //        data={item.breadcrumbs}
                //        component={simulation}
                //    /> 
                ) : item.name === '/dashboard/compatibility' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/compatibility"
                        data={item.breadcrumbs}
                        component={Compatibilityslip}
                    />
                ) :item.name === '/dashboard/batchproduct-stock' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/batchproduct-stock"
                        data={item.breadcrumbs}
                        component={BatchProductStock}
                    />
                ) : item.name === '/dashboard/request-batch' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/request-batch"
                        data={item.breadcrumbs}
                        component={RequestBatch}
                    />
                ) : item.name === '/dashboard/swapout' && accessablePaths?.includes(item.name) ? (
            <PrivateRoute
                key={item?.name}
                exact
                path="/dashboard/swapout"
                data={item.breadcrumbs}
                component={SwapOut}
            />
            ) :
               item.name === '/dashboard/transfer-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/transfer-unit"
                        data={item.breadcrumbs}
                        component={TransferUnit}
                    />
                ) : item.name === '/dashboard/reports/notification/:id' ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/reports/notification/:id"
                        component={RulePage}
                    />
                ) : (item.type === 'manage' || item.type === 'reports') &&
                  accessbleMenuNames &&
                  accessbleMenuNames?.includes(item.type) ? (
                    <PrivateRoute key={item?.name} path={item.name} data={item.breadcrumbs} component={ScManage} />
                ) : item.name === '/dashboard/manage/rule' ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/manage/rule" component={RulePage} />
                ) : item.name === '/dashboard/manage/image' ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/manage/image" component={ImagePage} />
                ) : item.name === '/dashboard/accounts/edit' ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/accounts/edit" component={ProfilePage} />
                ) : item.name === '/dashboard/manage/subscription' ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/manage/subscription"
                        component={Subscription}
                    />
                ) : item.name === '/dashboard/associate-batch' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/associate-batch" component={AssociateBatch} />
                ) : item.name === '/dashboard/assign-batch' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/assign-unit" component={MergedAssign} />
                ) : item.name === '/dashboard/user-access-control' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute
                        key={item?.name}
                        exact
                        path="/dashboard/user-access-control"
                        component={ActionsInAccordionSummary}
                    />
                ) : item.name === '/dashboard/transfer-unit' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/transfer-unit" component={TransferUnit} />
                ) : item.name === '/dashboard/barcode-entry' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/barcode-entry" component={MoveIn} />
                ) : item.name === '/dashboard/batch-barcode-entry' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/batch-barcode-entry" component={Batch} />
                ) : item.name === '/dashboard/batch' && accessablePaths?.includes(item.name) ? (
                    <PrivateRoute key={item?.name} exact path="/dashboard/batch" component={Batch} />
                ) : null
            )}
            {/* static routes */}
            <PrivateRoute exact path="/dashboard/transaction-voucher/:id" component={TransactionVoucher} />
            <PrivateRoute exact path="/dashboard/receive-unit" component={ReceiveUnit} />
            <PrivateRoute exact path="/dashboard/assign-unit/r/:id" component={RecepientPage} />
            <PrivateRoute exact path="/dashboard/assign-batch/r/:id" component={BatchRecepientPage} />
            <PrivateRoute exact path="/dashboard/accounts/edit" component={ProfilePage} />
            <PrivateRoute exact path="/dashboard/form" component={FormBuilder} />
            <PrivateRoute exact path="/dashboard/tagconfig" component={TagConfig} />
            <PrivateRoute exact path="/dashboard/accounts/notifications" component={ProfilePage} />
            <PrivateRoute exact path="/dashboard/accounts/password" component={ProfilePage} />
            {/*  <PrivateRoute path="/dashboard/wastedunits" component={Wastedunit} />*/}

            {mOption.map((item) => (
                <PrivateRoute
                    key={item?.name}
                    data={item.breadcrumbs}
                    path="/dashboard/v/:id"
                    component={ScManageView}
                />
            ))}
            <PrivateRoute path="/dashboard/excel" component={Excel} />
            <PrivateRoute path="/dashboard/rules" component={Rules} />

            <PrivateRoute path="/dashboard/dashboard EUO" component={dashboardEUO} />
            {mOption.map((item) => (
                <PrivateRoute
                    key={item?.name}
                    data={item.breadcrumbs}
                    path="/dashboard/dashboard-euo/recipientUnits"
                    component={dashboardEuoUnits}
                />
            ))}

            <PrivateRoute path="/dashboard/compatability-slip" component={CompatabilityslipValidation} />
            {mOption.map((item) => (
                <PrivateRoute
                    key={item?.name}
                    data={item.breadcrumbs}
                    path="/dashboard/compatability-slip"
                    component={CompatabilityslipValidation}
                />
            ))}


            {/*{mOption.map((item) => (*/}
            {/*    <PrivateRoute*/}
            {/*        key={item?.name}*/}
            {/*        data={item.breadcrumbs}*/}
            {/*        path="/dashboard/barcode-entry/movein"*/}
            {/*        component={MoveIn}*/}
            {/*    />*/}
            {/*))}*/}

            {/*{mOption.map((item) => (*/}
            {/*    <PrivateRoute*/}
            {/*        key={item?.name}*/}
            {/*        data={item.breadcrumbs}*/}
            {/*        path="/dashboard/barcode-entry/moveout"*/}
            {/*        component={MoveOut}*/}
            {/*    />*/}
            {/*))}*/}

            {/*{mOption.map((item) => (*/}
            {/*    <PrivateRoute*/}
            {/*        key={item?.name}*/}
            {/*        data={item.breadcrumbs}*/}
            {/*        path="/dashboard/barcode-entry/batch"*/}
            {/*        component={Batch}*/}
            {/*    />*/}
            {/*))}*/}

            {mOption.map((item) => (
                <PrivateRoute
                    key={item?.name}
                    data={item.breadcrumbs}
                    path="/dashboard/dashboard-euo/recipientBatchproducts"
                    component={dashboardEuoBatch}
                />
            ))}

            {/*<PrivateRoute path="/dashboard/batchproduct-stock" component={BatchProductStock} />*/}

            {/* <PrivateRoute exact path="/dashboard/user-access-control" component={ActionsInAccordionSummary} /> */}
            <PrivateRoute exact path="/dashboard/stock-tally" component={StockTally} />
            <PrivateRoute exact path="/dashboard/simulation" component={simulation} />
            <PrivateRoute exact path="/dashboard/remoteassign" component={remoteAssign} />
            <PrivateRoute
                exact
                path="/dashboard/user-access-control/voucher/:id"
                component={ActionsInAccordionSummary}
            />
            {/* {isLoggedInDevice ? (
                <PrivateRoute exact path="/dashboard/access-device" component={AccessDevicePage} />
            ) : (
                <Redirect to="/dashboard/remote-dashboard" />
            )} */}
            <PrivateRoute exact path="/dashboard/access-device" component={AccessDevicePage} />
            <PrivateRoute exact path="*" component={PageNotFound} />
        </Switch>
    );
};

export default AppRoutes;
