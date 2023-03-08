import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AdminNavigation from '../components/AdminNavigation/AdminNavigation';
import AdminVideo from '../components/AdminVideo/AdminVideo';
import Layout from '../components/LayoutV2/LayoutV2';
import { useDispatch } from 'react-redux';
import { subheaderChange } from '../redux/actions/videoCategory';
import { authInitialProps } from '../utils/withAuth';
import AdminWaitlist from '../components/AdminWaitlist/AdminWaitlist';
const AdminAudio = dynamic(() => import('../components/AdminAudio/AdminAudio'));
const AdminImage = dynamic(() => import('../components/AdminImage/AdminImage'));
const AdminFeaturedVideo = dynamic(() =>
    import('../components/AdminFeaturedVideo/AdminFeaturedVideo')
);
const AdminAds = dynamic(() => import('../components/AdminAds/AdminAds'));
const AdminUsers = dynamic(() => import('../components/AdminUsers/AdminUsers'));
const AdminLogs = dynamic(() => import('../components/AdminLogs/AdminLogs'));
const AdminBugs = dynamic(() => import('../components/AdminBugs/AdminBugs'));
const AdminPaymentHistory = dynamic(() =>
    import('../components/AdminPaymentHistory/AdminPaymentHistory')
);
const Admin = () => {
    const [active, setActive] = useState('video');
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(subheaderChange());
        return () => {
            dispatch(subheaderChange());
        };
    }, []);
    return (
        <Layout>
            <React.Fragment>
                <AdminNavigation changehandler={setActive} active={active} />
                {/** Admin Videos */}
                {active === 'video' && <AdminVideo />}
                {/* Admin Featured Video */}
                {active === 'fvideo' && <AdminFeaturedVideo />}
                {/* Admin Audio */}
                {active === 'audio' && <AdminAudio />}
                {/* Admin Image */}
                {/* {active === 'image' && <AdminImage />} */}
                {/* Admin Ads */}
                {active === 'ads' && <AdminAds />}
                {/* Admin Users */}
                {active === 'users' && <AdminUsers />}
                {/* Admin Logs */}
                {active === 'logs' && <AdminLogs />}
                {/** Admin Bugs */}
                {active === 'bugs' && <AdminBugs />}
                {/** Admin Waitlist */}
                {active === 'waitlist' && <AdminWaitlist />}
                {/** Backing logs */}
                {active === 'backing' && <AdminPaymentHistory />}
            </React.Fragment>
        </Layout>
    );
};
Admin.getInitialProps = authInitialProps('private');
export default Admin;
