import React from 'react';
import { getAllBugs, getAllLogs } from '../../services/util';
import DataTable,{createTheme} from 'react-data-table-component';
import memorize from 'memorize-one';

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

const columns = memorize(()=>[
    {
        name: 'ID',
        selector: '_id',
    },
    {
        name: 'Title',
        selector: 'title',
    },
    {
        name: 'Description',
        selector: 'desc',
    },
    {
        name: 'Timestamp',
        selector: 'timestamp',
    }
]);

function AdminBugs() {
    const [page,setPage] = React.useState(1);
    const [logs, setLogs] = React.useState({
        docs:[],
        total:0,
        page:null,
        pages:null
    });
    React.useEffect(() => {
        let mount = true;
        const getLogs = async () => {
            let response = await getAllBugs(page);
            if (response.code === 'ABT0000' && mount) {
                const modifyData = [...response.allBugs.docs].map((item) => ({
                    ...item,
                    timestamp: new Date(item.timestamp).toLocaleString()
                }));
                setLogs({ ...response.allBugs, docs: modifyData });
            }
        };
        getLogs();
        return () => {
            mount = false;
        };
    }, [page]);
    return (
        <div className="container-fluid">
            <DataTable 
                columns={columns()}
                data={logs.docs}
                theme="solarized"
                pagination={true}
                paginationServer
                paginationTotalRows={logs.total}
                paginationPerPage={5}
                paginationComponentOptions={{
                    noRowsPerPage: true
                }}
                onChangePage={page => setPage( --page )}
            />
            {/* <MaterialTable title="Logs" data={logs.data} columns={logs.columns} /> */}
        </div>
    );
}

export default AdminBugs;
