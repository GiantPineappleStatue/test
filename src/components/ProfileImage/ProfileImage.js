import React, { useState, useEffect } from 'react';
import ProfileSubNavigation from '../../../components/ProfileSubNavigation/ProfileSubNavigation';
import ProfileVideoCard from '../../../components/ProfileVideoCard/ProfileVideoCard';
import ProfileAudioAndImageCard from '../../../components/ProfileAudioAndImageCard/ProfileAudioAndImageCard';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import P1 from '../../../components/UI/P1/P1';
import ProfileHeadSection from '../../../components/ProfileHeadSection/ProfileHeadSection';
import { featuredImage } from '../../../store/actions/profile';
import { getProfileImages } from '../../../../services/image';
import { updateProfile } from '../../../../services/util';
function ProfileImage({ userId, profileUser, featuredImage }) {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [featured, setFeatured] = useState([]);
    useEffect(() => {
        let mount = true;
        async function getImages() {
            const response = await getProfileImages({
                user_id: id
            });
            if (response.code === 'ABT0002' && mount) {
                let sortData = [...response.images].filter((image) =>
                    profileUser.user.featured_2d3d.includes(image._id)
                );
                sortData = sortData.slice(0, 3);
                setFeatured(sortData);
                setImages(response.images);
            }
        }
        getImages();
        return () => {
            mount = false;
        };
    }, [profileUser]);
    const featuredImageHandler = async (id) => {
        const featured_2d3d = [...profileUser.user.featured_2d3d];
        let index = -1;
        index = featured_2d3d.findIndex((i) => i === id);
        if (index !== -1) featured_2d3d.splice(index, 1);
        else featured_2d3d.push(id);

        const update_response = await updateProfile({
            user_id: userId,
            featured_2d3d: featured_2d3d
        });
        if (update_response.code === 'ABT0000') featuredImage(featured_2d3d);
    };
    return (
        <div className="container-fluid">
            <ProfileHeadSection />
            <div className="d-flex flex-wrap flex-md-nowrap justify-content-between ">
                {featured.length > 0 &&
                    featured.map((item, i) => (
                        <ProfileVideoCard key={i} video={item} type="image" />
                    ))}
            </div>
            {/** Profile Nevigation */}
            {images.length > 0 && (
                <React.Fragment>
                    <div className="row col-12 my-3">
                        <div className="w-100" style={{ background: '#716e86', height: '1px' }} />
                    </div>
                    <ProfileSubNavigation />{' '}
                </React.Fragment>
            )}
            {/**  Video Card */}
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
                {images.length === 0 && <P1 className="text-white mb-0 h5">No Content to Show</P1>}
                {images.length > 0 &&
                    images.map((image, i) => (
                        <ProfileAudioAndImageCard
                            featuredHandler={featuredImageHandler}
                            key={i}
                            type="profileImage"
                            video={image}
                        />
                    ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userId: state.auth.user._id,
    profileUser: state.profile.profileUser
});

export default connect(mapStateToProps, { featuredImage })(ProfileImage);
