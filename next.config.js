const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');
const pwaConfig = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        scope: '/',
        disable: false,
        sw: '/sw.js'
    }
});

module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/letsmakeamovie',
                permanent: true
            }
        ];
    },
    pwaConfig,
    productionBrowserSourceMaps: true
};
