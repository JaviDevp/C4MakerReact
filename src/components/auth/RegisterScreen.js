import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const [formValues, handleInputChange] = useForm({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formValues;

	const handleRegister = e => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError('Name is required'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));

			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError('LA contraseña está mal'));

			return false;
		}
		dispatch(removeError());
		return true;
	};
	return (
		<div className='bg-slate-100 flex flex-col h-screen my-auto items-center'>
			<div className='bg-white border-solid border border-slate-500 rounded-md m-auto w-96 p-5'>
				<h3
					className='text-center mb-2
                       text-2xl font-semibold text-slate-600'>
					Register
				</h3>
				<form onSubmit={handleRegister}>
					<div className='relative z-0 mb-6 w-full group'>
						<input
							type='text'
							placeholder=' '
							name='name'
							autoComplete='off'
							value={name}
							onChange={handleInputChange}
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						/>
						<label
							htmlFor='name'
							className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Nombre
						</label>
					</div>

					<div className='relative z-0 mb-6 w-full group'>
						<input
							type='text'
							placeholder=' '
							name='email'
							autoComplete='off'
							value={email}
							onChange={handleInputChange}
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						/>
						<label
							htmlFor='email'
							className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Email
						</label>
					</div>

					<div className='relative z-0 mb-6 w-full group'>
						<input
							type='password'
							name='password'
							required
							id='floating_password'
							placeholder=' '
							value={password}
							onChange={handleInputChange}
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						/>
						<label
							htmlFor='password'
							className='absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Password
						</label>
					</div>

					<div className='relative z-0 mb-6 w-full group'>
						<input
							type='password'
							name='password2'
							required
							id='floating_password2'
							placeholder=' '
							value={password2}
							onChange={handleInputChange}
							className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						/>
						<label
							htmlFor='password2'
							className='absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
							Confirm Password
						</label>
					</div>

					<button
						type='submit'
						className='w-full bg-sky-500 mb-2 p-1
                         text-white text-xl font-semibold
                           border-solid border rounded-md'>
						Registrarse
					</button>

					<Link to='/auth/login' className='text-center block'>
						<span className='hover:text-slate-600'>Iniciar Sesión</span>
					</Link>
				</form>
			</div>
		</div>
	);
};
