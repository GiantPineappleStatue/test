import React from 'react';
import { getMySubscriptions, removeSubscribe } from '../../services/util';
import { timeago } from '../../utils/relativeTime';
import memorize from 'memorize-one';
import DataTable,{createTheme} from 'react-data-table-component';
import Button from '../UI/Button/Button';
const columns = memorize((handleDelete)=>[
    {
        name: 'Id',
        selector: '_id'
    },
    {
        name: 'Subscribe',
        selector: 'subscribe.username'
    },
    {
        name: 'Plan',
        selector: 'planId'
    },
    {
        name: 'Expired At',
        selector: 'expiredAt',
        cell: (row) => {
            return <p>{row.expiredAt?.split('T')[0]}</p>;
        }
    },
    {
        name: 'Created At',
        selector: 'createdAt',
        cell: (row) => {
            return <p>{timeago(new Date(row.createdAt))}</p>;
        }
    },
    {
		name: 'Actions',
		cell: (row) => (
			<React.Fragment>
				<Button className="border-0 btn btn-outline-danger"  onClick={() => handleDelete(row)}>
					<i className="fa fa-trash fa-1x" />
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
const ProfileSubscriptions = () => {
    const [subscription, setSubscriptions] = React.useState({
        docs:[],total:null,pages:null,page:null  
    });
    const [page,setPage] = React.useState(1);
    React.useEffect(() => {
        let mount = false;
        if (!mount) getData();
        return () => {
            mount = true;
        };
    }, [page]);
    const getData = async () => {
        const response = await getMySubscriptions(page);
        if (response.code === 'ABT0000') setSubscriptions({...response.subscriptions});
    };
    const removeHandler = async (rowData) => {
        const response = await removeSubscribe({ id: rowData._id });
        if (response.code === 'ABT0000') getData();
    };
    return (
        <DataTable 
        columns={columns(removeHandler)}
        data={subscription.docs}
        pagination={true}
        
        paginationPerPage={5}
        theme="solarized"
        paginationServer
        paginationTotalRows={subscription.total}
        paginationComponentOptions={{
            noRowsPerPage: true
        }}
        onChangePage={page => setPage( --page )}
    
    />
    );
};
export default React.memo(ProfileSubscriptions);
