# is-it-email
Strict RFC 5322 Email validator 

Install:

```
npm i is-it-email
```

Usage example:

```javascript
import { validate } from 'is-it-email';

const isEmail = validate('anyRFC_5322@valid.email.com'); //true

//in case you need remove comment from string you can use
import { removeComment } from 'is-it-email';

const emailWithComment='(comment)myperfect(comment)@(comment)email.com(comment)';

const isEmail = validate(emailWithComment); // true, according to RFC-5322

const email = removeComment(emailWithComment) // myperfect@email.com
