import React from 'react';
import { timeago } from '../../utils/relativeTime';
import { getAllUsers, getAllUsersMail } from '../../services/util';
import memorize from 'memorize-one';
import DataTable, { createTheme } from 'react-data-table-component';
import ReactIcons from '../UI/ReactIcons/ReactIcons';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

createTheme('solarized', {
    text: {
        primary: '#fff',
        secondary: '#fff'
    },
    background: {
        default: 'transparent'
    },
    context: {
        background: 'transparent',
        text: '#FFFFFF'
    },
    divider: {
        default: '#fff'
    },
    action: {
        button: '#fff',
        hover: '#fff',
        disabled: '#fff'
    }
});

const columns = memorize(() => [
    {
        name: 'Name',
        selector: 'profile_name'
    },
    {
        name: 'Username',
        selector: 'username'
    },
    {
        name: 'Email',
        selector: 'email'
    },
    {
        name: 'Signed Up',
        selector: 'created_at'
    }
]);

function AdminUsers() {
    const [users, setUsers] = React.useState({
        columns: [
            {
                title: 'Name',
                field: 'profile_name',
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
                title: 'Email',
                field: 'email',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Signed Up',
                field: 'created_at',
                cellStyle: {
                    fontSize: '16px'
                }
            }
        ],
        data: []
    });
    React.useEffect(() => {
        let mount = true;
        const getUsers = async () => {
            const response = await getAllUsers();
            if (response.code === 'ABT0000' && mount) {
                const modifyData = [...response.users].map((item) => ({
                    ...item,
                    created_at: timeago(Date.parse(item.created_at))
                }));
                setUsers({ columns: users.columns, data: modifyData });
            }
        };
        getUsers();
        return () => {
            mount = false;
        };
    }, []);
    const downloadHandler = async () => {
        const data = await getAllUsersMail();
        if (data.code === 'ABT0000') {
            const a = document.createElement('a');
            a.href = data.url;
            a.click();
        }
    };
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-end">
                <span className="pointer" onClick={downloadHandler}>
                    <Tooltip title="Download Users" placement="bottom">
                        <ReactIcons.AiOutlineDownload size={20} />
                    </Tooltip>
                </span>
            </div>
            <DataTable
                columns={columns()}
                data={users.data}
                pagination={true}
                paginationPerPage={5}
                theme="solarized"
            />
        </div>
    );
}

export default AdminUsers;
