import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);

    if (jwt) {
        fetchService(`/api/auth/validate?token=${jwt}`, "get", jwt, null)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((isvalid) => {
            setIsLoading(false);
            setIsValid(true);
        })
    }
    else {
        return removeOldJwt();
    }

    function removeOldJwt() {
        localStorage.removeItem("jwt");
        return <Navigate to="/login"></Navigate>
    }

    return isLoading ? <div>Loading...</div> : (
        isValid ? children : removeOldJwt()
    );
};

export default PrivateRoute;