// import { Grid, InputLabel, makeStyles, Typography } from '@material-ui/core';
// import React from 'react';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import CancelIcon from '@material-ui/icons/Cancel';
// import { CustomButton, CustomSearch } from 'common';
// import CustomInput from 'components/inputfeild';
// import SelectOption from 'components/select';
// import RuleType from './RuleType.json';
// import SpecificRuleType from './SpecificRuleType.json';
// import ruleCondition from '../../../JSON/JRuleCondition.json';
// import userGroup from '../../../JSON/JUserGroup.json';
// import deviceGroupType from '../../../JSON/JDeviceGroup.json';
// import transportGroup from '../../../JSON/JTransportGroup.json';
// import { addDecision } from '../../../redux/actions/manage/rulePageAction';
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

// const Decision = () => {
//     const dispatch = useDispatch();
//     const classes = useStyles();
//     const decisionArray = useSelector((state) => state.rulePageReducer.decision);

//     const [showDecisionInput, setShowDecisionInput] = React.useState(false);
//     const [showFactsInput, setShowFactsInput] = React.useState(false);
//     const [mainTypeValue, setMainTypeValue] = React.useState('');
//     const [subTypeValue, setSubTypeValue] = React.useState('');
//     const [specificRule, setSpecificRule] = React.useState([]);
//     const [decisionName, setDecisionName] = React.useState('');
//     const [add, setAdd] = React.useState(false);
//     const [save, setSave] = React.useState(false);
//     const [ruleValue, setRuleValue] = React.useState({
//         temperatureMin: '',
//         temperatureMax: '',
//         deviceGroup: '',
//         userGroup: '',
//         time: '',
//         timeOut: '',
//         transportGroup: ''
//     });
//     React.useEffect(() => {
//         Object.values(ruleValue).forEach((value) => {
//             if (value !== '') setSave(true);
//         });
//     }, [ruleValue]);

//     const handleMainTypeChange = (e) => {
//         setMainTypeValue(e.target.value);
//         setSave(false);
//         setRuleValue({
//             temperatureMin: '',
//             temperatureMax: '',
//             deviceGroup: '',
//             userGroup: '',
//             time: '',
//             timeOut: '',
//             transportGroup: ''
//         });
//     };
//     const handleSubTypeChange = (e) => {
//         setSubTypeValue(e.target.value);
//     };
//     const handleDecisionSave = () => {
//         let subType = {};
//         Object.keys(ruleValue).forEach((key) => {
//             if (ruleValue[key] !== '') {
//                 subType = { [key]: ruleValue[key] };
//             }
//         });
//         const item = { decisionName, mainTypeValue, subType };
//         dispatch(addDecision(item));

//         setMainTypeValue('');
//         setSubTypeValue('');
//         setSpecificRule('');
//         setDecisionName('');
//         setShowDecisionInput(false);
//         setAdd(false);
//     };
//     const handleFactsBox = () => {
//         setMainTypeValue('');
//         setSubTypeValue('');
//         setSpecificRule('');
//         setDecisionName('');
//         setShowDecisionInput(false);
//         setAdd(false);
//     };
//     const handleRuleValueChange = (e) => {
//         setRuleValue({
//             ...ruleValue,
//             [e.target.name]: e.target.value
//         });
//     };
//     console.log(decisionArray);

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
//             {showDecisionInput || add ? (
//                 <Grid container className={classes.factsInputBox}>
//                     <Grid container spacing={8} justify="space-evenly">
//                         <Grid item xs={4}>
//                             <InputLabel className={classes.inputLabel}>Name</InputLabel>
//                             <CustomInput
//                                 placeholder={'Decision'}
//                                 value={decisionName}
//                                 onChange={(e) => setDecisionName(e.target.value)}
//                                 lg
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={4}>
//                             <InputLabel className={classes.inputLabel}>Main Type</InputLabel>
//                             <SelectOption
//                                 value={mainTypeValue}
//                                 onChange={handleMainTypeChange}
//                                 label={'select'}
//                                 ruleType
//                                 options={ruleCondition.data}
//                             />
//                         </Grid>
//                         <Grid item xs={4}>
//                             <Grid container spacing={4}>
//                                 {mainTypeValue === '' ? (
//                                     ''
//                                 ) : mainTypeValue === 'Temperature' ? (
//                                     <>
//                                         <Grid item xs={6} md={6} className={classes.inputField}>
//                                             <InputLabel className={classes.inputLabel}>Minimum</InputLabel>
//                                             <CustomInput
//                                                 name="temperatureMin"
//                                                 fullWidth
//                                                 style={{ width: 50 }}
//                                                 className={classes.textField}
//                                                 size="sm"
//                                                 variant="outlined"
//                                                 value={ruleValue.temperatureMin}
//                                                 onChange={handleRuleValueChange}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={6} md={6} className={classes.inputField}>
//                                             <InputLabel className={classes.inputLabel}>Maximum</InputLabel>
//                                             <CustomInput
//                                                 name="temperatureMax"
//                                                 fullWidth
//                                                 style={{ width: 50 }}
//                                                 className={classes.textField}
//                                                 size="sm"
//                                                 variant="outlined"
//                                                 value={ruleValue.temperatureMax}
//                                                 onChange={handleRuleValueChange}
//                                             />
//                                         </Grid>
//                                     </>
//                                 ) : mainTypeValue === 'Device Group' ? (
//                                     <Grid item xs={12} md={12} lg={12} className={classes.inputField}>
//                                         <InputLabel className={classes.inputLabel}>Device Group</InputLabel>
//                                         <SelectOption
//                                             label="Select Device Group"
//                                             value={ruleValue.deviceGroup}
//                                             onChange={handleRuleValueChange}
//                                             options={deviceGroupType.data}
//                                             diff
//                                             name="deviceGroup"
//                                         />
//                                     </Grid>
//                                 ) : mainTypeValue === 'User Group' ? (
//                                     <Grid item xs={12} className={classes.inputField}>
//                                         <InputLabel className={classes.inputLabel}>User Group</InputLabel>
//                                         <SelectOption
//                                             label="Select User Group"
//                                             value={ruleValue.userGroup}
//                                             onChange={handleRuleValueChange}
//                                             options={userGroup.data}
//                                             diff
//                                             name="userGroup"
//                                         />
//                                     </Grid>
//                                 ) : mainTypeValue === 'Reactivate' ? (
//                                     <>
//                                         <Grid item xs={12} md={6} className={classes.inputField}>
//                                             <InputLabel className={classes.inputLabel}>Time</InputLabel>
//                                             <CustomInput
//                                                 name="time"
//                                                 fullWidth
//                                                 style={{ width: 50 }}
//                                                 className={classes.textField}
//                                                 size="sm"
//                                                 variant="outlined"
//                                                 value={ruleValue.time}
//                                                 onChange={handleRuleValueChange}
//                                             />
//                                         </Grid>
//                                         <Grid item xs={12} md={6} className={classes.inputField}>
//                                             <InputLabel className={classes.inputLabel}>Time Out</InputLabel>
//                                             <CustomInput
//                                                 name="timeOut"
//                                                 fullWidth
//                                                 style={{ width: 50 }}
//                                                 className={classes.textField}
//                                                 size="sm"
//                                                 variant="outlined"
//                                                 value={ruleValue.timeOut}
//                                                 onChange={handleRuleValueChange}
//                                             />
//                                         </Grid>
//                                     </>
//                                 ) : mainTypeValue === 'Transport' ? (
//                                     <Grid item xs={12} className={classes.inputField}>
//                                         <InputLabel className={classes.inputLabel}>Transport Group</InputLabel>
//                                         <SelectOption
//                                             label="Select Transport Group"
//                                             name="transportGroup"
//                                             diff
//                                             // onChange={handleChangeSelect}
//                                             options={transportGroup.data}
//                                             value={ruleValue.transportGroup}
//                                             onChange={handleRuleValueChange}
//                                         />
//                                     </Grid>
//                                 ) : mainTypeValue === 'Expired' ? (
//                                     <Grid item xs={12} className={classes.inputField}>
//                                         <InputLabel className={classes.inputLabel}>User Group</InputLabel>
//                                         <SelectOption
//                                             label="Select User Group"
//                                             // onChange={handleChangeSelect}
//                                             options={userGroup.data}
//                                             diff
//                                             name="userGroup"
//                                             value={ruleValue.userGroup}
//                                             onChange={handleRuleValueChange}
//                                         />
//                                     </Grid>
//                                 ) : (
//                                     ''
//                                 )}
//                             </Grid>
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
//                                 disabled={decisionName && mainTypeValue && save ? false : true}
//                                 width="120px"
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleDecisionSave}
//                             >
//                                 Add
//                             </CustomButton>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             ) : (
//                 decisionArray.length < 1 && (
//                     <Grid container justify="space-between" alignItems="flex-end" className={classes.factsBox}>
//                         <Grid item>
//                             <Grid container direction="column" spacing={1}>
//                                 <Grid item>
//                                     <Typography className={classes.textMain}>No Decision</Typography>
//                                 </Grid>

//                                 <Grid item>
//                                     <Typography className={classes.textSub}>There is no Decision available</Typography>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item>
//                             <CustomButton
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => setShowDecisionInput(true)}
//                             >
//                                 Create Decision
//                             </CustomButton>
//                         </Grid>
//                     </Grid>
//                 )
//             )}
//             {decisionArray.length > 0 &&
//                 decisionArray.map((fact, i) => {
//                     return (
//                         <Grid container alignItems="center" spacing={1} className={classes.factsArray} key={i}>
//                             <Grid item>
//                                 <Typography className={classes.index}> {i + 1}.</Typography>
//                             </Grid>
//                             <Grid item>
//                                 <Typography className={classes.name}> {fact.decisionName}</Typography>
//                             </Grid>
//                         </Grid>
//                     );
//                 })}
//         </Grid>
//     );
// };

// export default Decision;
