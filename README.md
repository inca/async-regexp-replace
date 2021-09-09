# Async Regexp Replace

```ts
import { asyncRegexpReplace } from 'async-regexp-replace';

const source = 'The quick brown fox jumps over the lazy dog';
const result = await asyncRegexpReplace(source, /(brown|lazy)\s/g, async m => {
    // The replacer function can be asynchronous
    await new Promise(r => setTimeout(r, 0));
    return '';
});

// 'The quick fox jumps over the dog'
```
