let owo

function rebuildWordMap () {
  let wordMap = document.querySelector('#wordMap')
  let remove = []
  let results = {}
  for (let row of wordMap.children) {
    let from = row.children[0].firstChild.value
    let to = row.children[1].firstChild.value
    if (from !== '' && to !== '') {
      results[from] = to
    } else if (from === '' && to === '') {
      remove.push(row)
    }
  }
  owo.wordMap = results
  reTranslate()
  for (let row of remove) {
    wordMap.removeChild(row)
  }
  let row = document.createElement('tr')
  let td1 = document.createElement('td')
  let td2 = document.createElement('td')
  let input1 = document.createElement('input')
  let input2 = document.createElement('input')
  input1.style.width = input2.style.width = '100%'
  input1.addEventListener('keyup', rebuildWordMap)
  input2.addEventListener('keyup', rebuildWordMap)
  td1.appendChild(input1)
  td2.appendChild(input2)
  row.appendChild(td1)
  row.appendChild(td2)
  wordMap.appendChild(row)
}

function rebuildPrefixesSuffixes () {
  let prefixesSuffixes = document.querySelector('#prefixesSuffixes')
  let remove = []
  let prefixes = []
  let suffixes = []
  for (let row of prefixesSuffixes.children) {
    let prefix = row.children[0].firstChild.value
    let suffix = row.children[1].firstChild.value
    if (prefix === '' && suffix === '') {
      remove.push(row)
    } else {
      if (prefix !== '') prefixes.push(prefix)
      if (suffix !== '') suffixes.push(prefix)
    }
  }
  owo.prefixes = prefixes
  owo.suffixes = suffixes
  reTranslate()
  for (let row of remove) {
    prefixesSuffixes.removeChild(row)
  }
  let row = document.createElement('tr')
  let td1 = document.createElement('td')
  let td2 = document.createElement('td')
  let input1 = document.createElement('input')
  let input2 = document.createElement('input')
  input1.style.width = input2.style.width = '100%'
  input1.addEventListener('keyup', rebuildPrefixesSuffixes)
  input2.addEventListener('keyup', rebuildPrefixesSuffixes)
  td1.appendChild(input1)
  td2.appendChild(input2)
  row.appendChild(td1)
  row.appendChild(td2)
  prefixesSuffixes.appendChild(row)
}

function reTranslate () {
  document.querySelector('#output').value = owo.owoify(document.querySelector('#input').value)
}

window.addEventListener('load', () => {
  owo = new OwO()
  document.querySelector('#input').addEventListener('keyup', () => reTranslate())
  // --- Build main options ---
  let options = [
    ['rltow', 'R and L to W'],
    ['yaftern', 'Y after N with vowel'],
    ['repeaty', 'Repeat words ending in Y'],
    ['doStutter', 'Stutter'],
    ['doPrefixes', 'Prefixes'],
    ['doSuffixes', 'Suffixes']
  ]
  let mainOptions = document.querySelector('#mainOptions')
  for (let [key, description] of options) {
    let row = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = true
    input.addEventListener('change', () => {
      owo[key] = input.value
      reTranslate()
    })
    td2.textContent = description
    td1.appendChild(input)
    row.appendChild(td1)
    row.appendChild(td2)
    mainOptions.appendChild(row)
  }
  let values = [
    ['stutterChance', owo.stutterChance, 'Stutter chance'],
    ['prefixChance', owo.prefixChance, 'Prefix chance'],
    ['suffixChance', owo.suffixChance, 'Suffix chance']
  ]
  for (let [key, defaultValue, description] of values) {
    let row = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let input = document.createElement('input')
    input.style.width = '2.5em'
    input.value = defaultValue
    input.addEventListener('keyup', () => {
      owo[key] = Number(input.value)
      reTranslate()
    })
    td2.textContent = description
    td1.appendChild(input)
    row.appendChild(td1)
    row.appendChild(td2)
    mainOptions.appendChild(row)
  }
  // --- Build word map ---
  let wordMap = document.querySelector('#wordMap')
  for (let [word, replace] of Object.entries(owo.wordMap)) {
    let row = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let input1 = document.createElement('input')
    let input2 = document.createElement('input')
    input1.style.width = input2.style.width = '100%'
    input1.value = word
    input2.value = replace
    input1.addEventListener('keyup', rebuildWordMap)
    input2.addEventListener('keyup', rebuildWordMap)
    td1.appendChild(input1)
    td2.appendChild(input2)
    row.appendChild(td1)
    row.appendChild(td2)
    wordMap.appendChild(row)
  }
  rebuildWordMap()
  // --- Build prefixes & suffixes ---
  let prefixesSuffixes = document.querySelector('#prefixesSuffixes')
  for (let i = 0; i < owo.prefixes.length || i < owo.suffixes.length; i++) {
    let row = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let input1 = document.createElement('input')
    let input2 = document.createElement('input')
    input1.style.width = input2.style.width = '100%'
    input1.value = owo.prefixes[i] != null ? owo.prefixes[i] : ''
    input2.value = owo.suffixes[i] != null ? owo.suffixes[i] : ''
    input1.addEventListener('keyup', rebuildPrefixesSuffixes)
    input2.addEventListener('keyup', rebuildPrefixesSuffixes)
    td1.appendChild(input1)
    td2.appendChild(input2)
    row.appendChild(td1)
    row.appendChild(td2)
    prefixesSuffixes.appendChild(row)
  }
  rebuildPrefixesSuffixes()
})
