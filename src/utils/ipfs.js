import IPFS from 'ipfs-http-client';
import { getToken } from '../services/util';

export const ipfsUpload = async () => {
    const res = await getToken();

    return new Promise((resolve) => {
        if (res.data.code === 'ABT0001') {
            return { ipfs: null, error: true };
        }

        const ipfs = new IPFS({
            host: 'api.ipfs.temporal.cloud',
            port: '443',
            protocol: 'https',
            headers: {
                authorization: `Bearer ${res.data.token}`
            }
        });
        resolve({ ipfs, error: false });
    });
};
