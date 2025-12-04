import React, {
    useState,
} from 'react';
import {
    useAPIPost,
} from '../post/PostState.tsx';

interface AuthPayload {
    Name: string;
}
interface AuthResponse {
    ID: number;
    Name: string;
    CreatedAt: string;
}

export const AuthForm = () => {
    const [userName, setUserName] = useState('');
    const {data: userData, loading: loading, error: error, postData: post} = useAPIPost<AuthResponse, AuthPayload>("/auth"); 
    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if(!userName.trim()){
            alert("Name cannot be empty");
        }
        post({Name: userName});
    }; 
    return(
        <>
            <div className="p-6 bg-white rounded-x1 shadow-lg border border-gray-100">
                <h2 className="text-x1 font-bold mb-4 text-gray-800">Auth</h2>
                {userData ? (
                    <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                        <p className="font-medium">Logged in as: </p>
                        <p className="text-sm">Name {userData.Name}</p>
                    </div>
                ) : (
                    <form onSubmit={handleAuth} className="space-y-4">
                        <input
                            type="text"
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                            placeholder="Enter user name..."
                            disabled={loading}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                        <button
                            type="submit"
                            disabled={loading}

                            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 shadow-md ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        />
                        ${loading ? 'Authenticating...' : 'POST /auth'}
                    </form>
                )}
            </div>
        </>
    );
    
}
