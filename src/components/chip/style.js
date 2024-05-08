import { makeStyles } from '@material-ui/core/styles';

export const CustomChipStyles = makeStyles(
    (theme) => ({
        chip: {
            margin: 3,
            minWidth: '100px',
            backgroundColor: theme.palette.primary.light,
            fontSize: '14px',
            borderRadius: '50px',
            '&.MuiChip-root': {
                padding: 5,
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            '&:focus': {
                backgroundColor: theme.palette.primary.light
            }
        },
        chipArray: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px'
        },
        chipRed: {
            margin: 3,
            minWidth: '100px',
            backgroundColor: '#fad2d1',
            fontSize: '14px',
            borderRadius: '50px',
            '&.MuiChip-root': {
                padding: 5,
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            '&:focus': {
                backgroundColor: theme.palette.primary.light
            }
        }
    }),
    { index: 1 }
);
