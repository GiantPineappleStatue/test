import React from 'react';
import Img from '../UI/Img/Img';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';
import Alert from '../UI/Alert/Alert';
import clsx from 'clsx';
import { signUp, login } from '../../services/util';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/auth.duck';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
function SignupPage(props) {
    const router = useRouter();
    const [username, setUsername] = React.useState({ value: '', touch: false, error: false });
    const [email, setEmail] = React.useState({ value: '', touch: false, error: false });
    const [password, setPassword] = React.useState({ value: '', touch: false, error: false });
    const [confirmPassword, setConfirmPassword] = React.useState({
        value: '',
        touch: false,
        error: false
    });
    const [remember, setRemember] = React.useState(false);
    const [profileImage, setProfileImg] = React.useState(null);
    const [message, setMessage] = React.useState({ message: '', error: false });
    const [loading, setLoading] = React.useState(false);
    const isMovie = useSelector((state) => state.filter.letsMakeMovie);

    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        let responseData = await signUp({
            email: email.value,
            username: username.value,
            password: password.value,
            ...(props.inviteCode && { inviteCode: props.inviteCode }),
            ...(props.isMovie && { isMovie: props.isMovie })
        });
        if (responseData.code === 'ABT0002') {
            if (process.browser) window.scrollTo(0, 0);
            setMessage({ message: responseData.message, error: true });
        }

        if (responseData.code === 'ABT0000') {
            setMessage({ message: responseData.message, error: false });
            setUsername({ value: '', touch: false, error: false });
            setEmail({ value: '', touch: false, error: false });
            setPassword({ value: '', touch: false, error: false });
            setConfirmPassword({ value: '', touch: false, error: false });
            // setMessage({ message: responseData.message, error: true, general: true });

            // let loginResponse = await login({
            //     username: username.value,
            //     password: password.value
            // });
            // if (loginResponse.code === 'ABT0000') {
            //     dispatch(
            //         loginUser(
            //             jwt_decode(loginResponse.data.userToken),
            //             loginResponse.data.userToken
            //         )
            //     );
            //     if (isMovie) router.push('/letsmakeamovie');
            //     else router.push('/welcome');
            // } else {
            //     setLoading(false);
            //     setMessage({ message: loginResponse.message, error: true, general: true });
            // }
        }
        setLoading(false);
    };
    return (
        <div className="container-fluid row h-100 m-0">
            <div className="col-md-3 col-xl-4" />
            <div className="col-md-6 col-xl-4">
                <div className="login-form">
                    <div className="d-flex justify-content-center login-form-top align-items-center">
                        <div className="login-form-top__line" />
                        <div className="form-icon">
                            <div className="rounded-pill p-5 signup-form-top__img">
                                <Img src={'/img/avatar-min-blue.png'} width="60" height="60" />
                            </div>
                            <Label htmlFor="file">
                                <Img src={'/img/plus.png'} width="35" height="35" />
                                <input
                                    onChange={(e) =>
                                        setProfileImg(
                                            e.target.files[0],
                                            URL.createObjectURL(e.target.files[0])
                                        )
                                    }
                                    type="file"
                                    accept="image/*"
                                    id="file"
                                    className="d-none"
                                />
                            </Label>
                        </div>
                        <div className="login-form-top__line" />
                    </div>
                    {message.message && (
                        <Alert
                            type={`${clsx({
                                'alert-danger': message.error,
                                'alert-success': !message.error
                            })}`}>
                            {message.message}
                        </Alert>
                    )}
                    <form onSubmit={submitHandler}>
                        <div className="input-group mb-2 mt-4">
                            <Input
                                required
                                type="text"
                                value={username.value}
                                onChange={(e) =>
                                    setUsername({
                                        value: e.target.value,
                                        touch: true,
                                        error: username.value ? false : true
                                    })
                                }
                                className="form-control text-center placeholder login-form__input"
                                placeholder="Username"
                            />
                        </div>
                        {username.value.length < 4 && username.touch && (
                            <span className="text-danger text-center d-block font-weight-bold">
                                Username must be alteast 4 characters long
                            </span>
                        )}
                        <div className="input-group mb-2 mt-4">
                            <Input
                                required
                                type="email"
                                value={email.value}
                                onChange={(e) =>
                                    setEmail({
                                        value: e.target.value,
                                        touch: true,
                                        error: email.value ? false : true
                                    })
                                }
                                className="form-control text-center placeholder login-form__input"
                                placeholder="Email"
                            />
                        </div>
                        <div className="input-group my-4">
                            <Input
                                required
                                type="password"
                                value={password.value}
                                onChange={(e) =>
                                    setPassword({
                                        value: e.target.value,
                                        touch: true,
                                        error: password.value ? false : true
                                    })
                                }
                                className="form-control text-center placeholder login-form__input"
                                placeholder="Password"
                            />
                        </div>
                        {password.value.length < 6 && password.touch && (
                            <span className="text-danger text-center d-block font-weight-bold">
                                Minimum length 6
                            </span>
                        )}
                        <div className="input-group my-4">
                            <Input
                                required
                                type="password"
                                value={confirmPassword.value}
                                onChange={(e) =>
                                    setConfirmPassword({
                                        value: e.target.value,
                                        touch: true,
                                        error: confirmPassword.value ? false : true
                                    })
                                }
                                className="form-control text-center placeholder login-form__input"
                                placeholder="Confirm Password"
                            />
                        </div>
                        {confirmPassword.value !== password.value && confirmPassword.touch && (
                            <span className="text-danger text-center d-block font-weight-bold">
                                Password Must Match With Previous Entry
                            </span>
                        )}
                        <div className="form-check mb-2 ">
                            <Input
                                value={remember}
                                onChange={(e) => setRemember(!remember)}
                                className="form-check-input login-form__checkbox"
                                type="checkbox"
                                id="gridCheck"
                            />
                            <Label
                                onClick={(e) => setRemember(!remember)}
                                className="form-check-label text-white ml-n3"
                                htmlFor="gridCheck">
                                Clicking Register means you agree to our{' '}
                                <span className="color-blue font-weight-bold">
                                    Terms of Service
                                </span>{' '}
                                and{' '}
                                <span className="color-blue font-weight-bold">Privacy Policy</span>
                            </Label>
                        </div>
                        <Button
                            type="submit"
                            className={`d-block ${clsx({
                                'bg-secondary text-dark': loading
                            })} w-100 login-form__btn btn mb-3`}
                            disabled={loading}>
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
            <div className="col-md-3 col-xl-4" />
        </div>
    );
}

export default SignupPage;
