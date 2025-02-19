import mjml2html from 'mjml';

// Retrieve options from the command-line argument (Base64 encoded JSON)
// For example, if the argument decodes to: [ignored, options]
const args = JSON.parse(atob(process.argv[2]));
const options = args[1];

let mjml = '';

// Collect all data from stdin
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  mjml += chunk;
});

process.stdin.on('end', async () => {
  let result = '';

  try {
    result = await mjml2html(mjml, options);
  } catch (exception) {
    const errorString = JSON.stringify({ mjmlError: exception.toString() });
    process.stdout.write(utoa(errorString));
    process.exit(0);
  }

  process.stdout.write(utoa(JSON.stringify(result)));
});

/**
 * Unicode to ASCII (encode data to Base64)
 * @param {string} data
 * @return {string}
 */
function utoa(data) {
    return btoa(unescape(encodeURIComponent(data)));
}
