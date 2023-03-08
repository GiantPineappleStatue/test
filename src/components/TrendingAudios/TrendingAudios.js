import React from 'react';
import AudioCard from '../AudioCardV2/AudioCardV2';
import Link from 'next/link';
import { getAudio } from '../../services/audio';
import AudioModelV2 from '../AudioModelV2/AudioModelV2';
const TrendingAudios = ({ data }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [audioDetails, setAudioDetails] = React.useState({});

    const activeIdHandler = async (id) => {
        await getAudioDetails(id);
        console.log(id);
        setModalShow(true);
    };
    const getAudioDetails = async (id) => {
        const audioData = await getAudio(id);
        console.log(audioData);
        if (audioData.code === 'ABT0000')
            setAudioDetails({ video: audioData.album, relatedVideos: audioData.audios.docs });
    };
    return (
        <>
            <div className="mb-60 artbot-px-18 ">
                {modalShow && (
                    <AudioModelV2
                        video={audioDetails}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        handleClose={() => setModalShow(false)}
                    />
                )}
                <div className="audio-heading">
                    <h4>Trending Audio</h4>
                    <Link href="/audio">
                        <a>See more</a>
                    </Link>
                </div>
                <div className="row ">
                    {data?.map((card, index) => (
                        <div
                            className="col-md-3 col-lg-3 col-xl-3 col-xxl-3 col-sm-6 col-xs-12"
                            key={index}>
                            <AudioCard activeIdHandler={activeIdHandler} card={card} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TrendingAudios;
