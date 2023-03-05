import React from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import BuyerDashboard from '../Buyer/BuyerDashboard';
import { user_is_authenticated } from '../../../lib/auth';
import Spline from '@splinetool/react-spline';

const Home = () => {
    const matches = useMediaQuery('(min-width:480px)');

    return (
        <div>
            {!user_is_authenticated() ?
                matches ?
                    <div className="welcome-page">
                        <Spline scene="https://prod.spline.design/XBgGDAHTrMH1APWP/scene.splinecode" />
                        
 const myStyle={
        backgroundImage: "url(/martian-socials-nosh-nook\images\BG_mars)",

                        <Typography className="welcome-heading" variant="h2" component="h1">
                            Welcome to Martian Social's Nosh Nook!
                        </Typography>
                        <Typography variant="h6" component="h1">
                            Please login or register to continue
                        </Typography>
                        <BuyerDashboard />
                    </div>
                    
                    :
                    
                    <div className="welcome-page">
                        <BuyerDashboard />
                        <Typography className="welcome-heading" variant="h4" component="h1">
                            Welcome to the Food Ordering Portal
                        </Typography>
                        <Typography variant="h6" component="h1">
                            Please login or register to continue
                        </Typography>
                    </div>
                :
                <div>
                        <BuyerDashboard />
                </div>
            }
        </div>
    );
};

export default Home;
