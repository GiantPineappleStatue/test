import React from 'react';
import { getMyPlaylists } from '../services/util';
import PlaylistCard from '../components/PlaylistCard/PlaylistCard';
import Layout from '../components/LayoutV2/LayoutV2';

const Playlist = ({ playlist }) => {
    return (
        <Layout title="Playlist">
            <div className="container-fluid">
                <div className="d-flex video-container flex-wrap justify-content-start  mx-xl-5 mx-md-5">
                    {playlist.length > 0 &&
                        playlist.map((item, i) => (
                            <PlaylistCard
                                type={item.type}
                                playlistId={item._id}
                                src={item?.list[0]?.thumbnailHash}
                                count={item.list.length}
                                id={item?.list[0]?._id}
                                key={i}
                            />
                        ))}
                </div>
            </div>
        </Layout>
    );
};

Playlist.getInitialProps = async (ctx) => {
    const data = await getMyPlaylists(null);
    if (data.code === 'ABT0000') return { playlist: [...data.playlists] };
    return { playlist: [] };
};

export default Playlist;
