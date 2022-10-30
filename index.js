import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, get, child } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyCxNxc57M_MX7Eq6I0BdTpw6y2ao7sC9rc",
    authDomain: "dict-91af6.firebaseapp.com",
    projectId: "dict-91af6",
    storageBucket: "dict-91af6.appspot.com",
    messagingSenderId: "43053199779",
    appId: "1:43053199779:web:49d0a3fe6d50dde6b46a16",
    databaseURL: "https://dict-91af6-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = await initializeApp(firebaseConfig);
const db = await getDatabase(app);

async function readDb()
{
    return await get(child(ref(db), 'dict')).then((snapshot) => 
    {
        if (snapshot.exists()) 
        {
            return snapshot.val()
        }
        else
        {
            alert('no data')
        }
    }) 
    .catch((error) => 
    {
        console.error(error);
    });
}

const dictionary = await readDb()

let url = new URL(window.location.href).searchParams.get('subj')
if (url)
{
    Object.entries(dictionary).map((s) => {
        if (url === s[0]) {
            localStorage.setItem('page', `${s[0]}`); window.open('page.html', "_self")
        }
    })
}

document.getElementById('dictionary').innerHTML = ''.concat(...Object.entries(dictionary).map((s, index) => `<li class="cont" id="${index}""><div class="description">${s[0]} - ${s[1]["meaning"]}</div><i class="arrow fa-solid fa-arrow-right fa-lg"></i></li>`))

let conts = document.getElementsByClassName('cont')
var arr = Array.prototype.slice.call( conts )
arr.map(s => {
    s.onclick = function opend() {localStorage.setItem('page', `${this.getElementsByClassName('description')[0].innerText.split(' -')[0]}`); window.open('page.html', "_self")}
})