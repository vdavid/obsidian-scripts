import FileSystemHandler from './common/FileSystemHandler.mjs';

const inputFileName = 'Research.md';

await run();

/* Functions follow */

async function run() {
    const fileSystemHandler = new FileSystemHandler('data/split-to-headers/');
    const markdown = await fileSystemHandler.readFile(inputFileName);
    const tags = ['research'];
    const sections = convertMarkdownToSections(markdown, tags);
    for (const section of sections) {
        await fileSystemHandler.writeToFile(section.title + '.md', section.content);
    }
}

/**
 * @param {string} markdown
 * @param {string[]} [tags]
 * @returns {{title: string, content: string}[]} The sections
 */
function convertMarkdownToSections(markdown, tags = []) {
    const tagsString = tags.map(tag => `#${tag}`).join(' ');
    const sectionsRaw = markdown.split('###');
    return sectionsRaw.map(section => {
        const firstLineBreakPosition = section.search('\n');
        const content = section.substring(firstLineBreakPosition + 1).trim();
        const contentWithReformattedBullets = content.replace(/^( *)\* {3}/mg, '$1- ');
        const title = section.substring(0, firstLineBreakPosition).trim();
        return {
            title: title + ' research',
            content: '# ' + title.replace(/(\d{4}-\d{2}-\d{2})/, '[[$1]]') + ' ' + tagsString + '\n'
                + contentWithReformattedBullets,
        };
    });
}
