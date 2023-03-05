import BuyerOrders from "../Buyer/BuyerOrders";
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { user_is_authenticated } from '../../../lib/auth';


const Orders = () => {
    const matches = useMediaQuery('(min-width:480px)');

    return (
        <div>
            {!user_is_authenticated() ?
                matches ?
                    <div className="welcome-page">
                        <Typography className="welcome-heading" variant="h2" component="h1">
                            You are not logged in
                        </Typography>
                        <Typography variant="h6" component="h1">
                            Please login or register to continue
                        </Typography>
                        <BuyerOrders />
                    </div>
                    :
                    <div className="welcome-page">
                        <Typography className="welcome-heading" variant="h4" component="h1">
                            You are not logged in
                        </Typography>
                        <Typography variant="h6" component="h1">
                            Please login or register to continue
                        </Typography>
                        <BuyerOrders />
                    </div>
                :
                <div>
                        <BuyerOrders />
                </div>
            }
        </div>
    );
};

export default Orders;
