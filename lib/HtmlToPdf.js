const { create } = require('html-pdf');
const path = require('path');

const createPDF = async (htmlArray, fileName) => {
    const options = {
        format: 'A4', // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        orientation: 'portrait',
        zoomFactor: 0.2,
        timeout: 300000
    };
    const filePath = path.normalize(path.join(__dirname, `../pdf/${fileName}`));
    return new Promise((resolve) => {
        create(htmlArray, options).toFile(filePath, (err, stream) => {
            if (err || !stream) {
                throw new Error(`Error creating PDF file: ${err}`);
            }
            if (stream) {
                resolve(true);
            }
        });
    });
};

module.exports = {
    createPDF
};
