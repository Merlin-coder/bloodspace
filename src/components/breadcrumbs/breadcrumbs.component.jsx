import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { breadcrumbsStyles } from './breadcrumbs.style';
import { Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setScreeenIndex } from 'redux/actions/manage/stocksActions';

const SimpleBreadcrumbsComponent = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = breadcrumbsStyles();
    const { pathObj } = props;
    //let title=localStorage.getItem('title');
    let currentRowName = null; // Default value

    const localStorageValue = localStorage.getItem('currentRowName');
    if (localStorageValue !== undefined && localStorageValue !== null) {
        try {
            currentRowName = JSON.parse(localStorageValue);
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
        }
    }
    let url = location.pathname.split('/');
    const { screenIndex } = useSelector((state) => state.getStocksScreenSet);
    const breadCrumbsNameStore = useSelector((state) => state.breadCrumbsNameStore);
    let currentRowIndex = currentRowName ? url.findIndex((item) => item === currentRowName.toLowerCase()) : '';
    if (currentRowIndex > 0) {
        let previousRowName = url.filter((item, index) => index === currentRowIndex - 1)[0];
        localStorage.setItem('previousRowName', JSON.stringify(previousRowName));
        url = url.filter((item, index) => index <= currentRowIndex);
    }
    let label1 = url[2];
    let label2 = url[3];
    let label3 = url[4] === 'undefined' || url[4] === 'null' ? '' : url[4];
    let label4 = url[5] === 'undefined' || url[5] === 'null' ? '' : url[5];
    let label5 = url[6] === 'undefined' || url[6] === 'null' ? '' : url[6];
    let label6 = url[7] === 'undefined' || url[7] === 'null' ? '' : url[7];
    if (location?.pathname?.includes('user-access-control') && location?.pathname?.includes('voucher')) {
        let templabel3 = url[4]?.split(' ');
        label3 = templabel3?.length > 2 ? `${templabel3[0]} ${templabel3[1]}` : templabel3[0];
    }

    if (label2 === 'r') {
        if (label3 === 'emergency') {
            label2 = 'Emergency assign';
        } else {
            let recipientId = location.pathname.split('/').pop();

            let recipientName1 = JSON.parse(localStorage.getItem('recipientData'))
            console.log('name-----', recipientName1)
            // let recipientName =
            //     recipientName1 && Object.keys(recipientName1).includes('recipientId')
            //         ? recipientName1.recipientId[0]
            //         : recipientName1;
            // console.log(recipientName,recipientName1,'inside breadCrumbs')
            label2 = `${recipientName1?.firstName ?? ''}  ${recipientName1?.lastName ?? ''}`;
        }
    }
    const breadScrumbUrl = `/dashboard/${label2}/${label3}`;

    function handleClick() {
        history.push(breadScrumbUrl);
    }

    const handlelabelClick = (label, name) => {
        localStorage.setItem('currentRowName', JSON.stringify(name));
        let labelCount = label6 ? label.charAt(label.length - 1) - 6 : label5 ? label.charAt(label.length - 1) - 5 : 0;
        if (name.toLowerCase() !== currentRowName.toLowerCase()) {
            history.go(labelCount);
        }
    };
    return (
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>

            
            {/*{location.pathname === '/dashboard/request-unit' || location.pathname === '/dashboard/request-batch' || location.pathname === '/dashboard/reports/notifications'  && screenIndex === 1 ? (*/}
            {/*    <div className={classes.div}>*/}
            {/*        <Typography className={classes.typographylong}>*/}
            {/*            {title !==undefined ? title:'Units in Stock'}*/}
            {/*        </Typography>*/}
            {/*    </div>*/}
            {/*) :*/}
            {/*location.pathname === '/dashboard/stock-unit' && screenIndex === 1 ? (*/}
            {location.pathname === '/dashboard/stock-unit' && screenIndex === 1 ? (
                <div className={classes.div}>
                    <Typography className={classes.typographylong}>
                        Units in Stock
                        <span className={label5 ? classes.typographylong5 : classes.typographylong3}>/</span>
                    </Typography>
                    <Typography className={classes.typographylong2}>Request Unit</Typography>
                </div>
            ) : // : location.pathname === '/dashboard/assign-unit' ? (
            //     <>
            //         <div className={classes.div}>
            //             <Typography className={classes.typographylong}>
            //                 Assign Unit
            //                 <span className={label5 ? classes.typographylong5 : classes.typographylong3}>/</span>
            //             </Typography>
            //             <Typography className={classes.typographylong2}>Request Unit</Typography>
            //         </div>
            //     </>
            // )
            pathObj?.breadcrumbs ? (
                pathObj?.breadcrumbs?.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={item.link}
                            className={`${item.isDisabled ? classes.disabled : ''} ${classes.breadcrumbNav}`}
                        >
                            <Typography className={classes.typography}>{item.label}</Typography>
                        </Link>
                    );
                })
            ) : url[2] === 'v' ? (
                <div className={classes.div}>
                    <Typography className={label5 ? classes.typographylong4 : classes.typographylong2}>
                        {url[3]}
                        <span className={label5 ? classes.typographylong5 : classes.typographylong3}>/</span>
                    </Typography>
                    {label3 ? (
                        <Typography
                            onClick={handleClick}
                            className={label5 ? classes.typographylong4 : classes.typographylong2}
                        >
                            {label3}
                            <span className={label5 ? classes.typographylong5 : classes.typographylong3}>/</span>
                        </Typography>
                    ) : null}
                    {label4 ? (
                        <Typography
                            onClick={() => handlelabelClick('label4', label4)}
                            className={label5 ? classes.typographylong4 : classes.typographylong2}
                        >
                            {label4}
                            {label5 ? (
                                <span className={label5 ? classes.typographylong5 : classes.typographylong3}>/</span>
                            ) : null}
                        </Typography>
                    ) : null}
                    {label5 ? (
                        <Typography
                            onClick={() => handlelabelClick('label5', label5)}
                            className={label5 ? classes.typographylong4 : classes.typographylong2}
                        >
                            {label5}
                            {label6 ? (
                                <span className={label5 ? classes.typographylong5 : classes.typographylong3}>/</span>
                            ) : null}
                        </Typography>
                    ) : null}
                    {label6 ? (
                        <Typography
                            onClick={() => handlelabelClick('label6', label6)}
                            className={label5 ? classes.typographylong4 : classes.typographylong2}
                        >
                            {label6}
                        </Typography>
                    ) : null}
                </div>
            ) : (
                <div className={classes.div}>
                    <Typography className={classes.typographylong}>
                        {label1 === 'receive-unit'
                            ? 'Receive Unit'
                            : label1 === 'access-device'
                            ? breadCrumbsNameStore
                            : label1}
                        {label2 ? (
                            <span className={label5 ? classes.typographylong5 : classes.typographylong3}>/</span>
                        ) : null}
                    </Typography>
                    <Typography onClick={handleClick} className={classes.typographylong2}>
                        {location?.pathname?.includes('user-access-control') ? label3 : label2}
                    </Typography>
                </div>
            )}
        </Breadcrumbs>
    );
};

export default SimpleBreadcrumbsComponent;
