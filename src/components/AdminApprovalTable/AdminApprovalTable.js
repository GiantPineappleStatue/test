import React from 'react';
import { timeago } from '../../utils/relativeTime';
import DataTable,{createTheme} from 'react-data-table-component';
import memorize from 'memorize-one';
import Button from '../UI/Button/Button';

const column = memorize((updateStatus,handleDelete)=>[
    {
        name: 'Id',
        selector: '_id',
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
            url = url+'?img-width=100'
            return <img src={url} style={{ width: 100, borderRadius: '10%' }} alt="img" />;
        }
    },
    {
        name: 'Title',
        selector: 'title',
        cell: (row) => <p>{row.title.substring(0, 20)}</p>,
     
    },
    {
        name: 'Username',
        selector: 'username',
       
    },
    {
        name: 'Type',
        selector: 'type',
        cellStyle: {
            fontSize: '16px'
        },
      
    },
    {
        name: 'Status',
        selector: 'approved',
        cell: (row) => (
            <span className={`badge ${row.approved ? 'badge-success' : 'badge-danger'}`}>{`${
                row.approved ? 'Approved' : 'Pending'
            }`}</span>
        ),
      
    },

    {
        name: 'Upload Date',
        selector: 'created_at',
        cell: (row) => <span>{timeago(Date.parse(row.created_at))}</span>,
        
    },
    {
		name: 'Actions',
		cell: (row) => (
			<React.Fragment>
				<Button className="border-0 btn btn-outline-danger"  onClick={() => handleDelete(row._id)}>
					<i className="fa fa-trash fa-1x" />
				</Button>
				<Button className="border-0 btn btn-outline-primary"  onClick={() => updateStatus(row._id,row.approved)}>
                <i className="fas fa-save"></i>
				</Button>
			</React.Fragment>
		),
		ignoreRowClick: true,
		allowOverflow: true,
		button: true
	}
]);

createTheme('solarized', {
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    background: {
      default: 'transparent',
    },
    context: {
      background: 'transparent',
      text: '#FFFFFF',
    },
    divider: {
      default: '#fff',
    },
    action: {
      button: '#fff',
      hover: '#fff',
      disabled: '#fff',
    },
  });


export default ({data,updateHandler,deleteHandler,setPage}) => (
    <DataTable 
        columns={column(updateHandler,deleteHandler)}
        data={data.docs}
        pagination={true}
        theme="solarized"
        paginationServer
        paginationTotalRows={data.total}
        paginationPerPage={5}
        paginationComponentOptions={{
            noRowsPerPage: true
        }}
        onChangePage={page => setPage( --page )}

    />
   
);
