import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import Link from "next/link";
import cookie from 'js-cookie';
import { useRouter } from 'next/router'

const LandNav = () => {
  const { state, dispatch } = useContext(AuthContext);
  const history = useRouter();
  const [burger, setBurger] = useState(false);
  const activateMenu = () => {
    setBurger(!burger);
  }

  return (
    <>
    <nav className="navbar is-light is-spaced" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item has-text-weight-bold is-size-5">⚡ ISP Logger</a>
        </Link>

        <a onClick={activateMenu} role="button" className={`navbar-burger ${burger ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${burger ? 'is-active' : ''}`}>
        <div className="navbar-start">
        <div className="navbar-item">
            <Link href="/about"><a className="has-text-weight-bold">About</a></Link>
          </div>
          <div className="navbar-item">
            <Link href="/blog/setup-guide"><a className="has-text-weight-bold">Setup Guide</a></Link>
          </div>
          <div className="navbar-item">
            <Link href="/providers"><a className="has-text-weight-bold">ISP's</a></Link>
          </div>
        </div>

        <div className="navbar-end">
          {
            state.isAuthenticated === true?
            <>
            <div className="navbar-item">
            <Link href="/dashboard"><a className="has-text-weight-bold">Dashboard</a></Link>
          </div>
            </>
            :
            <div className="navbar-item">
            <div className="buttons">
              <Link href="/register">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
              </Link>
              <Link href="/login">
                <a className="button is-light">
                  Sign in
              </a>
              </Link>
            </div>
          </div>
          }
        </div>
      </div>
    </nav>
    </>
  )

}

export default LandNav;