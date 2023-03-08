import React from 'react';
import Img from '../components/UI/Img/Img';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import clsx from 'clsx';
import Alert from '../components/UI/Alert/Alert';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { resetPassword } from '../services/util';
import Layout from '../components/LayoutV2/LayoutV2';
import { useSelector } from 'react-redux';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
import Footer from '../components/Footer/Footer';
import LetsMakeaMovieHeaderV2 from '../components/LetsMakeaMovieHeaderv2/LetsMakeaMovieHeaderV2';
import LetsMakeaMovieHeaderV1 from '../components/LetsMakeaMovieHeaderV1/LetsMakeaMovieHeaderV1';

function ResetPassword(props) {
    const isMovie = useSelector((state) => state.filter.letsMakeMovie);
    const isMovieV2 = useSelector((state) => state.filter.letsMakeMovieV2);

    const [email, setEmail] = React.useState({ value: '', touch: false, error: false });

    const [message, setMessage] = React.useState({ message: '', error: false, general: false });
    const [loading, setLoading] = React.useState(false);
    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        let resetResponse = await resetPassword({ email: email.value.trim() });
        if (resetResponse.data.code === 'ABT0000') {
            setMessage({ message: resetResponse.data.message, error: false, general: true });
            setEmail({ ...email, value: '' });
            localStorage.setItem('isMovieChangePassword', true);
        } else {
            setMessage({ message: resetResponse.data.message, error: true, general: true });
        }
        setLoading(false);
    };
    let Wrapper = Layout;
    if (isMovie || isMovieV2) {
        Wrapper = LetsMakeaMovieWrapper;
    }

    return (
        <Wrapper
            title="ArtBot"
            header={isMovieV2 ? <LetsMakeaMovieHeaderV2 /> : <LetsMakeaMovieHeaderV1 />}>
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
                                    type="email"
                                    value={email.value}
                                    onChange={(e) =>
                                        setEmail({
                                            value: e.target.value,
                                            touch: true,
                                            error: e.target.value ? false : true
                                        })
                                    }
                                    className="form-control login-form__input"
                                    placeholder="Email"
                                />
                            </div>
                            {message.message && email.error && (
                                <span
                                    className={`${clsx({
                                        'text-danger': message.error
                                    })} text-center d-block font-weight-bold`}>
                                    {message.message}
                                </span>
                            )}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="d-block w-100 login-form__btn btn mb-3">
                                {loading ? <CircularProgress color="inherit" size={30} /> : 'Send'}
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="col-md-4" />
            </div>
            {isMovie && <Footer />}
        </Wrapper>
    );
}

export default ResetPassword;
