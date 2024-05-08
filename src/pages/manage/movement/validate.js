// import { Grid, InputLabel, makeStyles, Typography } from '@material-ui/core';
// import React from 'react';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import CancelIcon from '@material-ui/icons/Cancel';
// import { CustomButton, CustomSearch } from 'common';
// import CustomInput from 'components/inputfeild';
// import SelectOption from 'components/select';
// import RuleType from './RuleType.json';
// import SpecificRuleType from './SpecificRuleType.json';
// import emailTemp from '../../../JSON/JEmailTemp.json';
// import productType from '../../../JSON/JProductType.json';

// import userGroup from '../../../JSON/JUserGroup.json';
// import alert from '../../../JSON/JAlert.json';
// import subType from '../../../JSON/SubType.json';
// import ruleCondition from '../../../JSON/JRuleCondition.json';
// import transportGroup from '../../../JSON/JTransportGroup.json';
// import oldAlerts from '../../../JSON/JAlerts.json';
// import deviceGroupType from '../../../JSON/JDeviceGroup.json';
// import { addResolution } from '../../../redux/actions/manage/rulePageAction';
// import { useDispatch, useSelector } from 'react-redux';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         padding: '50px 60px'
//     },
//     factsBox: {
//         marginTop: '40px',
//         padding: '40px 30px',
//         border: `2px dashed ${theme.palette.primary.main}`,
//         backgroundColor: '#f5f5f5'
//     },
//     factsInputBox: {
//         marginTop: '20px',
//         padding: '40px 30px',
//         border: `2px solid black`
//     },
//     textMain: {
//         fontSize: '22px',
//         fontWeight: '500'
//     },
//     textSub: {
//         fontSize: '16px',
//         fontWeight: '400'
//     },
//     inputLabel: {
//         marginBottom: '5px'
//     },
//     saveButton: {
//         marginTop: '30px'
//     },
//     factsArray: {
//         marginTop: '40px',
//         padding: '10px 30px',
//         border: '1px solid black',
//         borderLeft: `6px solid ${theme.palette.primary.main}`,
//         boxShadow: '0px 0px 6px 3px #eee'
//     },
//     index: {
//         fontSize: '24px',
//         fontWeight: 'bold'
//     },
//     name: {
//         fontSize: '20px',
//         fontWeight: '500',
//         color: theme.palette.primary.main,
//         textTransform: 'capitalize',
//         marginLeft: '60px'
//     },
//     paddingBottom: {
//         paddingBottom: '40px'
//     }
// }));

// const Resolution = () => {
//     const classes = useStyles();
//     const [showFactsInput, setShowFactsInput] = React.useState(false);
//     const [mainTypeValue, setMainTypeValue] = React.useState('');
//     const [subTypeValue, setSubTypeValue] = React.useState('');
//     const [specificRule, setSpecificRule] = React.useState([]);
//     const [resolutionName, setResolutionName] = React.useState('');
//     const [add, setAdd] = React.useState(false);
//     const dispatch = useDispatch();
//     const resolutionArray = useSelector((state) => state.rulePageReducer.resolution);

//     const handleMainTypeChange = (e) => {
//         setMainTypeValue(e.target.value);
//     };
//     const handleSubTypeChange = (e) => {
//         setSubTypeValue(e.target.value);
//     };
//     const [resolutionValue, setResolutionValue] = React.useState({
//         productType: '',
//         alertType: '',
//         userGroup: '',
//         mainType: '',
//         subType: '',
//         ruleCondition: '',
//         transportGroup: '',
//         deviceGroup: ''
//     });

//     const handleChangeSelect = (event) => {
//         const value = event.target.value;
//         setResolutionValue({
//             ...resolutionValue,
//             [event.target.name]: value
//         });
//     };
//     const handleFactSave = () => {
//         let resolution = {};
//         Object.keys(resolutionValue).forEach((key) => {
//             if (resolutionValue[key] !== '') {
//                 resolution = { ...resolution, [key]: resolutionValue[key] };
//             }
//         });
//         const item = { resolutionName, resolution };
//         dispatch(addResolution(item));

//         setMainTypeValue('');
//         setSubTypeValue('');
//         setSpecificRule('');
//         setResolutionName('');
//         setShowFactsInput(false);
//         setAdd(false);
//     };
//     const handleFactsBox = () => {
//         setMainTypeValue('');
//         setSubTypeValue('');
//         setSpecificRule('');
//         setResolutionName('');
//         setShowFactsInput(false);
//         setAdd(false);
//     };
//     React.useEffect(() => {
//         const arr = SpecificRuleType.data.filter((value) => value.type === mainTypeValue);
//         setSpecificRule(arr);
//     }, [mainTypeValue]);
//     console.log('vomp', resolutionArray);
//     return (
//         <Grid container className={classes.root}>
//             <Grid container justify="flex-end" spacing={5} alignItems="center">
//                 <Grid item>
//                     <Grid container spacing={1}>
//                         <Grid item>
//                             <AddCircleOutlineIcon onClick={() => setAdd(true)} color="primary" />
//                         </Grid>
//                         <Grid item>
//                             <Typography> Add</Typography>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item>
//                     <Grid container spacing={1}>
//                         <Grid item>
//                             <CancelIcon color="error" />
//                         </Grid>
//                         <Grid item>
//                             <Typography>Reset</Typography>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item>
//                     <CustomSearch height={'10px'} />
//                 </Grid>
//             </Grid>
//             {showFactsInput || add ? (
//                 <Grid container className={classes.factsInputBox}>
//                     <Grid container spacing={4} justify="flex-start">
//                         <Grid item xs={12} md={4} lg={4} className={classes.inputField}>
//                             <InputLabel className={classes.inputLabel}>Name</InputLabel>
//                             <CustomInput
//                                 name="name"
//                                 fullWidth
//                                 style={{ width: 300 }}
//                                 className={classes.textField}
//                                 size="md"
//                                 onChange={(e) => setResolutionName(e.target.value)}
//                                 value={resolutionName}
//                                 variant="outlined"
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={4} className={classes.inputField}>
//                             <InputLabel className={classes.inputLabel}>Type</InputLabel>
//                             <SelectOption
//                                 label="Select Type"
//                                 onChange={handleChangeSelect}
//                                 type
//                                 name="mainType"
//                                 options={alert.data}
//                                 value={resolutionValue.mainType}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4} lg={4} className={classes.inputField}>
//                             <InputLabel className={classes.inputLabel}>Sub Type</InputLabel>
//                             <SelectOption
//                                 label="Select Sub Type"
//                                 onChange={handleChangeSelect}
//                                 options={
//                                     resolutionValue.alertType === 'Email'
//                                         ? emailTemp.data
//                                         : resolutionValue.alertType === 'SMS'
//                                         ? subType.data
//                                         : subType.data
//                                 }
//                                 diff
//                                 name="subType"
//                                 value={resolutionValue.subType}
//                             />
//                         </Grid>
//                         {resolutionValue.alertType === 'Popup' ? (
//                             <Grid item xs={12} md={4} lg={4} className={classes.inputField}>
//                                 <InputLabel className={classes.inputLabel}>Message</InputLabel>
//                                 <CustomInput
//                                     name="name"
//                                     fullWidth
//                                     style={{ width: 300 }}
//                                     className={classes.textField}
//                                     size="md"
//                                     variant="outlined"
//                                 />
//                             </Grid>
//                         ) : (
//                             <>
//                                 {resolutionValue.alertType !== 'Popup' && resolutionValue.alertType !== '' && (
//                                     <Grid item xs={12} md={4} lg={4} className={classes.inputField}>
//                                         <InputLabel className={classes.inputLabel}>User Group</InputLabel>
//                                         <SelectOption
//                                             label="Select User Group"
//                                             onChange={handleChangeSelect}
//                                             options={userGroup.data}
//                                             diff
//                                             name="userGroup"
//                                             value={resolutionValue.userGroup}
//                                         />
//                                     </Grid>
//                                 )}
//                                 <Grid item xs={12} md={4} lg={4} className={classes.inputField}>
//                                     <InputLabel className={classes.inputLabel}>Message</InputLabel>
//                                     <CustomInput
//                                         name="name"
//                                         fullWidth
//                                         style={{ width: 300 }}
//                                         className={classes.textField}
//                                         size="md"
//                                         variant="outlined"
//                                     />
//                                 </Grid>
//                             </>
//                         )}
//                         <Grid item xs={12} md={4} lg={4} className={classes.inputField}>
//                             <InputLabel className={classes.inputLabel}>Nick Name</InputLabel>
//                             <CustomInput
//                                 name="name"
//                                 fullWidth
//                                 style={{ width: 300 }}
//                                 className={classes.textField}
//                                 size="md"
//                                 variant="outlined"
//                             />
//                         </Grid>
//                     </Grid>
//                     <Grid container className={classes.saveButton} spacing={2} justify="flex-end">
//                         <Grid item>
//                             <CustomButton width="120px" variant="contained" color="primary" onClick={handleFactsBox}>
//                                 Cancel
//                             </CustomButton>
//                         </Grid>
//                         <Grid item>
//                             <CustomButton
//                                 disabled={
//                                     resolutionName && resolutionValue.mainType && resolutionValue.subType ? false : true
//                                 }
//                                 width="120px"
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleFactSave}
//                             >
//                                 Add
//                             </CustomButton>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             ) : (
//                 resolutionArray.length > 0 || (
//                     <Grid
//                         container
//                         justify="space-between"
//                         alignItems="flex-end"
//                         className={resolutionArray ? `${classes.paddingBottom} ${classes.factsBox}` : classes.factsBox}
//                     >
//                         <Grid item>
//                             <Grid container direction="column" spacing={1}>
//                                 <Grid item>
//                                     <Typography className={classes.textMain}>No Resolution</Typography>
//                                 </Grid>

//                                 <Grid item>
//                                     <Typography className={classes.textSub}>
//                                         There is no Resolution available
//                                     </Typography>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item>
//                             <CustomButton variant="contained" color="primary" onClick={() => setShowFactsInput(true)}>
//                                 Create Resolution
//                             </CustomButton>
//                         </Grid>
//                     </Grid>
//                 )
//             )}

//             {resolutionArray.length > 0 &&
//                 resolutionArray.map((fact, i) => {
//                     return (
//                         <Grid container alignItems="center" spacing={1} className={classes.factsArray} key={i}>
//                             <Grid item>
//                                 <Typography className={classes.index}> {i + 1}.</Typography>
//                             </Grid>
//                             <Grid item>
//                                 <Typography className={classes.name}> {fact.resolutionName}</Typography>
//                             </Grid>
//                         </Grid>
//                     );
//                 })}
//         </Grid>
//     );
// };

// export default Resolution;
