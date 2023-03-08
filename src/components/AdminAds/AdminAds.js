import React from 'react';
import { getAllAds, approveAdminAds } from '../../services/util';
import AdminApprovalTable from '../AdminApprovalTable/AdminApprovalTable';

function AdminAds(props) {
    const tableRef = React.useRef();
    const videoStatusUpdateHandler = async (videoId, status) => {
        let result = await approveAdminAds({
            _id: videoId,
            approve: !status
        });
        if (result.code === 'ABT0000') tableRef.current.onQueryChange();
    };

    const adDeleteHandler = () => {};
    return (
        <div className="container-fluid ">
            <AdminApprovalTable
                title="Ads"
                ref={tableRef}
                fetchData={(query) =>
                    new Promise(async (resolve, reject) => {
                        const videoData = await getAllAds(query.page + 1, query.pageSize);
                        if (videoData.code === 'ABT0002') {
                            resolve({
                                data: videoData.ads.docs,
                                page: videoData.ads.page - 1,
                                totalCount: videoData.ads.total
                            });
                        }
                    })
                }
                type="ad"
                changeHandler={videoStatusUpdateHandler}
                deletehandler={adDeleteHandler}
                {...props}
            />
        </div>
    );
}

export default AdminAds;
