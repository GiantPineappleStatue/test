import React from 'react';
import { paymentHistory } from '../../services/util';
import { timeago } from '../../utils/relativeTime';
import memorize from 'memorize-one';
import DataTable,{createTheme} from 'react-data-table-component';

const columns = memorize(()=>[
    {
        name: 'ID',
        selector: 'paymentId'
    },
    {
        name: 'Payment Method',
        selector: 'paymentMethod'
    },
    {
        name: 'Email',
        selector: 'email'
    },
    {
        name: 'Amount',
        selector: 'amount'
    },
    {
        name: 'Paid',
        selector: 'paid'
    },
    {
        name: 'Transaction Time',
        selector: 'createdAt',
        cell: (row) => <p>{timeago(Date.parse(row.createdAt))}</p>
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

const ProfileTransactionHistory = () => {
    const [trasactionHistory, setTrasactionHistory] = React.useState({
        docs:[],total:null,pages:null,page:null  
    });
    const [page,setPage] = React.useState(1);
    React.useEffect(() => {
        let mount = true;
        if (mount) getHistory();
        return () => {
            mount = false;
        };
    }, [page]);
    const getHistory = async () => {
        const response = await paymentHistory();
        if (response.data.code === 'ABT0000') {
            setTrasactionHistory({
                ...response.data.history
            });
        }
    };
    return (
        <div className="container-fluid">
            <DataTable 
                columns={columns()}
                data={trasactionHistory.docs}
                pagination={true}
                
                paginationPerPage={5}
                theme="solarized"
                paginationServer
                paginationTotalRows={trasactionHistory.total}
                paginationComponentOptions={{
                    noRowsPerPage: true
                }}
                onChangePage={page => setPage( --page )}
            
            />
            
        </div>
    );
};
export default React.memo(ProfileTransactionHistory);
