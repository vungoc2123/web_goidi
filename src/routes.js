import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/auth/Login'))
const Dish = React.lazy(() => import('./views/dish/dish'))
const AddDish = React.lazy(() => import('./views/dish/addDish'))
const UpdateDish = React.lazy(() => import('./views/dish/updateDish'))
const Table = React.lazy(() => import('./views/table/tables'))
const AddTable = React.lazy(() => import('./views/table/addTable'))
const UpdateTable = React.lazy(() => import('./views/table/updateTable'))
const User = React.lazy(() => import('./views/user/users'))
const AddUser = React.lazy(() => import('./views/user/addUser'))
const UpdateUser = React.lazy(() => import('./views/user/updateUser'))
const Feedback = React.lazy(() => import('./views/feedback/feedbacks'))
const routes = [
	{ path: '/login', name: 'Đăng nhập', element: Login },

	{ path: '/user', name: 'Người dùng', element: User },
	{ path: '/user/add', name: 'Thêm người dùng', element: AddUser },
	{ path: '/user/:id', name: 'Cập Nhật người dùng', element: UpdateUser },
	{ path: '/dashboard', element: Dashboard },
	{ path: '/dish', name: 'Món ăn', element: Dish },
	{ path: '/dish/add', name: 'Thêm Món ăn', element: AddDish },
	{ path: '/dish/:id', name: 'Cập Nhật Món Ăn', element: UpdateDish },

	{ path: '/table', name: 'Bàn ăn', element: Table },
	{ path: '/table/add', name: 'Thêm bàn ăn', element: AddTable },
	{ path: '/table/:id', name: 'Cập Nhật bàn ăn', element: UpdateTable },

	{ path: '/feedback', name: 'Phản hồi', element: Feedback },
]

export default routes	