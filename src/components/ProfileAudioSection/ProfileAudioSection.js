import React, { useState, useEffect } from 'react';

import ProfileSubNavigation from '../ProfileSubNavigation/ProfileSubNavigation';
import ProfileVideoCard from '..//ProfileVideoCard/ProfileVideoCard';
import ProfileAudioAndImageCard from '..//ProfileAudioAndImageCard/ProfileAudioAndImageCard';
import { connect } from 'react-redux';
import P1 from '../UI/P1/P1';
import ProfileHeadSection from '../ProfileHeadSection/ProfileHeadSection';
import { getProfileAudios } from '../../services/audio';
import { featuredAudio } from '../../redux/actions/profile';
import { updateProfile } from '../../services/util';

function ProfileAudioSection({ userId, profile, featuredAudio, id }) {
    const [audios, setAudios] = useState([]);
    const [featured, setFeatured] = useState([]);
    useEffect(() => {
        let mount = true;
        async function getAudios() {
            const response = await getProfileAudios({
                user_id: id
            });
            if (response.code === 'ABT0000' && mount) {
                let sortData = [...response.audios].filter((audio) =>
                    profile.user.featured_audio.includes(audio._id)
                );
                sortData = sortData.slice(0, 3);
                setFeatured(sortData);
                setAudios(response.audios);
            }
        }
        getAudios();
        return () => {
            mount = false;
        };
    }, [profile]);
    const featuredAudioHandler = async (id) => {
        const featured_audio = [...profile.user.featured_audio];
        let index = -1;
        index = featured_audio.findIndex((i) => i === id);
        if (index !== -1) featured_audio.splice(index, 1);
        else featured_audio.push(id);
        if (featured_audio.length > 3) return;
        const update_response = await updateProfile({
            user_id: userId,
            featured_audio: featured_audio
        });
        if (update_response.code === 'ABT0000') featuredAudio(featured_audio);
    };
    return (
        <div className="container-fluid">
            <div className="d-flex flex-wrap justify-content-between flex-md-nowrap ">
                {featured.length > 0 &&
                    featured.map((item, i) => (
                        <ProfileVideoCard key={i} video={item} type="audio" />
                    ))}
            </div>
            {/** Profile Nevigation */}
            {audios.length > 0 && (
                <React.Fragment>
                    <div className="row col-12 my-3">
                        <div className="w-100" style={{ background: '#716e86', height: '1px' }} />
                    </div>
                    <ProfileSubNavigation />
                </React.Fragment>
            )}
            {/**  Video Card */}
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
                {audios.length === 0 && <P1 className="text-white mb-0 h5">No Content to Show</P1>}
                {audios.length > 0 &&
                    audios.map((video, i) => (
                        <ProfileAudioAndImageCard
                            featuredHandler={featuredAudioHandler}
                            key={i}
                            type="profileAudio"
                            video={video}
                        />
                    ))}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    userId: state.auth.user._id,
    profile: state.profile.profileUser
});
export default React.memo(connect(mapStateToProps, { featuredAudio })(ProfileAudioSection));
