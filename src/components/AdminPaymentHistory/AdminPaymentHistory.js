import React from 'react';
import { timeago } from '../../utils/relativeTime';
import { getAllPaymentHistory } from '../../services/util';
import ReactDataTable from 'react-data-table-component';
import memorize from 'memorize-one';
const column = memorize(() => [
    {
        name: 'Id',
        selector: '_id',
        editable: 'never'
    },
    {
        name: 'Payment Type',
        selector: 'paymentMethod',
        filtering: false,
        sorting: false,
        editable: 'never'
    },
    {
        name: 'Username',
        selector: 'user.username',
        cellStyle: {
            fontSize: '16px'
        },
        editable: 'never'
    },
    {
        name: 'Email',
        selector: 'user.email',
        cellStyle: {
            fontSize: '16px'
        },
        editable: 'never'
    },
    {
        name: 'Payment For',
        selector: 'paymentFor',
        cellStyle: {
            fontSize: '16px'
        },
        filtering: false,
        sorting: false,
        editable: 'never'
    },
    {
        name: 'Amount',
        selector: 'amount',
        cellStyle: {
            fontSize: '16px'
        },
        filtering: false,
        sorting: false,
        editable: 'never'
    },
    {
        name: 'Upload Date',
        selector: 'created_at',
        cell: (row) => <span>{timeago(Date.parse(row.createdAt))}</span>,
        filtering: false,
        sorting: true,
        editable: 'never'
    }
]);

function AdminFeaturedVideo(props) {
    const tableRef = React.useRef();
    const [featuredVideo, setFeaturedVideo] = React.useState({
        docs: [],
        total: null,
        pages: null,
        page: null
    });
    const [page, setPage] = React.useState(1);
    React.useEffect(() => {
        let mount = true;
        if (mount) getData(mount);
        return () => {
            mount = false;
        };
    }, [page]);
    const getData = async (mount) => {
        const videoData = await getAllPaymentHistory(page);
        if (videoData.code === 'ABT0000' && mount) {
            setFeaturedVideo(videoData.history);
        }
    };

    return (
        <div className="container-fluid ">
            <ReactDataTable
                columns={column()}
                data={featuredVideo.docs}
                pagination={true}
                theme="solarized"
                paginationServer
                paginationTotalRows={featuredVideo.total}
                paginationPerPage={10}
                paginationComponentOptions={{
                    noRowsPerPage: true
                }}
                onChangePage={(page) => setPage(page === 1 ? page : --page)}
            />
        </div>
    );
}

export default AdminFeaturedVideo;
