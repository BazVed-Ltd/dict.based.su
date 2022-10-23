const resp = await fetch('/dict.json')
const dictionary = await resp.json()

let url = new URL(window.location.href).searchParams.get('subj')
if (url)
{
    Object.entries(dictionary).map((s, index) => {
        if (url === s[0]) {
            localStorage.setItem('page', `${index}`); window.open('page.html', "_self")
        }
    })
}

document.getElementById('dictionary').innerHTML = ''.concat(...Object.entries(dictionary).map((s, index) => `<li class="cont" id="${index}""><div class="description">${s[0]} - ${s[1]["meaning"]}</div><i class="arrow fa-solid fa-arrow-right fa-lg"></i></li>`))

let conts = document.getElementsByClassName('cont')
var arr = Array.prototype.slice.call( conts )
arr.map(s => {
    s.onclick = function opend() {localStorage.setItem('page', `${this.id}`); window.open('page.html', "_self")}
})