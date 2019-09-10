(function () {
  // OwO whats this replacement script version 3.2
  // Now with extra extra kawaiiness ~ hehe x
  // Non fricked
  let rules = [
    ['\\blove\\b', 'wuv'],
    ['\\bmr\\b', 'mister'],
    ['\\bbathroom\\b', 'potty'],
    ['\\bdog\\b', 'doggo'],
    ['\\bcat\\b', 'kitteh'],
    ['\\bhell\\b', 'heck'],
    ['\\bfuck|\\bfuk', 'frick'],
    ['\\bshit', 'shoot'],
    ['\\bfriend\\b', 'frend'],
    ['\\bstop\\b', 'stawp'],
    ['[rl]', 'w']
  ]
  let suffixes = [
    '(ﾉ´ з `)ノ',
    '( ´ ▽ ` ).｡ｏ♡',
    '(´,,•ω•,,)♡',
    ':3',
    '>:3',
    'OwO',
    'uwu',
    'hehe',
    'xox',
    '>3<',
    'murr~',
    'UwU',
    '-3-',
    'c:',
    '*nuzzles*',
    '*waises paw*',
    '*notices bulge*'
  ]
  function recurse (node) {
    if (node.nodeValue == null) {
      for (let child of node.childNodes) {
        recurse(child)
      }
    } else if (node.nodeType === 3) {
      let text = node.nodeValue
      for (let [find, replace] of rules) {
        text = text.replace(RegExp(find, 'g'), replace)
        text = text.replace(RegExp(find.toUpperCase().replace(/\\B/g, '\\b'), 'g'), replace.toUpperCase())
      }
      if (Math.random() < 0.2) {
        text += ` ${suffixes[Math.floor(Math.random() * suffixes.length)]}`
      }
      node.nodeValue = text
    }
  }
  document.body.addEventListener('DOMNodeInserted', event => {
    recurse(event.target)
  })
})()
