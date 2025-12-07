import {
    useAPIPost
} from '../post/PostState.tsx'

import {
    useAuthContext
} from '../auth/Auth.tsx'

import {
} from '../auth/Auth.tsx'


export interface Event {
    Name: string,
    Desc: string,
    Date: Date,
    Color: number
}

export interface Ok {
    Ok: boolean,
}

export const addEvent = (e: Event) => {
    const {data: data, loading: loading, error: error, postData: postData} =  useAPIPost<Event, Event>(`events/add/${useAuthContext()!.ID}`)
    postData(e)
    if(error != null) {
        // XXX: todo
    }
}


export const getEvent = (id: number) => {
    const {data: data, loading: loading, error: error, postData: postData} = useAPIPost<Event, void>(`events/get/${useAuthContext()!.ID}/${id}`)
    postData()
    return data;
}

export const getEventFromUntil = (from: Date, until: Date) => {
    const {data: data, loading: loading, error: error, postData: postData} = useAPIPost<Event[], void>(`events/get/${useAuthContext()!.ID}/from/${encodeURIComponent(from.toISOString())}/until/${encodeURIComponent(until.toISOString())}`);
    postData()
    
    return data;
}

export const setEvent = (id: number, e: Event) => {
    const {data: data, loading: loading, error: error, postData: postData} = useAPIPost<Ok, Event>(`events/set/${useAuthContext()!.ID}/${id}`);
    postData(e);
}

export const rmEvent = (id: number) => {
    const {data: data, loading: loading, error: error, postData: postData} = useAPIPost<Ok, void>(`events/rm/${useAuthContext()!.ID}/${id}`)
    const resp = postData();
    if(error != null) {
        // XXX: todo
    }
}
