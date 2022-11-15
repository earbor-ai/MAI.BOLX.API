import React from 'react';
import { Link } from 'react-router-dom';
import DownIcon from 'mdi-react/ChevronDownIcon';
import TopbarNavDashboards from './TopbarNavDashboards';
import TopbarNavUIElements from './TopbarNavUIElements';
import TopbarNavOtherPages from './TopbarNavOtherPages';

const TopbarNav = () => (
  <nav className="topbar__nav">
    <Link className="topbar__nav-link" to="/online_marketing_dashboard">Home <DownIcon /></Link>
    <Link className="topbar__nav-link" to="/e_commerce_dashboard">Order Management  <DownIcon /></Link>
    <Link className="topbar__nav-link" to="/documentation/introduction">Order Reports <DownIcon /></Link>
    <Link className="topbar__nav-link" to="/documentation/introduction">Returns <DownIcon /></Link>
    <Link className="topbar__nav-link" to="/documentation/introduction">Inventory Management <DownIcon /></Link>
    <Link className="topbar__nav-link" to="/documentation/introduction">Inventory Reports <DownIcon /></Link>
  </nav>
);

export default TopbarNav;
