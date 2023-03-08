import React from 'react';
import { getAdminVideos, approveAdminVideos, deleteVideo } from '../../services/video';
import AdminApprovalTable from '../AdminApprovalTable/AdminApprovalTable';

function AdminVideo(props) {
    const tableRef = React.useRef();
    const [videos, setVideos] = React.useState({docs:[],total:null,pages:null,page:null});
    const [page,setPage] = React.useState(1);
    React.useEffect(() => {
        let mount = true;
        if (mount) getData(mount);
        return () => {
            mount = false;
        };
    }, [page]);
    const getData = async (mount) => {
        const videoData = await getAdminVideos(page);
        if (videoData.code === 'ABT0000' && mount) setVideos(videoData.videos);
    };
    const videoStatusUpdateHandler = async (videoId, status) => {
        let result = await approveAdminVideos({
            _id: videoId,
            approve: !status
        });
        // if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData(true);
    };

    const deleteVideoHandler = async (videoId) => {
        console.log(videoId);
        const result = await deleteVideo(videoId);
        // if (result.data.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.data.code === 'ABT0000') getData(true);
    };

    return (
        <div className="container-fluid ">
            <AdminApprovalTable
                title="Videos"
                data={videos}
                updateHandler={videoStatusUpdateHandler}
                deleteHandler={deleteVideoHandler}
                setPage={setPage}
                
            />
        </div>
    );
}

export default AdminVideo;
