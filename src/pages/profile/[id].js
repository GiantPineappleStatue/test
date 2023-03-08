import React, { useState, useEffect } from 'react';
// import ProfileSubNavigation from '../../../components/ProfileSubNavigation/ProfileSubNavigation';
import ProfileHeadSection from '../../components/ProfileHeadSection/ProfileHeadSection';
import { connect, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { featuredVideo, profileClean } from '../../redux/actions/profile';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation';
import ProfileVideoSection from '../../components/ProfileVideoSection/ProfileVideoSection';
import ProfileAudioSection from '../../components/ProfileAudioSection/ProfileAudioSection';
import ProfileAboutSection from '../../components/ProfileAboutSection/ProfileAboutSection';
import AddPlaylist from '../../components/AddPlaylist/AddPlaylist';
import Layout from '../../components/LayoutV2/LayoutV2';
import ProfileMonetization from '../../components/ProfileMonetization/ProfileMonetization';
import ProfileTransactionHistory from '../../components/ProfileTransactionHistory/ProfileTransactionHistory';
import ProfileCashoutInfo from '../../components/ProfileCashoutInfoSection/ProfileCashoutInfoSection';
import ProfileSubscriptions from '../../components/ProfileSubscriptions/ProfileSubscriptions';
import { useRouter } from 'next/router';

function Profile({ user, id }) {
    const [activeTab, setActiveTab] = useState('video');
    const [playlist, setPlaylist] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        return () => {
            dispatch(profileClean());
        };
    }, []);
    useEffect(() => {
        const { success } = router.query;
        if (success) {
            setActiveTab('backing');
        }
    }, []);
    return (
        <Layout>
            <div className="container-fluid">
                {playlist && <AddPlaylist open={playlist} handleClose={setPlaylist} />}

                {/* <ProfileHeadSection /> */}
                {(activeTab === 'video' || activeTab === 'audio') && <ProfileHeadSection id={id} />}
                {/** Profile Nevigation */}
                <ProfileNavigation
                    changehandler={setActiveTab}
                    active={activeTab}
                    activeUser={user?._id === id}
                    playlistHandler={() => setPlaylist((prev) => !prev)}
                />
                {/** Profile Video */}
                {activeTab === 'video' && <ProfileVideoSection id={id} />}
                {/* Profile Audio Section */}
                {activeTab === 'audio' && <ProfileAudioSection id={id} />}
                {/* Profile About Section */}
                {activeTab === 'about' && <ProfileAboutSection id={id} />}
                {/* Profile Monetization Section */}
                {user?._id === id && activeTab === 'monetization' && <ProfileMonetization />}
                {/* Profile Transaction History */}
                {user?._id === id && activeTab === 'history' && <ProfileTransactionHistory />}
                {/* Profile CashoutInfo */}
                {user?._id === id && activeTab === 'wallet' && <ProfileCashoutInfo />}
                {user?._id === id && activeTab === 'subscriptions' && <ProfileSubscriptions />}
            </div>
        </Layout>
    );
}
Profile.getInitialProps = async (ctx) => {
    return {
        id: ctx.query.id
    };
};
const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.profile.profileUser
});

export default connect(mapStateToProps, { featuredVideo })(Profile);
