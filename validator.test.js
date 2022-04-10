const {removeComment, emailValidator} = require('.');

describe('removeComment - Убрать комментарий в скобках', () => {
  test('Должен убрать тескт в круглых скобках из строки в начале или конце строки', () => {
    expect(removeComment('test string(comment)')).toEqual('test string');
    expect(removeComment('(comment)test string')).toEqual('test string');
    expect(removeComment('(comment any otherasd24562*)test string')).toEqual(
      'test string',
    );
    expect(removeComment('test (comment)string')).toEqual(
      'test (comment)string',
    );
  });
});

const validSupported = [
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org',
  '01234567890@numbers-in-local.net',
  "!#$%&'+-/=?^_`{|}~*@other-valid-characters-in-local.net",
  'mixed-1234-in-{+^}-local@sld.net',
  'a@single-character-in-local.org',
  'one-character-third-level@a.example.com',
  'single-character-in-sld@x.org',
  'local@dash-in-sld.com',
  'letters-in-sld@123.com',
  'one-letter-sld@x.org',
  'test@test--1.com',
  'uncommon-tld@sld.museum',
  'uncommon-tld@sld.travel',
  'uncommon-tld@sld.mobi',
  'country-code-tld@sld.uk',
  'country-code-tld@sld.rw',
  'local@sld.newTLD',
  'the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-lenght-blah-blah-blah-blah-bla.org',
  'the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-three-characters-so-it-is-valid-blah-blah.com',
  'local@sub.domains.com',
  'backticks`are`legit@test.com',
  'digit-only-domain@123.com',
  'digit-only-domain-with-subdomain@sub.123.com',
  '`a@a.fr',
  '`aa@fr.com',
  't119037jskc_ihndkdoz@aakctgajathzffcsuqyjhgjuxnuulgnhxtnbquwtgxljfayeestsjdbalthtddy.lgtmsdhywswlameglunsaplsblljavswxrltovagexhtttodqedmicsekvpmpuu.pgjvdmvzyltpixvalfbktnnpjyjqswbfvtpbfsngqtmhgamhrbqqvyvlhqigggv.nxqglspfbwdhtfpibcrccvctmoxuxwlunghhwacjtrclgirrgppvshxvrzkoifl',
  '(comment)myperfect@email.com',
  'myperfect(comment)@email.com',
  'myperfect@email.com(comment)',
  'myperfect@(comment)email.com',
  '(comment)myperfect(comment)@(comment)email.com(comment)',
  '"jhon..dowe"@email.com',
  '"john@smit"@example.com',
  '"john\\"smit"@example.com',
];

const invalidSupported = [
  undefined,
  null,
  '',
  '@missing-local.org',
  '! #$%`|@invalid-characters-in-local.org',
  '(),:;`|@more-invalid-characters-in-local.org',
  '<>@[]\\`|@even-more-invalid-characters-in-local.org',
  '.local-starts-with-dot@sld.com',
  'local-ends-with-dot.@sld.com',
  'two..consecutive-dots@sld.com',
  'partially."quoted"@sld.com',
  'the-local-part-is-invalid-if-it-is-longer-than-sixty-four-characters@sld.net',
  'missing-sld@.com',
  'invalid-characters-in-sld@! "#$%(),/;<>_[]`|.org',
  'missing-dot-before-tld@com',
  'missing-tld@sld.',
  'invalid',
  'the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-four-characters-so-it-is-invalid-blah-blah.com',
  'missing-at-sign.net',
  'unbracketed-IP@127.0.0.1',
  'invalid-ip@127.0.0.1.26',
  'another-invalid-ip@127.0.0.256',
  'IP-and-port@127.0.0.1:25',
  'trailing-dots@test.de.',
  'dot-on-dot-in-domainname@te..st.de',
  'dot-first-in-domain@.test.de',
  'mg@ns.i',
  '.dot-start-and-end.@sil.com',
  'double@a@com',
  '',
  '«johnsmith»@example.com',
  '"john"smit"@example.com',
  'tr119037jskc_ihndkdoz@d.aakctgajathzffcsuqyjhgjuxnuulgnhxtnbquwtgxljfayeestsjdbalthtddy.lgtmsdhywswlameglunsaplsblljavswxrltovagexhtttodqedmicsekvpmpuu.pgjvdmvzyltpixvalfbktnnpjyjqswbfvtpbfsngqtmhgamhrbqqvyvlhqigggv.nxqglspfbwdhtfpibcrccvctmoxuxwlunghhwacjtrclgirrgppvshxvrzkoifl',
];
describe('emailValidator - Валидация email адреса', () => {
  test('Адрес корректный', () => {
    validSupported.forEach((email) => {
      expect(emailValidator(email)).toEqual(true);
    });
  });

  test('Адрес не корректный', () => {
    invalidSupported.forEach((email) => {
      expect(emailValidator(email)).toEqual(false);
    });
  });
});
