import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer/Footer';

import Layout from '../components/LayoutV2/LayoutV2';
import LetsMakeaMovieHeaderV1 from '../components/LetsMakeaMovieHeaderV1/LetsMakeaMovieHeaderV1';
import LetsMakeaMovieHeaderV2 from '../components/LetsMakeaMovieHeaderv2/LetsMakeaMovieHeaderV2';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
import SignupPage from '../components/SignupPage/SignupPage';
function SignUp() {
    const router = useRouter();
    const { query } = router;
    const code = query.code;
    const isMovie = useSelector((state) => state.filter.letsMakeMovie);
    const isMovieV2 = useSelector((state) => state.filter.letsMakeMovieV2);
    if (isMovie || code || isMovieV2) {
        return (
            <LetsMakeaMovieWrapper
                header={isMovieV2 ? <LetsMakeaMovieHeaderV2 /> : <LetsMakeaMovieHeaderV1 />}>
                <SignupPage inviteCode={code} isMovie={isMovie} />
                <Footer movie={true} />
            </LetsMakeaMovieWrapper>
        );
    }
    return (
        <Layout title="Artbot">
            <SignupPage />
        </Layout>
    );
}

export default SignUp;
