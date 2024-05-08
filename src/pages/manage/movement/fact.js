// import { Grid, InputLabel, makeStyles, Typography } from '@material-ui/core';
// import React from 'react';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import CancelIcon from '@material-ui/icons/Cancel';
// import { CustomButton, CustomSearch } from 'common';
// import CustomInput from 'components/inputfeild';
// import SelectOption from 'components/select';
// import RuleType from './RuleType.json';
// import SpecificRuleType from './SpecificRuleType.json';
// import { addFacts } from '../../../redux/actions/manage/rulePageAction';
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

// const Fact = () => {
//     const classes = useStyles();
//     const [showFactsInput, setShowFactsInput] = React.useState(false);
//     const [mainTypeValue, setMainTypeValue] = React.useState('');
//     const [subTypeValue, setSubTypeValue] = React.useState('');
//     const [specificRule, setSpecificRule] = React.useState([]);
//     const [factName, setFactName] = React.useState('');
//     const [add, setAdd] = React.useState(false);
//     const dispatch = useDispatch();
//     const factsArray = useSelector((state) => state.rulePageReducer.facts);

//     const handleMainTypeChange = (e) => {
//         setMainTypeValue(e.target.value);
//     };
//     const handleSubTypeChange = (e) => {
//         setSubTypeValue(e.target.value);
//     };
//     const handleFactSave = () => {
//         const item = { factName, mainTypeValue, subTypeValue };
//         dispatch(addFacts(item));

//         setMainTypeValue('');
//         setSubTypeValue('');
//         setSpecificRule('');
//         setFactName('');
//         setShowFactsInput(false);
//         setAdd(false);
//     };
//     const handleFactsBox = () => {
//         setMainTypeValue('');
//         setSubTypeValue('');
//         setSpecificRule('');
//         setFactName('');
//         setShowFactsInput(false);
//         setAdd(false);
//     };
//     React.useEffect(() => {
//         const arr = SpecificRuleType.data.filter((value) => value.type === mainTypeValue);
//         setSpecificRule(arr);
//     }, [mainTypeValue]);
//     console.log('vomp', factsArray);
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
//                     <Grid container spacing={8} justify="space-evenly">
//                         <Grid item xs={4}>
//                             <InputLabel className={classes.inputLabel}>Name</InputLabel>
//                             <CustomInput
//                                 placeholder={'Fact'}
//                                 value={factName}
//                                 onChange={(e) => setFactName(e.target.value)}
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
//                                 options={RuleType.data}
//                             />
//                         </Grid>
//                         <Grid item xs={4}>
//                             <InputLabel className={classes.inputLabel}>
//                                 {mainTypeValue ? mainTypeValue : 'Sub'} Type
//                             </InputLabel>
//                             <SelectOption
//                                 disabled={mainTypeValue.length < 1 && true}
//                                 value={subTypeValue}
//                                 onChange={handleSubTypeChange}
//                                 label={'select'}
//                                 diff
//                                 options={specificRule[0]?.rule}
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
//                                 disabled={factName && mainTypeValue && subTypeValue ? false : true}
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
//                 factsArray.length > 0 || (
//                     <Grid container justify="space-between" alignItems="flex-end" className={classes.factsBox}>
//                         <Grid item>
//                             <Grid container direction="column" spacing={1}>
//                                 <Grid item>
//                                     <Typography className={classes.textMain}>No facts</Typography>
//                                 </Grid>

//                                 <Grid item>
//                                     <Typography className={classes.textSub}>There is no facts available</Typography>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item>
//                             <CustomButton variant="contained" color="primary" onClick={() => setShowFactsInput(true)}>
//                                 Create Facts
//                             </CustomButton>
//                         </Grid>
//                     </Grid>
//                 )
//             )}

//             {factsArray.length > 0 &&
//                 factsArray.map((fact, i) => {
//                     return (
//                         <Grid container alignItems="center" spacing={1} className={classes.factsArray} key={i}>
//                             <Grid item>
//                                 <Typography className={classes.index}> {i + 1}.</Typography>
//                             </Grid>
//                             <Grid item>
//                                 <Typography className={classes.name}> {fact.factName}</Typography>
//                             </Grid>
//                         </Grid>
//                     );
//                 })}
//         </Grid>
//     );
// };

// export default Fact;
