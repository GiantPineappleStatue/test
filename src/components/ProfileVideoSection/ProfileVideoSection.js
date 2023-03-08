import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../services/util';
import { getProfileVideos } from '../../services/video';
import { featuredVideo } from '../../redux/actions/profile';
import ProfileVideoCard from '../ProfileVideoCard/ProfileVideoCard';
import P1 from '../UI/P1/P1';
import VideoCard from '../VideoCard/VideoCard';
import ProfilePlaylistPopup from '../ProfilePlaylistsPopup/ProfilePlaylistPopup';

const ProfileVideoSection = ({ id }) => {
    const [videos, setVideos] = useState([]);
    const [featured, setFeatured] = useState([]);
    const profile = useSelector((state) => state.profile.profileUser);
    const user = useSelector((state) => state.auth.user);
    const [showPlaylists, setShowPlaylists] = useState({ show: false, mediaId: null });
    const dispatch = useDispatch();
    useEffect(() => {
        let mount = true;
        async function getVideos() {
            const response = await getProfileVideos({
                user_id: id
            });
            if (response.code === 'ABT0002' && mount) {
                let sortData = [...response.videos].filter((video) =>
                    profile.user.featured_video.includes(video._id)
                );
                sortData = sortData.slice(0, 2);
                setFeatured(sortData);
                setVideos(response.videos);
            }
        }
        getVideos();
        return () => {
            mount = false;
        };
    }, [profile, user]);
    const playlistPopupHandler = (mediaId) => {
        setShowPlaylists({ show: true, mediaId: mediaId });
    };
    const featuredHandler = async (id) => {
        const featured_video = [...profile.user.featured_video];
        let index = -1;
        index = featured_video.findIndex((i) => i === id);
        if (index !== -1) featured_video.splice(index, 1);
        else featured_video.push(id);
        if (featured_video.length > 2) return;
        const update_response = await updateProfile({
            user_id: user._id,
            featured_video: featured_video
        });
        if (update_response.code === 'ABT0000') dispatch(featuredVideo(featured_video));
    };
    return (
        <React.Fragment>
            {showPlaylists.show && (
                <ProfilePlaylistPopup
                    open={showPlaylists.show}
                    mediaId={showPlaylists.mediaId}
                    handleClose={() => setShowPlaylists({ show: false, mediaId: null })}
                />
            )}
            <div className="d-flex flex-wrap flex-md-nowrap justify-content-between ">
                {featured.length > 0 &&
                    featured.map((item, i) => (
                        <ProfileVideoCard key={i} video={item} type="video" />
                    ))}
            </div>

            {videos.length > 0 && (
                <div className="row col-12 my-3">
                    <div className="w-100" style={{ background: '#716e86', height: '1px' }} />
                </div>
            )}
            {/* {videos.length > 0 && <ProfileSubNavigation />} */}
            {/**  Video Card */}
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
                {videos.length === 0 && <P1 className="text-white mb-0 h5">No Content to Show</P1>}
                {videos.length > 0 &&
                    videos.map((video, i) => (
                        <VideoCard
                            key={i}
                            playlistPopupHandler={playlistPopupHandler}
                            featuredHandler={featuredHandler}
                            video={video}
                            type="profileVideo"
                        />
                    ))}
            </div>
        </React.Fragment>
    );
};

export default React.memo(ProfileVideoSection);
