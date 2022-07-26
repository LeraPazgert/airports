import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { IAuth } from '../models/models';
import { login, register } from '../store/actions/authActions';

const AuthPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState<IAuth>({
        password: '',
        username: ''
    })

    const isFormValid = () => {
        return form.password.trim().length && form.username.trim().length
    }

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()

            if (isFormValid()) {
                await dispatch(register(form));
                navigate('/');
            } else {
                alert('Form is invalid!')
            }
        } catch (e) {}
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const loginHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault()
            if (isFormValid()) {
                await dispatch(login(form))
                navigate('/')
            } else {
                alert('Form is invalid!')
            }
        } catch (e) {}
    }

    return (
        <form
            className='container mx-auto max-w-[500px] mt-5 '
            onSubmit={submitHandler}
        >
            <div className='mb-2'>
                <label className='block' htmlFor='userName'>Username</label>
                <input className='border py-1 px-2 w-full' type='text' onChange={changeHandler} name="username" id='username' />
            </div>
            <div className=''>
                <label className='block' htmlFor='password'>Password</label>
                <input className='border py-1 px-2 w-full mb-4' type='text' onChange={changeHandler} name="password" id='password' />
            </div>
            <button
                className='py-2 px-4 bg-blue-600 border text-white mr-4 rounded'
                type='submit'
            >
                Register
            </button>
            <button
                className='py-2 px-4 bg-green-600 border text-white rounded'
                type='button'
                onClick={loginHandler}
            >
                Login
            </button>
        </form>
    );
};

export default AuthPage;