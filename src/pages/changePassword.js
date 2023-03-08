import React from 'react';
import Img from '../components/UI/Img/Img';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import clsx from 'clsx';
import Alert from '../components/UI/Alert/Alert';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { changePassword } from '../services/util';
import { useRouter } from 'next/router';
import Layout from '../components/LayoutV2/LayoutV2';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
import Footer from '../components/Footer/Footer';
const ChangePassword = (props) => {
    const router = useRouter();
    const { query } = router;
    const secretKey = query.token;
    const [password, setPassword] = React.useState({ value: '', touch: false, error: false });
    const [confirmPassword, setConfirmPassword] = React.useState({
        value: '',
        touch: false,
        error: false
    });

    const [message, setMessage] = React.useState({ message: '', error: false, general: false });
    const [loading, setLoading] = React.useState(false);
    const [changeLayout, setChangeLayout] = React.useState(false);
    React.useEffect(() => {
        const isMoviePassword = JSON.parse(localStorage.getItem('isMovieChangePassword'));
        if (isMoviePassword) {
            setChangeLayout(isMoviePassword);
        }
    }, []);
    const submitHandler = async (e) => {
        if (password.value !== confirmPassword.value) return;
        setLoading(true);
        e.preventDefault();
        let changeResponse = await changePassword(
            { password: password.value },
            { Authorization: `Bearer ${secretKey}` }
        );
        if (changeResponse.code === 'ABT0000') {
            setMessage({ message: changeResponse.message, error: false, general: true });
            setPassword({ value: '', touch: false, error: false });
            setConfirmPassword({ value: '', touch: false, error: false });
        } else {
            setMessage({ message: changeResponse.message, error: true, general: true });
        }
        setLoading(false);
    };

    let Wrapper = Layout;
    if (changeLayout) {
        Wrapper = LetsMakeaMovieWrapper;
    }

    return (
        <Wrapper title="ArtBot">
            <div className="container-fluid row h-100">
                <div className="col-md-4" />
                <div className="col-md-4">
                    <div className="login-form">
                        <div className="d-flex justify-content-center login-form-top align-items-center">
                            <div className="login-form-top__line" />
                            <div className="rounded-pill p-5 login-form-top__img">
                                <Img
                                    src={'/img/login-avatar--min  (1).png'}
                                    width="60"
                                    height="60"
                                />
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
                                    placeholder="New Password"
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
                            <Button
                                type="submit"
                                disabled={loading}
                                className="d-block w-100 login-form__btn btn mb-3">
                                {loading ? (
                                    <CircularProgress color="inherit" size={30} />
                                ) : (
                                    'Change Password'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="col-md-4" />
            </div>
            {changeLayout && <Footer />}
        </Wrapper>
    );
};

export default ChangePassword;
