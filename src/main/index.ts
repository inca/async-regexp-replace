export async function asyncRegexpReplace(
    str: string,
    regexp: RegExp,
    replacer: (m: RegExpExecArray) => string | Promise<string>,
): Promise<string> {
    const matches: RegExpExecArray[] = [];
    regexp.lastIndex = 0;
    let m = regexp.exec(str);
    while (m) {
        matches.push(m);
        if (!regexp.flags.includes('g')) {
            break;
        }
        m = regexp.exec(str);
    }
    const replacements = await Promise.all(matches.map(m => replacer(m)));
    let result = str;
    let offset = 0;
    for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const r = replacements[i];
        const index = m.index + offset;
        const length = m[0].length;
        result = result.substring(0, index) + r + result.substring(index + length);
        offset = offset + r.length - length;
    }
    return result;
}
