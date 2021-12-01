import React from 'react'
import { distGetAutentication } from '../dist/Autentication';

const RoutePrivate = () => {
    const autentication = distGetAutentication()
    return autentication ? children : N
};

export default RoutePrivate;
