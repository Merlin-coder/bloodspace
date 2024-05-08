import SimpleBreadcrumbsComponent from './breadcrumbs.component';
import React from 'react';
import _ from 'lodash';
import pageBreadcrumbsMappings from './page-breadcrumbs-mappings';

const SimpleBreadcrumbs = (props) => {
    const pathObj = _.find(pageBreadcrumbsMappings(), { name: props.name });
    return <SimpleBreadcrumbsComponent pathObj={pathObj} screen={screen }/>;
};

export default SimpleBreadcrumbs;

