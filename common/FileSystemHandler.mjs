import fs from 'fs';

export default class FileSystemHandler {
    /**
     * @param {string} rootPath With a slash at the end
     */
    constructor(rootPath) {
        this._rootDirectory = rootPath;
    }


    /**
     * @param {string} fileName
     * @returns {Promise<string>} The content of the file as a string
     */
    async readFile(fileName) {
        return (await fs.promises.readFile(`${this._rootDirectory}input/${fileName}`)).toString();
    }

    /**
     * @param {string} fileName
     * @param {string} content
     */
    async writeToFile(fileName, content) {
        return fs.promises.writeFile(`${this._rootDirectory}output/${this._replaceIllegalCharactersInFileName(fileName)}`, content);
    }


    /**
     * @param {string} fileName
     * @returns {string}
     * @private
     */
    _replaceIllegalCharactersInFileName(fileName) {
        return fileName.replace(/[/\\?%*:|"<>✅🐕😢]/g, '_');
    }
}