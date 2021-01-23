// Auth layer layout - for protected page only.
import { useEffect, useContext } from 'react';
import { parseCookies } from '../utils/parseCookies';
import { AuthContext } from '../context/Auth';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Navbar from './dashboard/navbar';
import { GetUserData } from '../utils/getUserData';

const Layout = ({ children }) => {

    const history = useRouter();
    const { state, dispatch } = useContext(AuthContext);

    const getData = async() => {
        let token = cookie.get('ttk');
        let data = await GetUserData();
        console.log(data);
        dispatch(
            {
                type: "LOGIN",
                payload: { token: token, user_data: data },

            });

    }

    useEffect(() => {
        let token = cookie.get('ttk');

        if (token) {
            getData();
            
        } else {

            history.push('/login');

        }



    }, [])

    return (
        <>
            <Navbar />
            {children}
        </>
    )

}



export default Layout;