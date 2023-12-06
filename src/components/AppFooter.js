import React from 'react'
import { CFooter } from '@coreui/react'


const AppFooter = () => {
	return (
		<CFooter>
			<div className="ms-auto">
				<span className="me-1" style={{ paddingTop: 20 }}>Powered by</span>
	
			</div>
		</CFooter>
	)
}

export default React.memo(AppFooter)
