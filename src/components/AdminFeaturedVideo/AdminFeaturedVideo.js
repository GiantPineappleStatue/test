import React from 'react';
import { getAdminFeaturedVideos, updateFeaturedVideo } from '../../services/video';
import { timeago } from '../../utils/relativeTime';
import { changeFeaturedIndex } from '../../services/util';
import ReactDataTable from 'react-data-table-component';
import memorize from 'memorize-one';
import Button from '../UI/Button/Button';
const column = memorize((featureChange, featureIndexChange) => [
    {
        name: 'Id',
        selector: '_id',
        editable: 'never'
    },
    {
        selector: 'thumbnailUrl',
        name: 'Avatar',
        cell: (rowData) => {
            let url = 'https://artbot.mypinata.cloud/ipfs/';
            if (rowData.type === 'ad_image') url = url + rowData.hash;
            else if (rowData.type === 'ad_audio') url = url + rowData.hash;
            else if (rowData.type === 'ad_video') url = url + rowData.hash;
            else url = url + rowData.thumbnailHash;
            url = url + '?img-width=100';
            return <img src={url} style={{ width: 100, borderRadius: '10%' }} alt="img" />;
        },
        filtering: false,
        editable: 'never'
    },
    {
        name: 'Title',
        selector: 'title',
        cell: (row) => <p>{row?.title?.substring(0, 20)}</p>,
        filtering: false,
        sorting: false,
        editable: 'never'
    },
    {
        name: 'Username',
        selector: 'username',
        cellStyle: {
            fontSize: '16px'
        },
        editable: 'never'
    },
    {
        name: 'Type',
        selector: 'type',
        cellStyle: {
            fontSize: '16px'
        },
        filtering: false,
        sorting: false,
        editable: 'never'
    },
    {
        name: 'Status',
        selector: 'approved',
        cell: (row) => (
            <span className={`badge ${row.approved ? 'badge-success' : 'badge-danger'}`}>{`${
                row.approved ? 'Approved' : 'Pending'
            }`}</span>
        ),
        sorting: false,
        filtering: false,
        editable: 'never'
    },
    {
        name: 'Featured',
        selector: 'featured',
        cell: (row) => (
            <span className={`badge ${row.featured ? 'badge-success' : 'badge-danger'}`}>{`${
                row.featured ? 'Featured' : ''
            }`}</span>
        ),
        sorting: true,
        filtering: true,
        editable: 'never'
    },
    {
        name: 'Featured Index',
        selector: 'featuredIndex',
        cell: (row) => (
            <span>
                {row.featuredIndex ? (
                    row.featuredIndex
                ) : (
                    <form
                        onSubmit={(e) => featureIndexChange(e, row._id)}
                        className="d-flex flex-wrap">
                        <input name="index" min="1" style={{ width: '70px' }} type="number" />
                        <Button type="submit" className="border-0 btn btn-sm btn-outline-primary">
                            <i className="fas fa-save"></i>
                        </Button>
                    </form>
                )}
            </span>
        )
    },
    {
        name: 'Upload Date',
        selector: 'created_at',
        cell: (row) => <span>{timeago(Date.parse(row.created_at))}</span>,
        filtering: false,
        sorting: true,
        editable: 'never'
    },
    {
        name: 'Actions',
        cell: (row) => (
            <React.Fragment>
                <Button
                    className="border-0 btn btn-outline-primary"
                    onClick={() => featureChange(row._id, row.featured)}>
                    <i className="fas fa-save"></i>
                </Button>
            </React.Fragment>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
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
        const videoData = await getAdminFeaturedVideos(page);
        if (videoData.code === 'ABT0000' && mount) {
            setFeaturedVideo(videoData.featured_video);
        }
    };
    const changeHandler = async (id, featured) => {
        const result = await updateFeaturedVideo(id, !featured);
        if (result.code === 'ABT0000') getData(true);
    };

    const changeIndexHandler = async (e, id) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const index = form.get('index');
        console.log(index, 'index');
        console.log(id, 'index id');
        const res = await changeFeaturedIndex({
            _id: id,
            index: index
        });
        if (res.code === 'ABT0000') getData(true);
    };

    return (
        <div className="container-fluid ">
            <ReactDataTable
                columns={column(changeHandler, changeIndexHandler)}
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
