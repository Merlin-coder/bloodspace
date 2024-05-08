// import drawerResponse from '../../JSON/drawer.json';
import { store } from '../../redux/store';
export default function pageBreadcrumbsMappings() {
    const state = store.getState();
    let obj = state.drawerDataState?.drawerData?.data;
    let mObj = [];
    if (obj?.length > 0) {
        for (let objElement of obj) {
            if (objElement?.drawerData && objElement?.drawerData.length > 0) {
                for (let item of objElement.drawerData) {
                    let breadcrumbs = [];
                    let drawerOption = {};
                    drawerOption.name = item.path;
                    drawerOption.type = item.type;
                    let mBreadcrumbsObj = {};
                    let mBreadcrumbsObj1 = {};
                    mBreadcrumbsObj.label = item.name;
                    mBreadcrumbsObj.isDisabled = false;
                    mBreadcrumbsObj.link = item.path;
                    mBreadcrumbsObj.fields = item.fields;
                    mBreadcrumbsObj.validation = item.validation;
                    mBreadcrumbsObj.urlEndPoint = item.collectionName;
                    mBreadcrumbsObj.code = item.code;
                    mBreadcrumbsObj.mainMenuCode = objElement.code;
                    mBreadcrumbsObj.screenId = item.screenId;
                    mBreadcrumbsObj1.urlEndPoint = obj.urlEndPoint;
                    mBreadcrumbsObj1.label = objElement.name;
                    mBreadcrumbsObj1.isDisabled = true;
                    breadcrumbs.push(mBreadcrumbsObj1);
                    breadcrumbs.push(mBreadcrumbsObj);
                    drawerOption.breadcrumbs = breadcrumbs;
                    mObj.push(drawerOption);
                }
            } else {
                let drawerOption = {};
                drawerOption.name = objElement.path;
                drawerOption.type = objElement.type;
                let breadcrumbs = [];
                let mBreadcrumbsObj = {};
                mBreadcrumbsObj.label = objElement.name;
                mBreadcrumbsObj.isDisabled = false;
                mBreadcrumbsObj.link = objElement.path;
                mBreadcrumbsObj.urlEndPoint = objElement.collectionName;
                mBreadcrumbsObj.fields = objElement.fields;
                mBreadcrumbsObj.code = objElement.code;
                // mBreadcrumbsObj.screenId = objElement.screenId;
                breadcrumbs.push(mBreadcrumbsObj);
                drawerOption.breadcrumbs = breadcrumbs;
                mObj.push(drawerOption);
            }
        }
    } else {
        let drawerOption = {};
        drawerOption.name = '/dashboard/settings';
        // let mBreadcrumbsObj = {};
        // mBreadcrumbsObj.label = 'Settings';
        mObj.push(drawerOption);
    }
    return mObj;
}
