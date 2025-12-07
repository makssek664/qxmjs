import React, {
    useState,
    createContext,
    useContext,
} from 'react';
import {
    useAPIPost,
} from '../post/PostState.tsx';
import '../ark.sass';
import './Auth.sass';
import {
    Calendar,
} from '../calendar/Calendar.tsx'

interface AuthPayload {
    Name: string;
}
interface AuthResponse {
    ID: number;
    Name: string;
    CreatedAt: string;
}
let authContext = createContext<AuthResponse | null>(null);
export const AuthForm = () => {
    const [userName, setUserName] = useState('');
    const {data: userData, loading: loading, error: error, postData: post} = useAPIPost<AuthResponse, AuthPayload>("auth"); 
    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if(!userName.trim()){
            alert("Name cannot be empty");
        }
        post({Name: userName});
        while(loading);
        authContext = createContext(userData);
    }; 
    if(!userData)
        return(
            <>
                <div className="auth-form-container">
                    <div className="auth-form-header">Login</div>
                        <form onSubmit={handleAuth} className="auth-form-login">
                            <input
                                type="text"
                                value={userName}
                                onChange={(e)=>setUserName(e.target.value)}
                                placeholder="Enter user name..."
                                disabled={loading}
                                className="qxm-round-elm-non-static"
                            />
                            <button
                                type="submit"
                                value="Submit"
                                disabled={loading}
                                className="qxm-button"
                            >Submit</button>
                            <div>{loading ? 'Authenticating...' : ''}</div>
                            
                        </form>
                </div>
            </>
        );    

    return <><Calendar/></>
}

export const useAuthContext = () => {
    return useContext(authContext);
}

export const logout = () => {
    authContext = createContext(null);
}

export const AuthException = class extends Error {
    constructor(msg: string) {
         super(msg);
         this.name = "AuthException"
    }
}
