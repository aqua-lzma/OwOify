(function () {
  // OwO whats this vewsion 6.9.?c ~ :3
  // I h-hope you l-like it...

  let stutterChance = 0.1
  let prefixChance = 0.05
  let suffixChance = 0.15
  let words = {
    love: 'wuv',
    mr: 'mistuh',
    dog: 'doggo',
    cat: 'kitteh',
    hello: 'henwo',
    hell: 'heck',
    fuck: 'fwick',
    fuk: 'fwick',
    shit: 'shoot',
    friend: 'fwend',
    stop: 'stawp',
    god: 'gosh',
    dick: 'peepee',
    penis: 'peepee'
  }
  let suffixes = [
    '(ﾉ´ з `)ノ',
    '( ´ ▽ ` ).｡ｏ♡',
    '(´,,•ω•,,)♡',
    '(*≧▽≦)',
    'ɾ⚈▿⚈ɹ',
    '( ﾟ∀ ﾟ)',
    '( ・ ̫・)',
    '( •́ .̫ •̀ )',
    '(▰˘v˘▰)',
    '(・ω・)',
    '✾(〜 ☌ω☌)〜✾',
    '(ᗒᗨᗕ)',
    '(・`ω´・)',
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
    'OwO whats this?',
    '*unbuttons shirt*',
    '*nuzzles*',
    '*waises paw*',
    '*notices bulge*',
    '*blushes*',
    '*giggles*',
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
    // OwO
    text = text.replace(/[rl]/gi, match => match.charCodeAt(0) < 97 ? 'W' : 'w')
    // Nya >;3
    text = text.replace(/n[aeiou]/gi, match => `${match[0]}y${match[1]}`)
    // Words that end in y like cummy wummy
    text = text.replace(/\b[A-V,X-Z,a-v,x-z]\w{3,}y\b/gi, match =>
      `${match} ${match.charCodeAt(0) < 97 ? 'W' : 'w'}${match.slice(1)}`
    )
    // S-stutter
    text = text.split(' ').map(word => {
      if (word.length === 0 || word[0].match(/[a-zA-Z]/) == null) return word
      while (Math.random() < stutterChance) {
        word = `${word[0]}-${word}`
      }
      return word
    }).join(' ')
    // Prefixes
    if (Math.random() < prefixChance) {
      text = `${text} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`
    }
    // Suffixes
    if (Math.random() < suffixChance) {
      text = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${text}`
    }
    return text
  }

  function recurse (node) {
    for (let child of node.childNodes) {
      recurse(child)
    }
    if (node.nodeType === 3 && node.nodeValue != null) {
      node.nodeValue = owoify(node.nodeValue)
    }
  }
  document.body.addEventListener('DOMNodeInserted', event => {
    recurse(event.target)
  })
  recurse(document.body)
})()
