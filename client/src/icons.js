import React from 'react';
import SVG from 'react-inlinesvg';

const ArrowIcon = () => <SVG src={require('./icons/arrow-icon.svg')} />;
const AvatarIcon = () => <SVG src={require('./icons/avatar-icon.svg')} />;
const HomeIcon = () => <SVG src={require('./icons/home-icon.svg')} />;
const LikeIcon = () => <SVG src={require('./icons/like-icon.svg')} />;
const PlusIcon = () => <SVG src={require('./icons/plus-icon.svg')} />;
const SearchIcon = () => <SVG src={require('./icons/search-icon.svg')} />;
const PriceIcon = () => <SVG src={require('./icons/price-icon.svg')} />;
const FolderIcon =() => <SVG src={require('./icons/folder-icon.svg')} />;

export {
    ArrowIcon,
    AvatarIcon,
    HomeIcon,
    LikeIcon,
    PlusIcon,
    SearchIcon,
    PriceIcon,
    FolderIcon
};