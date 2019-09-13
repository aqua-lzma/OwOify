function rebuildWordMap () {
  
}

function rebuildPrefixesSuffixes () {
  
}

window.addEventListener('load', () => {
  let owo = new OwO()
  document.querySelector('#input').addEventListener('keyup', function () {
    document.querySelector('#output').value = owo.owoify(this.value)
  })
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
  // --- Build prefixes & suffixes ---
})
