import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import Link from "next/link";
import cookie from 'js-cookie';
import {useRouter} from 'next/router'

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
    const history = useRouter();
  const [burger, setBurger] = useState(false);

  const activateMenu = () => {
      setBurger(!burger);
  }

  const logout = () => {
    cookie.remove('ttk');
    dispatch({type: 'LOGOUT'});
    history.push('/');

  }

  return (
    <nav className="navbar is-spaced has-shadow is-white" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href="/">
       <a className="navbar-item has-text-weight-bold">⚡ ISP Logger</a>
      </Link>
  
      <a onClick={activateMenu} role="button" className={`navbar-burger ${burger ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbarBasicExample" className={`navbar-menu ${burger ? 'is-active' : ''}`}>
      <div className="navbar-start">
        {
            state.isAuthenticated ?
            <Link href="/dashboard">
        <a className="navbar-item">
          Dashboard
        </a></Link>
        :
        <>
        </>
        }
      </div>
  
      <div className="navbar-end">
        <div className="navbar-item">
            {state.isAuthenticated?
            <>
            <a onClick={logout}>Logout</a>
            </>
            :
            <div className="buttons">
            <Link href="/register">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            </Link>
            <Link href="/login">
            <a className="button is-light">
              Log in
            </a>
            </Link>
          </div>
            
        }
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;