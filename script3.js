let warunki_wygranej = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
];
let warunki_wygranej_dlugosc = warunki_wygranej.length;
let komorki = document.getElementsByClassName("komorka");
let dlugosc_komorki = komorki.length;
let gracz = "x";
let koniec_gry = false;

for (let i = 0; i < dlugosc_komorki; i++) {
    let j = komorki[i];
    j.innerHTML = "";
    j.addEventListener("click", () => {
        if (!koniec_gry && j.innerHTML === "") {
            j.innerHTML = gracz;
            wygrana();
            remis();
            if (!koniec_gry && gracz === "x") {
                zmiana_znaku();
                wykonajRuchKomputera();
            }
        }
    });
}

function zmiana_znaku(){
    if(gracz === "x"){
        gracz = "o";
        document.getElementById('tura').innerHTML = `ruch &nbsp; ${gracz} `;
    }
    else{
        gracz = "x";
        document.getElementById('tura').innerHTML = `ruch &nbsp; ${gracz} `;
    }
}

function wygrana(){
    for(let i = 0; i < warunki_wygranej_dlugosc; i++){
        let x = komorki[warunki_wygranej[i][0]].innerHTML;
        let y = komorki[warunki_wygranej[i][1]].innerHTML;
        let z = komorki[warunki_wygranej[i][2]].innerHTML;

        if(x != "" && x === y && x === z){
            koniec_gry = true;
            document.getElementById('tura').innerHTML = `Gracz ${gracz} wygrywa`;
            komorki[warunki_wygranej[i][0]].style.backgroundColor = 'green';
            komorki[warunki_wygranej[i][1]].style.backgroundColor = 'green';
            komorki[warunki_wygranej[i][2]].style.backgroundColor = 'green';
        }
    }
}

function remis(){
    if(!koniec_gry){
        let remis = true;
        for (let i = 0; i < dlugosc_komorki; i++) {
            let j = komorki[i];
            if (j.innerHTML === "") {
                remis = false;
            }
        }
        if(remis){
            koniec_gry = true;
            document.getElementById('tura').innerHTML = `Remis`;
            for (let i = 0; i < dlugosc_komorki; i++) {
                let komorka = komorki[i];
                komorka.style.backgroundColor = "#d8cbbb";
            }   
        }
    }
}
//Przepisałem sobie funkcje wygrana i uprościłem ,żeby nie kończył gry tylko zwracał wartość ture false;;
function sprawdzCzyWygrana(znak) {
    for (let i = 0; i < warunki_wygranej_dlugosc; i++) {
        let x = komorki[warunki_wygranej[i][0]].innerHTML;
        let y = komorki[warunki_wygranej[i][1]].innerHTML;
        let z = komorki[warunki_wygranej[i][2]].innerHTML;

        if (x === znak && y === znak && z === znak) {
            return true;
        }
    }
    return false;
}

function wykonajRuchKomputera() {
    if (gracz === "o") {
        let dostepneKomorki = [];
        for (let i = 0; i < dlugosc_komorki; i++) {
            if (komorki[i].innerHTML === "") {
                dostepneKomorki.push(i);
            }
        }
        for (let i = 0; i < dostepneKomorki.length; i++) {
            let indeks = dostepneKomorki[i]; 
            komorki[indeks].innerHTML = "x"; 
            if (sprawdzCzyWygrana("x")) {
               
                komorki[indeks].innerHTML = gracz;
                wygrana();
                remis();
                zmiana_znaku();
                return;
            }
            komorki[indeks].innerHTML = "";
        }

     
        
        let losowyIndeks = Math.floor(Math.random() * dostepneKomorki.length);
        let wybranyIndeks = dostepneKomorki[losowyIndeks];
        komorki[wybranyIndeks].innerHTML = gracz;
        wygrana();
        remis();
        zmiana_znaku();
    }
}

reset = document.getElementById("restart");
reset.addEventListener("click", () => {
    for (let i = 0; i < dlugosc_komorki; i++) {
        komorki[i].innerHTML = "";
        komorki[i].style.backgroundColor = ""; 
    }
    koniec_gry = false;
    gracz = "x"; 
    document.getElementById('tura').innerHTML = `ruch &nbsp; x`;   
});