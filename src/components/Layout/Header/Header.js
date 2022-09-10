import React, { useEffect, useRef } from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import hamburger from '../../../assets/hamburger.svg';
import logo from '../../../assets/logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { flushUser, selectToken, selectUsername } from '../../../app/User/UserSlice';
import { Button } from '@mui/material';

const Header = () => {
    const navContainerRef = useRef();
    const token = useSelector(selectToken);
    const username = useSelector(selectUsername);
    const dispatch = useDispatch();

    const toggleOpenMenu = (event) => {
        const container = event.target.closest(`.${classes["navigation-container"]}`);

        container.classList.toggle(classes.open);
    };

    const onLinkClick = () => {
        navContainerRef.current.classList.remove(classes.open);
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        const detectClickOutsideHeader = (event) => {
            if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
                navContainerRef.current.classList.remove(classes.open);
            }
        }
        document.addEventListener("mousedown", detectClickOutsideHeader);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", detectClickOutsideHeader);
        };
    }, [navContainerRef]);

    return (
        <header className={classes.navbar}>
            <div className={classes.container}>
                <div ref={navContainerRef} className={classes["navigation-container"]}>
                    <div className={classes["mobile-nav-toggle"]} onClick={toggleOpenMenu}>
                        <img src={hamburger} alt={"hamburger menu"}/>
                    </div>
                    {
                        token &&
                        <div className={classes.greeting}>
                            <div style={{display: "inline-block", marginRight: "2em"}} onClick={() => dispatch(flushUser())}>
                                <Button variant={"outlined"}>Logout</Button>
                            </div>
                            {username && <h4 style={{display: "inline-block"}}>Hello, {username}!</h4>}
                        </div>
                    }
                    <div className={classes.navigation}>
                        {token && <ul>
                            <li>
                                <NavLink to={"/"} className={({isActive}) => `${isActive ? classes.active : ''} text-blue`} onClick={onLinkClick}>
                                    Receivers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/about-us"} className={({isActive}) => `${isActive ? classes.active : ''} text-blue`} onClick={onLinkClick}>
                                    Locations
                                </NavLink>
                            </li>
                        </ul>}
                        <NavLink to={"/"} onClick={onLinkClick}>
                            <div className={classes.logo}>
                                <img src={logo} alt={"ukraine back on track"}/>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
