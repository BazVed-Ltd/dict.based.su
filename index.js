const resp = await fetch('/dict.json')
const dictionary = await resp.json()

document.getElementById('dictionary').innerHTML = ''.concat(...Object.entries(dictionary).map(s => `<li><b>${s[0]}</b> - ${s[1]}</li>`))