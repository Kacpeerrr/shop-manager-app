import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { selectUser } from '../../redux/features/auth/authSlice'
import './Profile.scss'
import { toast } from 'react-toastify'
import { updateUser } from '../../services/authService'
import ChangePassword from '../../components/changePassword/ChangePassword'

const EditProfile = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const user = useSelector(selectUser)
	const { email } = user

	useEffect(() => {
		if (!email) {
			navigate('/profil')
		}
	}, [email, navigate])

	const initialState = {
		name: user?.name,
		email: user?.email,
		phone: user?.phone,
		bio: user?.bio,
		photo: user?.photo,
	}
	const [profile, setProfile] = useState(initialState)
	const [profileImage, setProfileImage] = useState('')

	const handleInputChange = e => {
		const { name, value } = e.target
		setProfile({ ...profile, [name]: value })
	}

	const handleImageChange = e => {
		setProfileImage(e.target.files[0])
	}

	const saveProfile = async e => {
		e.preventDefault()
		setIsLoading(true)
		try {
			// Handle Image upload
			let imageURL = profile.photo
			if (
				profileImage &&
				(profileImage.type === 'image/jpeg' || profileImage.type === 'image/jpg' || profileImage.type === 'image/png')
			) {
				const image = new FormData()
				image.append('file', profileImage)
				image.append('cloud_name', 'dbftylet9')
				image.append('upload_preset', 'jrd3f3at')

				//First save image to cloudinary
					const response = await fetch('https://api.cloudinary.com/v1_1/dbftylet9/image/upload', {
						method: 'post',
						body: image,
					})
					const imgData = await response.json()
					imageURL = imgData.url.toString()
        }

				// Save Profile
				const formData = {
					name: profile.name,
					phone: profile.phone,
					bio: profile.bio,
					photo: profileImage ? imageURL : profile.photo,
				}

				const data = await updateUser(formData)
				console.log(data)
				toast.success('Użytkownik zaktualizowany')
				navigate('/profil')
				setIsLoading(false)
			
		} catch (error) {
			console.log(error)
			setIsLoading(false)
			toast.error(error.message)
		}
	}

	return (
		<div className='profile --my2'>
			{isLoading && <Loader />}

			<Card cardClass={'card --flex-dir-column'}>
				<span className='profile-photo'>
					<img
						src={user?.photo}
						alt='profilepic'
					/>
				</span>
				<form
					className='--form-control --m'
					onSubmit={saveProfile}>
					<span className='profile-data'>
						<p>
							<label>Nazwa:</label>
							<input
								type='text'
								name='name'
								value={profile?.name}
								onChange={handleInputChange}
							/>
						</p>
						<p>
							<label>E-mail:</label>
							<input
								type='text'
								name='email'
								value={profile?.email}
								disabled
							/>
							<br />
							<code>E-mail nie może być zmieniony</code>
						</p>
						<p>
							<label>Numer telefonu:</label>
							<input
								type='text'
								name='phone'
								value={profile?.phone}
								onChange={handleInputChange}
							/>
						</p>
						<p>
							<label>Bio:</label>
							<textarea
								name='bio'
								value={profile?.bio}
								onChange={handleInputChange}
								cols='30'
								rows='10'></textarea>
						</p>
						<p>
							<label>Zdjęcie:</label>
							<input
								type='file'
								name='image'
								onChange={handleImageChange}
							/>
						</p>
						<div>
							<button className='--btn --btn-primary'>Zapisz zmiany</button>
						</div>
					</span>
				</form>
			</Card>
			<br />
      <ChangePassword/>
		</div>
	)
}

export default EditProfile
