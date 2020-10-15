import React from 'react';
import {Link} from 'react-router-dom';
import Account from '../Account/Account'

import {SearchIcon, PlusIcon} from '../../icons';
import './Header.css';

const header = (props) => {
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/main">
                    LinkStorage
                </Link> 
            </div>
            <div className="header__params">
                <div className="header__search">
                    {/* <input type="search" placeholder="Search"/> */}
                    <button className="search__icon">
                        <SearchIcon />
                    </button>
                </div>
                <div className="header__add">
                    {/* <input type="url" placeholder="Add new link"/> */}
                    <button className="add__icon">
                        <PlusIcon />
                    </button>
                </div>
                <Account 
                    // onClickHandler = {props.onClickHandler}
                    userData = {props.userData}
                />
            </div>
        </header>
    )
}

export default header