(async function () {
  let script = await fetch('owoify.js')
  let text = await script.text()
  let output = [
    '(function () {',
    ...text.split('\n').map(line => `  ${line}`),
    '})()'
  ].join('\n')
  let pre = document.createElement('pre')
  pre.textContent = output
  document.body.appendChild(pre)
})()
