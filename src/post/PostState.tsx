import 
    {
        useState,
        useCallback
    } from 'react';
const API_POST_STATE_BASE_URL: string = 'http://localhost:8080';

export interface PostState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useAPIPost = <T, P>(endpoint: string) => {
    const [state, setState] = useState<PostState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const postData = useCallback(async(payload: P) => {
        setState({data: null, loading: true, error: null})
        try {
            const url = `${API_POST_STATE_BASE_URL}/${endpoint}`
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application-json',
                },
                body: JSON.stringify(payload),
            })

            if(!resp.ok) {
                let error = await resp.text();
                console.error("API responded with: ", error);
            }
            const result: T = await resp.json();
            setState({data: result, loading: false, error: null });
            return result;
        } catch (err) {
            const emsg = err instanceof Error ? err.message : "unk";
            setState({data:null, loading: false, error: emsg});
            return undefined;
        }
    }, [endpoint]);
    
    return {...state, postData}; 
}
