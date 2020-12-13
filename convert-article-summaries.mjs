import {convertToObjects} from './common/csvParser.mjs';
import {fetchData} from './common/spreadsheetInputHandler.mjs';
import {markKeywords, replaceNiceQuotes} from './common/markdownHelper.mjs';
import FileSystemHandler from './common/FileSystemHandler.mjs';

const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBU3UKtWG-5HGkWKOiImAVQkm0mLUEinaMd1cQpLxCNIu_Ljo-Jk5ZP_Rx4UQLalMSU7PP6aloQ1i8/pub?gid=1748933024&single=true&output=csv';
const skipCount = 0; /* Can skip some items that are already processed. */

await run();

/* Functions follow */

async function run() {
    const fileSystemHandler = new FileSystemHandler('data/article-summaries/');

    const csvAs2dArray = await fetchData(spreadsheetUrl);
    const csvAs2dArrayWithoutGarbageTopRows = csvAs2dArray.slice(5);
    const allArticleReviewItems = convertToObjects(csvAs2dArrayWithoutGarbageTopRows);
    const articleReviewItems = allArticleReviewItems.slice(skipCount);

    const nameAndContentArray = convertToContent(articleReviewItems);

    for(const nameAndContent of nameAndContentArray) {
        await fileSystemHandler.writeToFile(nameAndContent.name + '.md', nameAndContent.content);
    }
}

/**
 * @param {Object<string, string>[]} articleReviewItems
 * @returns {{name: string, content: string}[]}
 */
function convertToContent(articleReviewItems) {
    return articleReviewItems.map(articleReviewItem => {
        const title = articleReviewItem['Title'];
        const url = articleReviewItem['URL'];
        const author = articleReviewItem['Author(s)'];
        const publicationDateAsString = articleReviewItem['Pub. date'];
        const language = articleReviewItem['Language'] === 'EN' ? 'English' : (articleReviewItem['Language'] === 'HU' ? 'Hungarian' : undefined);
        const minutes = Math.round(parseFloat(articleReviewItem['Min']));
        const tags = [_convertCategoryToTag(articleReviewItem['Category']), ...articleReviewItem['Tags'].split(', ')]
            .map(tag => '#' + tag.trim().toLowerCase().replace(/ /g, '-')) /* Clean each */
            .filter(x => x) /* Remove empty tags */
            .filter((item, index, array) => array.indexOf(item) === index); /* Unique */
        const rating = articleReviewItem['Rating'];
        const readDateAsString = articleReviewItem['Date'];
        const summary = _formatSummary(articleReviewItem['30 second review']);

        return {
            name: `Article - ${title}`,
            content: `# [${title}](${url})
${author ? `by [[${author}]] — ` : ''}${publicationDateAsString ? publicationDateAsString + ', ' : ''}${language}${minutes ? `, ${minutes} minutes` : ''}
${tags.join(', ')}
Rating: **${rating}**/10, on [[${readDateAsString}]]

${summary}`
        };
    });
}

/**
 * @param {string} categoryName
 * @returns {string}
 * @private
 */
function _convertCategoryToTag(categoryName) {
    return categoryName === 'education, learning'
        ? 'education and learning'
        : (categoryName === 'finances, charity' ? 'finances and charity'
            : (categoryName === 'design, ux, art' ? 'design-ux-art' : (categoryName || '')));
}

/**
 * @param {string} rawSummary
 * @returns {string}
 * @private
 */
function _formatSummary(rawSummary) {
    return markKeywords(replaceNiceQuotes(rawSummary.replace(/(?:^| )(\d+\. )/g, '\n$1')
        .replace(/(?<!(?:^|\n| )(\d+))\. /g, '. \n')));
}

