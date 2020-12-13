import {markKeywords} from './markdownHelper.mjs';

await testIfMarkdownHelperWorks();
await testIfMarkdownHelperWorksForCaseSensitiveText();
await testIfMarkdownHelperWorksForWholeWords();

async function testIfMarkdownHelperWorks() {
    /* Arrange */
    const testText = 'Google eats Google and Facebook google.';
    const expectedResult = '[[Google]] eats [[Google]] and [[Facebook]] google.';

    /* Act */
    const result = markKeywords(testText);

    /* Assert */
    if (result !== expectedResult) {
        console.error('Wrong result: ' + result);
    }
}

async function testIfMarkdownHelperWorksForCaseSensitiveText() {
    /* Arrange */
    const testText = 'Algorithm and algorithm';
    const expectedResult = '[[Algorithm]] and [[algorithm]]';

    /* Act */
    const result = markKeywords(testText);

    /* Assert */
    if (result !== expectedResult) {
        console.error('Wrong result: ' + result);
    }
}

async function testIfMarkdownHelperWorksForWholeWords() {
    /* Arrange */
    const testText = 'Google’s CEO is Elon Musk but not viceCEO.';
    const expectedResult = '[[Google]]’s [[CEO]] is [[Elon Musk]] but not viceCEO.';

    /* Act */
    const result = markKeywords(testText);

    /* Assert */
    if (result !== expectedResult) {
        console.error('Wrong result: ' + result);
    }
}