import React from 'react';
import './Account.css';
import {ArrowIcon, AvatarIcon} from '../../icons';

const account = (props) => {
    return (
        <div className="header__account">
            <div className="account__info">
                <div className="account__user">
                    <AvatarIcon />
                </div>
                <p className="account__name">{props.userData.userName}</p>
                <div className="account__arrow">
                    <ArrowIcon />
                </div>
            </div>
        </div>
    )
}

export default account