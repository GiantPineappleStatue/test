import Router from 'next/router';

export const authInitialProps = (verify) => ({ req, res }) => {
    const auth = req ? getServerSideToken(req) : getClientSideToken();
    if (verify === 'protected') {
        if (!auth._id) return redirectUser(res, '/');
    } else {
        if (!auth.isAdmin) return redirectUser(res, '/');
    }
    return { auth };
};

const parseJwt = (token) => {
    let payload = Buffer.from(token.split('.')[1], 'base64');
    return {
        ...JSON.parse(payload.toString())
    };
};

export const redirectUser = (res, path) => {
    if (res) {
        res.writeHead(301, {
            Location: path
        });
        res.end();
        return {};
    }
    Router.replace(path);
    return {};
};

export const getClientSideToken = () => {
    if (process.browser) {
        const parsed = JSON.parse(localStorage.getItem('persist:root'));
        if (parsed) {
            const parsedUser = JSON.parse(parsed['auth']);
            if (parsedUser) return parseJwt(parsedUser.authToken);
            else return {};
        } else return {};
    }
    return {};
};

export const getServerSideToken = (req) => {
    const cookie = req.headers.cookie;
    if (!cookie) return false;
    const parsedCookie = parseCookie(cookie);

    if (parsedCookie['authToken']) {
        return parseJwt(parsedCookie.authToken);
    }
    return {};
};

const parseCookie = (cookieStr) => {
    var output = {};
    if (cookieStr) {
        cookieStr.split(/\s*;\s*/).forEach(function (pair) {
            pair = pair.split(/\s*=\s*/);
            output[pair[0]] = pair.splice(1).join('=');
        });
        var json = JSON.stringify(output, null, 4);
        return JSON.parse(json);
    } else return {};
};
