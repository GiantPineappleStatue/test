import React from 'react';
import { approveAdminImages, getAdminImages, deleteImageAlbum } from '../../services/image';
import AdminApprovalTable from '../AdminApprovalTable/AdminApprovalTable';

function AdminImage(props) {
    const tableRef = React.useRef();
    const [albums, setAlbums] = React.useState([]);
    React.useEffect(() => {
        let mount = true;
        if (mount) getData(mount);
        return () => {
            mount = false;
        };
    }, []);
    const getData = async (mount) => {
        const videoData = await getAdminImages();
        if (videoData.code === 'ABT0000' && mount) setAlbums(videoData.albums);
    };
    const videoStatusUpdateHandler = async (videoId, status) => {
        const result = await approveAdminImages({
            _id: videoId,
            approve: !status
        });
        // if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData(true);
    };
    const imageDeletehandler = async (id) => {
        const result = await deleteImageAlbum(id);
        // if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData(true);
    };
    return (
        <div className="container-fluid">
            <AdminApprovalTable
                title="Images"
                ref={tableRef}
                // fetchData={(query) =>
                // 	new Promise(async (resolve, reject) => {
                // 		const videoData = await getAdminImages(query.page + 1, query.pageSize);
                // 		if (videoData.code === 'ABT0000') {
                // 			// setVideos({ ...videos, data: videoData.videos.docs });
                // 			resolve({
                // 				data: videoData.albums.docs,
                // 				page: videoData.albums.page - 1,
                // 				totalCount: videoData.albums.total
                // 			});
                // 		}
                // 	})}
                fetchData={albums}
                type="image"
                changeHandler={videoStatusUpdateHandler}
                deletehandler={imageDeletehandler}
                {...props}
            />
        </div>
    );
}

export default AdminImage;
