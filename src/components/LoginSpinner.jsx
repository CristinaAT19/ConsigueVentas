import React from "react";
import {Spinner} from 'reactstrap';

const LoginSpinner = () => {
    return (
        <div className="loading text-center mt-4">
            <Spinner animation="border" variant="primary"  className="text-yellow-500" />
        </div>
    );
}
export default LoginSpinner;