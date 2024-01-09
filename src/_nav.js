import React from 'react'
import { CNavItem, CNavTitle } from '@coreui/react'
import { IoNotifications } from "react-icons/io5";
import { FaUser, FaChartBar } from "react-icons/fa";
import { GiTable } from "react-icons/gi";
import { BiSolidDish } from "react-icons/bi";
import { MdFeedback } from "react-icons/md";

import {
    cilUser,
} from '@coreui/icons';
const _nav = [
	{
		component: CNavItem,
	},
	{
		component: CNavTitle,
		name: 'App',
	},
	// {
	// 	component: CNavItem,
	// 	name: 'Home',
	// 	to: '/dashboard',
	// 	icon: <IoIosHome size={24} className="nav-icon" />,
	// },
	// {
	// 	component: CNavItem,
	// 	name: 'Users',
	// 	to: '/user',
	// 	icon: <FaUser size={24} className="nav-icon" />,
	// },
	// {
	// 	component: CNavItem,
	// 	name: 'Notification',
	// 	to: '/notification',
	// 	icon: <IoNotifications size={24} className="nav-icon" />,
	// },
	// {
	// 	component: CNavItem,
	// 	name: 'Revenue',
	// 	to: '/revenue',
	// 	icon: <FaChartBar size={24} className="nav-icon" />,
	// },
	{
		component: CNavItem,
		name: 'Users',
		to: '/user',
		icon: <FaUser size={24} className="nav-icon" />,
	},
	{
		component: CNavItem,
		name: 'Dishs',
		to: '/dish',
		icon: <BiSolidDish size={24} className="nav-icon" />,
	},
	{
		component: CNavItem,
		name: 'Tables',
		to: '/table',
		icon: <GiTable size={24} className="nav-icon" />,
	},
	{
		component: CNavItem,
		name: 'Feedbacks',
		to: '/feedback',
		icon: <MdFeedback size={24} className="nav-icon" />,
	},
]

export default _nav
