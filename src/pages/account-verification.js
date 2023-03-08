import React, { useEffect, useState } from 'react';
import { verifyAccount } from '../services/util';
import P1 from '../components/UI/P1/P1';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Img from '../components/UI/Img/Img';
import Layout from '../components/LayoutV2/LayoutV2';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
import { useRouter } from 'next/router';
export default (props) => {
    const router = useRouter();
    const { query } = router;
    const user = query.username;
    const activationKey = query.activation_key;
    const isMovie = query.isMovie || false;
    const [loading, setLoading] = useState({
        load: true,
        message: 'Please wait we are verifying your account',
        error: true
    });
    let Wrapper = Layout;
    if (isMovie) {
        Wrapper = LetsMakeaMovieWrapper;
    }
    useEffect(() => {
        async function verify() {
            if (user && activationKey) {
                const { data } = await verifyAccount({
                    username: user,
                    activation_key: activationKey
                });
                if (data.code === 'ABT0000') {
                    setLoading({ load: false, message: data.message, error: false });
                } else {
                    setLoading({ load: false, message: data.message, error: true });
                }
            }
        }
        verify();
    }, []);
    return (
        <Wrapper>
            <div className="container-fluid row">
                <div className="col-4" />
                <div className="col-4">
                    <div className="verification text-center bg-white rounded py-2 py-lg-4 my-auto">
                        <P1 className="display-4 text-dark">Welcome</P1>
                        <Img
                            src={loading.error ? '/img/email-min.png' : '/img/verification-min.png'}
                            width="90"
                            height="70"
                            className="img-fluid"
                            alt="email"
                        />
                        <P1 className="my-2 text-dark font-weight-bold">{loading.message}</P1>
                        {loading.load && <CircularProgress color="inherit" size={40} />}
                    </div>
                </div>
                <div className="col-4" />
            </div>
        </Wrapper>
    );
};
