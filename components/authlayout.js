// Auth layer layout - for protected page only.
import { useEffect, useContext } from 'react';
import {parseCookies} from '../utils/parseCookies';
import {AuthContext} from '../context/Auth';
import cookie from 'js-cookie';
import {useRouter} from 'next/router';

const Layout = ({children}) => {

    const history = useRouter();
    const {state, dispatch} = useContext(AuthContext);

    useEffect(() => {
        let token = cookie.get('ttk');
        
        if(token){
            
            console.log(token);
            dispatch({ type: "LOGIN" });
        } else {

            history.push('/login');

        }
        


    }, [])

    return (
        <>

        {children}
        </>
    )

}



export default Layout;