import React from 'react';
import { approveAdminAudios, getAdminAudios, deleteAlbum } from '../../services/audio';
import AdminApprovalTable from '../AdminApprovalTable/AdminApprovalTable';

function AdminAudio(props) {
    const tableRef = React.useRef();
    const [albums, setAlbums] = React.useState({docs:[],total:null,pages:null,page:null});
    const [page,setPage] = React.useState(1);
    React.useEffect(() => {
        let mount = true;
        if (mount) getData(mount);
        return () => {
            mount = false;
        };
    }, [page]);
    const getData = async (mount) => {
        const videoData = await getAdminAudios(page);
        if (videoData.code === 'ABT0000' && mount) setAlbums(videoData.albums);
    };

    const videoStatusUpdateHandler = async (videoId, status) => {
        const result = await approveAdminAudios({
            _id: videoId,
            approve: !status
        });
        //if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData(true);
    };
    const deleteAudioHandler = async (id) => {
        const result = await deleteAlbum(id);
        // if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData(true);
    };
    return (
        <div className="container-fluid">

            <AdminApprovalTable
                title="Audios"
                data={albums}
                updateHandler={videoStatusUpdateHandler}
                deleteHandler={deleteAudioHandler}
                setPage={setPage}
               
            />
        </div>
    );
}

export default AdminAudio;
