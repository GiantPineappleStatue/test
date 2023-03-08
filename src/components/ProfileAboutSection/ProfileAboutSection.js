import React, { useState, useEffect } from 'react';
import P1 from '../UI/P1/P1';
import ProfileAboutDescription from '..//ProfileAboutDescription/ProfileAboutDescription';
import ProfileAboutDescriptionEdit from '../ProfileAboutDescriptionEdit/ProfileAboutDescriptionEdit';
import { connect } from 'react-redux';
import { getProfile } from '../../services/util';
const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

function ProfileAboutSection({ userId, id }) {
    const [update, setUpdate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({ user: { created_at: '' }, rating: 0 });
    useEffect(() => {
        let mount = true;
        if (userId === id) setUpdate(true);
        async function getUser() {
            let response = await getProfile({
                user_id: id
            });
            if (response.code === 'ABT0000' && mount) {
                const data = {
                    user: { ...response.data },
                    rating: response.rating
                };
                setUser(data);
            }
        }
        getUser();
        return () => {
            mount = false;
        };
    }, [edit]);
    return (
        <div className="container-fluid row">
            <div className="col-md-8">
                {!edit && (
                    <ProfileAboutDescription
                        update={update}
                        edit={edit}
                        editHandler={setEdit}
                        user={user.user}
                    />
                )}
                {edit && <ProfileAboutDescriptionEdit editHandler={setEdit} user={user.user} />}
            </div>
            <div className="col-md-4">
                {/* <P1 className="text-white h5 ">STATS</P1>
				<div className="w-100" style={{ background: '#716e86', height: '1px', borderRadius: '10px' }} />
				<div className="d-flex align-items-center py-4 justify-content-between">
					<P1 className="font-weight-bold mb-0">0 VIEWS</P1>
					<P1 className="font-weight-bold mb-0">0$ REVENUE</P1>
				</div>
				<div className="w-100" style={{ background: '#716e86', height: '1px', borderRadius: '10px' }} /> */}
                <P1 className="font-weight-bold mt-4">
                    JOINED {` `}
                    {new Date(user.user.created_at).getDate()}
                    {`  `}
                    {monthNames[new Date(user.user.created_at).getMonth()]}
                    {`,  `}
                    {new Date(user.user.created_at).getFullYear()}
                </P1>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    userId: state.auth.user._id
});
export default React.memo(connect(mapStateToProps)(ProfileAboutSection));
