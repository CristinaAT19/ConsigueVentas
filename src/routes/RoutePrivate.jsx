import React from 'react'
import { Redirect } from 'react-router';
import { distGetAutentication } from '../dist/Autentication';

const RoutePrivate = ({children}) => {
    const autentication = distGetAutentication()
    return autentication ?  children : <Redirect to="/login"/>
};

export default RoutePrivate;
