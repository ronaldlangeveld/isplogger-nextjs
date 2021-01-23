import API from './Api';
import cookie from 'js-cookie';


export const GetUserData = async() => {
    const cookies = cookie.get('ttk') || null;
    if(cookies){
        const res = await API.get("user-data/", {
            headers: { Authorization: `Token ${cookies}` },
          });
          const user = res.data;
          return user
    } else {
        return []
    }
}