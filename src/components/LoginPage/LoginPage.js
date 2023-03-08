import React from 'react';
import Img from '../UI/Img/Img';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';
import Link from 'next/link';
import clsx from 'clsx';
import Alert from '../UI/Alert/Alert';
import { withRouter, useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { connect, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/auth.duck';
import { login } from '../../services/util';
import jwt_decode from 'jwt-decode';

function LoginPage(props) {
    const [username, setUsername] = React.useState({ value: '', touch: false, error: false });
    const [password, setPassword] = React.useState({ value: '', touch: false, error: false });
    const [remember, setRemember] = React.useState(true);
    const [message, setMessage] = React.useState({ message: '', error: false, general: false });
    const [loading, setLoading] = React.useState(false);
    const isMovie = useSelector((state) => state.filter.letsMakeMovie);
    const router = useRouter();
    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        let loginResponse = await login({
            username: username.value,
            password: password.value
        });
        if (loginResponse.code === 'ABT0000') {
            props.login(jwt_decode(loginResponse.data.userToken), loginResponse.data.userToken);
            if (!isMovie) router.push('/');
            else router.push('/letsmakeamovie');
        } else {
            setLoading(false);
            setMessage({ message: loginResponse.message, error: true, general: true });
        }
    };

    return (
        <div className="container-fluid row h-100 m-0">
            <div className="col-md-3 col-xl-4" />
            <div className="col-md-6 col-xl-4">
                <div className="login-form">
                    <div className="d-flex justify-content-center login-form-top align-items-center">
                        <div className="login-form-top__line" />
                        <div className="rounded-pill p-5 login-form-top__img">
                            <Img src={'/img/login-avatar--min  (1).png'} width="60" height="60" />
                        </div>
                        <div className="login-form-top__line" />
                    </div>
                    {message.message && message.general && (
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
                            <div className="input-group-prepend">
                                <span className="input-group-text login-form__feild-icon ">
                                    <Img
                                        src={'/img/login-avatar--min  (1).png'}
                                        width="20"
                                        height="20"
                                    />
                                </span>
                            </div>
                            <Input
                                required
                                type="text"
                                value={username.value}
                                onChange={(e) =>
                                    setUsername({
                                        value: e.target.value,
                                        touch: true,
                                        error: e.target.value ? false : true
                                    })
                                }
                                className="form-control login-form__input"
                                placeholder="Username"
                            />
                        </div>
                        {message.message && username.error && (
                            <span
                                className={`${clsx({
                                    'text-danger': message.error
                                })} text-center d-block font-weight-bold`}>
                                {message.message}
                            </span>
                        )}
                        <div className="input-group my-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text login-form__feild-icon">
                                    <Img
                                        src={'/img/login-avatar--min  (2).png'}
                                        width="20"
                                        height="20"
                                    />
                                </span>
                            </div>
                            <Input
                                required
                                type="password"
                                value={password.value}
                                onChange={(e) =>
                                    setPassword({
                                        value: e.target.value,
                                        touch: true,
                                        error: e.target.value ? false : true
                                    })
                                }
                                className="form-control login-form__input"
                                placeholder="Password"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="d-block w-100 login-form__btn btn mb-3">
                            {loading ? <CircularProgress color="inherit" size={30} /> : 'Login'}
                        </Button>
                        <div className="form-check ">
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
                                Remember me
                            </Label>
                        </div>
                        <div className="w-100 my-2 login-form-bottom-line" />
                        <div className="d-flex justify-content-between login-form-bottom">
                            <Link
                                href="/signup"
                                className="login-form-bottom__left text-light  pointer">
                                <a>Create new Account</a>
                            </Link>
                            <Link
                                href="/reset-password"
                                className="login-form-bottom__right text-light pointer">
                                <a>Forget your password</a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-md-3 col-xl-4 " />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    login: (data, token) => dispatch(loginUser(data, token))
});

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));
