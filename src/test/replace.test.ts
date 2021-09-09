import assert from 'assert';

import { asyncRegexpReplace } from '../main';

describe('asyncRegexpReplace', () => {

    it('replaces found occurrences asynchronously', async () => {
        const source = 'The quick brown fox jumps over the lazy dog';
        const result = await asyncRegexpReplace(source, /(brown) (fox)/g, async m => {
            await new Promise(r => setTimeout(r, 0));
            return `${m[2]} ${m[1].toUpperCase()}`;
        });
        assert.strictEqual(result, 'The quick fox BROWN jumps over the lazy dog');
    });

    it('can produce different length string', async () => {
        const source = 'The quick brown fox jumps over the lazy dog';
        const result = await asyncRegexpReplace(source, /(brown|lazy)\s/g, async m => {
            await new Promise(r => setTimeout(r, 0));
            return '';
        });
        assert.strictEqual(result, 'The quick fox jumps over the dog');
    });

});
