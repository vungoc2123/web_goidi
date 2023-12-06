import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import logoNgang from 'src/assets/brand/tinder-logo.png'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
	const dispatch = useDispatch()
	const unfoldable = useSelector((state) => state.sidebarUnfoldable)
	const sidebarShow = useSelector((state) => state.sidebarShow)

	return (
		<CSidebar
			position="fixed"
			unfoldable={unfoldable}
			visible={sidebarShow}
			onVisibleChange={(visible) => {
				dispatch({ type: 'set', sidebarShow: visible })
			}}
		>
			<CSidebarBrand className="d-none d-md-flex" to="/">
				{/* <span style={{ fontWeight: 'bold', fontSize: 25 }}>🏦 Tinder</span> */}
				<CImage fluid src={logoNgang} width={170} />
			</CSidebarBrand>
			<CSidebarNav>
				<SimpleBar>
					<AppSidebarNav items={navigation} />
				</SimpleBar>
			</CSidebarNav>
		</CSidebar>
	)
}

export default React.memo(AppSidebar)
