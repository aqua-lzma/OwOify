window.addEventListener('load', async () => {
  let script = await fetch('owoify.js')
  let text = await script.text()
  let output = [
    '(function () {',
    ...text.split('\n').map(line => `  ${line}`),
    '  startOwoifier(document.body)',
    '})()'
  ].join('\n')
  let pre = document.createElement('pre')
  pre.textContent = output
  document.body.appendChild(pre)
})
