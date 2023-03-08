import React from 'react';
import P1 from '../../components/UI/P1/P1';
import Label from '../../components/UI/Label/Label';
import AudioTrackCard from '../../components/AudioTrackCard/AudioTrackCard';
import { connect } from 'react-redux';
import { addAudios, removeAudio, updateAudio } from '../../redux/actions/videoUpload';
import Layout from '../../components/LayoutV2/LayoutV2';
import { authInitialProps } from '../../utils/withAuth';
const AudioTracks = ({ addAudios, removeAudio, updateAudio, audios }) => {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 ">
                        <div
                            className="d-flex justify-content-between align-items-end"
                            style={{ borderBottom: '#514877' }}>
                            <P1 className="mb-1 text-white font-weight-light">TrackList</P1>
                            <Label
                                htmlFor="file"
                                className="btn bg-color-purple btn-sm rounded-10 ml-1">
                                Upload
                                <input
                                    onChange={(e) => addAudios([...e.target.files])}
                                    type="file"
                                    accept="audio/*"
                                    id="file"
                                    className="d-none"
                                    multiple
                                />
                            </Label>
                        </div>
                        <div
                            style={{ height: '1px', width: '100%', background: '#514877' }}
                            className="mb-3"
                        />
                        {audios.length > 0 &&
                            audios.map((item, i) => (
                                <AudioTrackCard
                                    audio={item}
                                    key={i}
                                    name={item.name}
                                    duration={item.size}
                                    index={i}
                                    deleteHandler={removeAudio}
                                    updateHandler={updateAudio}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

AudioTracks.getInitialProps = authInitialProps('protected');
const mapStateToProps = (state) => ({
    audios: state.videoUpload.audioTracks
});
export default connect(mapStateToProps, { addAudios, removeAudio, updateAudio })(AudioTracks);
