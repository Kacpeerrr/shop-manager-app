import React from 'react'
import { logoutUser } from '../../services/authService'
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
    const name = useSelector(selectName)

	const logout = async () => {
		await logoutUser()
		await dispatch(SET_LOGIN(false))
		navigate('/logowanie')
	}

	return (
		<div className='--pad header'>
			<div className='--flex-between'>
				<h3>
					<span className='--fw-thin'>Witaj </span>
					<span className='--color-danger'>{name}</span>
				</h3>
				<button
					onClick={logout}
					className='--btn --btn-danger'>
					Wyloguj
				</button>
			</div>
			<hr />
		</div>
	)
}

export default Header
