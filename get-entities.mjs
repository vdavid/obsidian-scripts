import { URLSearchParams } from 'url';
import fetch from 'node-fetch';
import FileSystemHandler from './common/FileSystemHandler.mjs';

const apiUrl = 'https://api.dandelion.eu/datatxt/nex/v1'; /* API docs: https://dandelion.eu/docs/api/datatxt/nex/v1/ */
const token = '993f0081c04540cb9becd38c578443c8';

await run();

/* Functions follow */

async function run() {
    const fileSystemHandler = new FileSystemHandler('data/get-entities/');
    const text = await fileSystemHandler.readFile('input.txt');
    const result = await parseEntities(text);
    await fileSystemHandler.writeToFile('output.txt', result);
}

/**
 * @param {string} text
 * @returns {string}
 */
async function parseEntities(text) {
    const body = new URLSearchParams({
        text,
        lang: 'en',
        token,
        top_entities: 1000,
    });
    const response = await fetch(apiUrl, {method: 'POST', body});
    const responseJson = await response.json();
    const annotations = responseJson['annotations'];
    const topEntities = responseJson['topEntities'];
    return annotations.map(annotation => `${annotation['id']}\t${annotation['spot']}\t${annotation['confidence']}\t${annotation['title']}\t${annotation['uri']}\t${annotation['label']}`).join('\n')
        + '\n\n\n'
        + topEntities.map(topEntity => `${topEntity['id']}\t${topEntity['uri']}\t${topEntity['score']}`).join('\n');
}
