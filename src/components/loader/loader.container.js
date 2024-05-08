import React from 'react';
// import logo from '../../assets/load.svg';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core';

const Loader = () => {
    const theme = useTheme();
    return (
        <Grid
            container
            direction={'column'}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}
        >
            <svg
                width="150"
                height="50"
                viewBox="0 0 135 140"
                xmlns="http://www.w3.org/2000/svg"
                fill={theme.palette.primary.main}
            >
                <rect y="10" width="15" height="120" rx="6">
                    <animate
                        attributeName="height"
                        begin="0.5s"
                        dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y"
                        begin="0.5s"
                        dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="30" y="10" width="15" height="120" rx="6">
                    <animate
                        attributeName="height"
                        begin="0.25s"
                        dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y"
                        begin="0.25s"
                        dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="60" width="15" height="140" rx="6">
                    <animate
                        attributeName="height"
                        begin="0s"
                        dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y"
                        begin="0s"
                        dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="90" y="10" width="15" height="120" rx="6">
                    <animate
                        attributeName="height"
                        begin="0.25s"
                        dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y"
                        begin="0.25s"
                        dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </rect>
                <rect x="120" y="10" width="15" height="120" rx="6">
                    <animate
                        attributeName="height"
                        begin="0.5s"
                        dur="1s"
                        values="120;110;100;90;80;70;60;50;40;140;120"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="y"
                        begin="0.5s"
                        dur="1s"
                        values="10;15;20;25;30;35;40;45;50;0;10"
                        calcMode="linear"
                        repeatCount="indefinite"
                    />
                </rect>
            </svg>
            <Typography variant="body2" color="textPrimary" align="center" style={{ marginTop: 10 }}>
                Loading...
            </Typography>
        </Grid>
    );
};

export default Loader;
