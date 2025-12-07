import './App.sass'
import { 
    AuthForm,
    useAuthContext,
    logout,
} from './auth/Auth.tsx';
import { Calendar } from './calendar/Calendar.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    if(useAuthContext() == null) {
        return <>
            <div className="qxm-container">
                <AuthForm/>
            </div></>  
    }
    return <>
        <button className="qxm-button" onClick={() => logout()}>Log out.</button>
        <Calendar/>
        </>
}

export default App
