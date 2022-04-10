/**
 * Removes (comment) from string
 * @param email email adrees
 * @returns result
 */
 export const removeComment = (email) =>
 email.replace(/(^\([^)]*\))|(\([^)]*\))$/g, '');

/**
* Validates string as email
* @param email email
* @returns result
*/
export const validate = (email) => {
 if (!email) {
   return false;
 }

const tester = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
 if (email.match(/(«|»)/)) {
   return false;
 }

 const sanitizedEmail = email.replace(
   /@(?=[^"]*"[^"]*(?:"[^"]*"[^"]*)*$)/gm,
   '',
 );

 const emailPartsWithoutComments = sanitizedEmail
   .split('@')
   .map((el) => removeComment(el));

 if (emailPartsWithoutComments.length !== 2) {
   return false;
 }

 if (emailPartsWithoutComments[0].length > 64) {
   return false;
 }

 emailPartsWithoutComments[0] = emailPartsWithoutComments[0]?.replace(
   /\\"/g,
   '',
 );

 if (
   emailPartsWithoutComments[0].match(/"/g) &&
   emailPartsWithoutComments[0].match(/"/g).length > 0 &&
   emailPartsWithoutComments[0].match(/"/g).length % 2 !== 0
 ) {
   return false;
 }

 if (emailPartsWithoutComments[1].length > 255) {
   return false;
 }

 const domainParts = emailPartsWithoutComments[1].split('.');
 if (domainParts.some((part) => part.length > 63)) {
   return false;
 }

 if (!tester.test(emailPartsWithoutComments.join('@'))) {
   return false;
 }

 return true;
};
