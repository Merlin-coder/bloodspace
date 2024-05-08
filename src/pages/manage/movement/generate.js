// import { Grid, InputLabel, makeStyles, Typography } from '@material-ui/core';
// import { CustomButton } from 'common';
// import CustomInput from 'components/inputfeild';
// import SelectOption from 'components/select';
// import React from 'react';
// import { useSelector } from 'react-redux';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         padding: '50px 60px'
//     },
//     rules: {
//         fontSize: '24px',
//         color: theme.palette.primary.main,
//         fontWeight: 'bold'
//     },
//     inputLabel: {
//         marginBottom: '5px'
//     },
//     button: {
//         marginTop: '30px'
//     }
// }));

// const Generate = () => {
//     const classes = useStyles();
//     const { facts, resolution, decision } = useSelector((state) => state.rulePageReducer);
//     console.group(resolution);
//     return (
//         <Grid container className={classes.root}>
//             <Grid container spacing={4} direction="column">
//                 <Grid item>
//                     <Typography className={classes.rules}> Create Rules</Typography>
//                 </Grid>
//                 <Grid item>
//                     <Grid container className={classes.factsInputBox}>
//                         <Grid container spacing={8} justify="space-evenly">
//                             <Grid item xs={4}>
//                                 <InputLabel className={classes.inputLabel}>Facts</InputLabel>
//                                 <SelectOption
//                                     placeholder={'Fact'}
//                                     factName
//                                     options={facts}
//                                     disabled={facts.length < 1 && true}
//                                 />
//                             </Grid>
//                             <Grid item xs={4}>
//                                 <InputLabel className={classes.inputLabel}>Decision</InputLabel>
//                                 <SelectOption
//                                     decisionName
//                                     label={'select'}
//                                     options={decision}
//                                     disabled={decision.length < 1 && true}
//                                 />
//                             </Grid>
//                             <Grid item xs={4}>
//                                 <InputLabel className={classes.inputLabel}>Resolution</InputLabel>
//                                 <SelectOption
//                                     resolutionName
//                                     label={'select'}
//                                     options={resolution}
//                                     disabled={resolution.length < 1 && true}
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Grid container className={classes.button} justify="flex-end">
//                             <CustomButton color="primary" variant="contained">
//                                 Generate Rule
//                             </CustomButton>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };

// export default Generate;
