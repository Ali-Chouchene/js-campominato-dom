/*
#Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: :avviso:non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
#BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
#SUPER BONUS
Se avete finito tutti i bonus potete scrivere all'insegnante o ai tutor per ricevere delle sfide extra!

*/
//! ARRAY




// ! FUNCTIONS
const createCell = (number) => {
    const cell = document.createElement("div");
    if (number === 100) {
        cell.classList.add("celleasy")
    } else if (number === 81) {
        cell.classList.add("cellmedium")
    } else if (number === 49) {
        cell.classList.add("cellhard")
    }
    return cell;
}
const randomUniqueNumber = (min = 1, max = 16, blackList) => {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
    } while (blackList.includes(randomNumber));
    return randomNumber;
}





// ! PRENDO ELEMENTI DAL DOM
const grid = document.getElementById("grid");
const btn = document.getElementById("button");
const h1 = document.getElementById("h1");
// !  AVVIO
btn.addEventListener("click", function () {
    const bombList = [];
    const clickedByUser = [];
    grid.innerHTML = "";  //refresh grid

    let counter = 0; //variabile d'appoggio per contatore

    const userChoice = parseInt(document.getElementById("select").value);


    for (j = 1; j <= 16; j++) {
        const random = randomUniqueNumber(j, userChoice, bombList);
        bombList.push(random);

    }

    console.table(bombList)
    for (let i = 1; i <= userChoice; i++) {
        const cell = createCell(userChoice);
        grid.appendChild(cell);
        cell.innerText = (i);

        cell.addEventListener("click", () => {
            if (!clickedByUser.includes(cell.innerText)) {
                clickedByUser.push(cell.innerText);
                counter += 1;

            } else if (clickedByUser.includes(cell.innerText)) {
                counter += 0;
            }

            // console.log(counter);

            if (bombList.includes(i)) {
                cell.classList.add("bomb");
                cell.innerText = "";
                setTimeout(function () {
                    alert(`OPS: SEI PASSATO SU UNA BOMBA!
                il tuo punteggio è: ${counter - 1}`);
                }, 200);
                setTimeout(function () {
                    h1.classList.remove("d-none");
                    grid.classList.add("d-none");
                }, 500);
                return
            } else {
                cell.classList.add("clicked");
                cell.innerText = "";
            }
            if (counter === (userChoice - 16)) {
                alert(`VINTO CON UN PUNTEGGIO DI: ${counter}`)
                setTimeout(function () {
                    h1.classList.remove("d-none");
                    grid.classList.add("d-none");
                }, 300);
            }
        })
    }

    h1.classList.add("d-none");
    grid.classList.remove("d-none");


})

