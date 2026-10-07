/* eslint-disable no-unused-vars */
const path = require("path");

module.exports = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "./src/assets/scss")],
    },
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //     // eslint-disable-next-line no-param-reassign
    //     config.ignoreWarnings = [
    //         {
    //             message:
    //                 /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
    //         },
    //     ];
    //     return config;
    // },
    async redirects() {
        return [
            // {
            //     source: '/about',
            //     destination: '/blog/about-us',
            //     permanent: true,
            // },
            // {
            //     source: '/collection/sample',
            //     destination: '/collection/634e0507c9ed0745d271c8a1',
            //     permanent: true,
            // }
        ];
    },
};
