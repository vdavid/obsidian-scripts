/**
 * @param {string} string
 * @returns {string}
 */
export function markKeywords(string) {
    const keywords = [
        {keyword: 'Google', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'CodeBerry', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Elon Musk', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'JavaScript', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'relationship', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'future', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'Facebook', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'framework', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'Hungarian', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'China', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'Hungary', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'Apple', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'Amazon', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'sex', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'Basecamp', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'agile', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'CEO', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'CSS', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'empathy', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'social media', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'creativity', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'polyamory', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'coronavirus', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'covid', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'Microsoft', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'VC', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'competitor', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'self-image', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'Chinese', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'eyes', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'parent', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'iPhone', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'npm', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'depression', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'Uber', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'GraphQL', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'freemium', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'SaaS', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'Lightroom', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'AWS', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'UK', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'async/await', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'Coursera', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Reddit', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Mark Manson', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Spotify', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'algorithm', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'laptop', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'Slack', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'porn', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'PayPal', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'github', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'MIT', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'Photoshop', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'B2C', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'LinkedIn', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'procrastination', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'serverless', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'AirBNB', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'Y Combinator', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Finland', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'DynamoDB', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'UX design', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'DDoS', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'MySQL', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'jQuery', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Tim Ferriss', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Denmark', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'webcam', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'Muslim', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'HIIT', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'Orbán', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'FreeCodeCamp', isCaseSensitive: true, mustBeWholeWord: false},
        {keyword: 'universal basic income', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'UBI', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'HTML', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'democracy', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'millennial', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'meditation', isCaseSensitive: false, mustBeWholeWord: true},
        {keyword: 'meditate', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'health', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'productivity', isCaseSensitive: false, mustBeWholeWord: false},
        {keyword: 'McDonald’s', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'Starlink', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'Jenkins', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'AI', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'pricing', isCaseSensitive: true, mustBeWholeWord: true},
        {keyword: 'health', isCaseSensitive: true, mustBeWholeWord: true},
    ];
    return keywords.reduce((result, keyword) => {
        const regExp = new RegExp(keyword.mustBeWholeWord ? '(?<=[^\\w]|^)(' + keyword.keyword + ')(?=[^\\w]|$)' : '(' + keyword.keyword + ')', keyword.isCaseSensitive ? 'g' : 'ig');
        return result.replace(regExp, '[[$1]]');
    }, string);
}

/**
 * @param {string} string
 * @returns {string}
 */
export function replaceNiceQuotes(string) {
    return string.replace(/"(?! )/g, '“')
        .replace(/"(?= )/g, '”')
        .replace(/'/g, '’');
}