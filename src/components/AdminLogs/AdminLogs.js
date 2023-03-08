import React from 'react';
import { getAllLogs } from '../../services/util';
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
        name: 'Event ID',
        selector: 'log_type',
    },
    {
        name: 'Event Message',
        selector: 'message',
    },
    {
        name: 'Username',
        selector: 'username',
    },
    {
        name: 'IP Address',
        selector: 'ip_address',
    },
    {
        name: 'Timestamp',
        selector: 'timestamp',
    }
]);

function AdminLogs() {
    const [logs, setLogs] = React.useState({
        columns: [
            {
                title: 'Event ID',
                field: 'log_type',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Event Message',
                field: 'message',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Username',
                field: 'username',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'IP Address',
                field: 'ip_address',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Timestamp',
                field: 'timestamp',
                cellStyle: {
                    fontSize: '16px'
                }
            }
        ],
        data: []
    });
    React.useEffect(() => {
        let mount = true;
        const getLogs = async () => {
            let response = await getAllLogs();
            if (response.code === 'ABT0000' && mount) {
                const modifyData = [...response.logs].map((item) => ({
                    ...item,
                    timestamp: new Date(item.timestamp).toLocaleString()
                }));
                setLogs({ columns: logs.columns, data: modifyData });
            }
        };
        getLogs();
        return () => {
            mount = false;
        };
    }, []);
    return (
        <div className="container-fluid">
            <DataTable 
                columns={columns()}
                data={logs.data}
                theme="solarized"
                paginationPerPage={5}
                theme="solarized"
                pagination={true}
            />
            {/* <MaterialTable title="Logs" data={logs.data} columns={logs.columns} /> */}
        </div>
    );
}

export default AdminLogs;
