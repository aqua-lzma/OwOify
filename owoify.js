(function () {
  // OwO whats this weplacement scwipt vewsion 4.0
  // Now with extwa extwa kawaiiness ~ hehe x
  // Non fwicked
  // Wowds ending with y awe even mowe funny wunny now
  let words = {
    love: 'wuv',
    mr: 'mistuh',
    dog: 'doggo',
    cat: 'kitteh',
    hell: 'heck',
    fuck: 'fwick',
    fuk: 'fwick',
    shit: 'shoot',
    friend: 'fwend',
    stop: 'stawp',
    god: 'gosh'
  }
  let suffixes = [
    '(ﾉ´ з `)ノ',
    '( ´ ▽ ` ).｡ｏ♡',
    '(´,,•ω•,,)♡',
    ':3',
    '>:3',
    'hehe',
    'xox',
    '>3<',
    'murr~',
    'UwU',
    '*gwomps*'
  ]
  let prefixes = [
    'OwO',
    '*nuzzles*',
    '*waises paw*',
    '*notices bulge*',
    'hehe'
  ]

  function replaceAll (text, map) {
    let source = Object.keys(map).map(i => `\\b${i}`)
    let re = new RegExp(`(?:${source.join(')|(?:')})`, 'gi')
    return text.replace(re, match => {
      let out = map[match.toLowerCase()]
      // Not very tidy way to work out if the word is capitalised
      if ((match.match(/[A-Z]/g) || []).length > match.length / 2) out = out.toUpperCase()
      return out
    })
  }

  function owoify (text) {
    text = replaceAll(text, words)
    text = text.replace(/[rl]/gi, match => match.charCodeAt(0) < 97 ? 'W' : 'w')
    text = text.replace(/\b\w+y\b/gi, match => {
      if (match[0] === 'W' || match[0] === 'w') return match
      return `${match} ${match.charCodeAt(0) < 97 ? 'W' : 'w'}${match.slice(1)}`
    })
    if (Math.random() < 0.1) {
      text = `${text} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`
    }
    if (Math.random() < 0.05) {
      text = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${text}`
    }
    return text
  }

  function recurse (node) {
    for (let child of node.childNodes) {
      recurse(child)
    }
    if (node.nodeType === 3) {
      node.nodeValue = owoify(node.nodeValue)
    }
  }
  document.body.addEventListener('DOMNodeInserted', event => {
    recurse(event.target)
  })
})()
