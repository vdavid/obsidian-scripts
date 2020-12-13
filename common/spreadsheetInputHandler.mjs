import fetch from 'node-fetch';
import {convertCsvToArray} from './csvParser.mjs';

/**
 * @param {string} spreadsheetUrl
 * @returns {[[string]]} The CSV content as a 2D array of strings
 */
export async function fetchData(spreadsheetUrl) {
    const response = await fetch(spreadsheetUrl, {method: 'GET'});
    const csvString = await response.text();
    return convertCsvToArray(csvString);
}
