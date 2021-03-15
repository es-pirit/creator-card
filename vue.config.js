/* prettier-ignore */
const globalSassFiles = [
    "./src/assets/styles/_themes.scss"
];

module.exports = {
    chainWebpack: config => {
        config.module.rule("scss").oneOfs.store.forEach(item => {
            item.use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    resources: globalSassFiles,
                })
                .end();
        });
    },
    publicPath: "./",
};
