(function () {
  // OwO whats this vewsion 6.9.?c ~ :3c
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
  suffixes.sort((a, b) => a.length - b.length)
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
  prefixes.sort((a, b) => a.length - b.length)

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

  function weightedRandom (list) {
    // Returns a random choice from the list based on the length of string in the list
    // Shorter strings are proportionally more likely to be picked
    // ** List should already be sorted shortest to longest **
    let max = list[list.length - 1].length + 1
    let acc = 0
    let weights = list.map(i => acc += max - i.length)
    let random = Math.floor(Math.random() * acc)
    for (var [index, weight] of weights.entries()) {
      if (random < weight) break
    }
    return list[index]
  }

  function owoify (text) {
    text = replaceAll(text, words)
    // OwO
    text = text.replace(/[rl]/gi, match =>
      match.charCodeAt(0) < 97 ? 'W' : 'w'
    )
    // Nya >;3
    text = text.replace(/n[aeiou]/gi, match =>
      `${match[0]}${match.charCodeAt(1) < 97 ? 'Y' : 'y'}${match[1]}`
    )
    // Words that end in y like cummy wummy
    text = text.replace(/\b(?=.*[aeiou])(?=[a-vx-z])\w{4,}y\b/gi, match =>
      `${match} ${match.charCodeAt(0) < 97 ? 'W' : 'w'}${match.match(/.[aeiouy].*/i)[0].slice(1)}`
    )
    // S-stutter
    text = text.split(' ').map(word => {
      if (word.length === 0 || word[0].match(/[a-z]/i) == null) return word
      while (Math.random() < stutterChance) {
        word = `${word[0]}-${word}`
      }
      return word
    }).join(' ')
    // Prefixes
    if (Math.random() < prefixChance) {
      text = `${weightedRandom(prefixes)} ${text}`
    }
    // Suffixes
    if (Math.random() < suffixChance) {
      text = `${text} ${weightedRandom(suffixes)}`
    }
    return text
  }

  function getTextNodes (node, set) {
    if (!['STYLE', 'SCRIPT', 'NOSCRIPT', 'IFRAME', 'OBJECT'].includes(node.tagName)) {
      for (let child of node.childNodes) {
        set = getTextNodes(child, set)
      }
      if (node.nodeType === 3 && (node.nodeValue != null || node.nodeValue !== '')) {
        set.add(node)
      }
    }
    return set
  }

  observer = new MutationObserver(mutations => {
    let targets = new Set()
    for (mutation of mutations) {
      for (node of mutation.addedNodes) {
        targets = getTextNodes(node, targets)
      }
    }
    for (let target of targets) {
      target.nodeValue = owoify(target.nodeValue)
    }
  })

  for (let node of getTextNodes(document.body, new Set())) {
    node.nodeValue = owoify(node.nodeValue)
  }
  observer.observe(document.body, { childList: true, subtree: true })
})()
