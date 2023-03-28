let array_cards = [
    {
        id: 1,
        src: "pics/card1.png",
        boolean: false,
    },
    {
        id: 2,
        src: "pics/card2.png",
        boolean: false,
    },
    {
        id: 3,
        src: "pics/card3.png",
        boolean: false,
    },
    {
        id: 4,
        src: "pics/card4.png",
        boolean: false,
    },
    {
        id: 5,
        src: "pics/card5.png",
        boolean: false,
    },
    {
        id: 6,
        src: "pics/card6.png",
        boolean: false,
    },
    {
        id: 7,
        src: "pics/card7.png",
        boolean: false,
    },
    {
        id: 8,
        src: "pics/card8.png",
        boolean: false,
    },
    {
        id: 9,
        src: "pics/card9.png",
        boolean: false,
    },
    {
        id: 10,
        src: "pics/card10.png",
        boolean: false,
    },
    {
        id: 11,
        src: "pics/card11.png",
        boolean: false,
    },
    {
        id: 12,
        src: "pics/card12.png",
        boolean: false,
    },
    {
        id: 13,
        src: "pics/card13.png",
        boolean: false,
    },
    {
        id: 14,
        src: "pics/card14.png",
        boolean: false,
    },
    {
        id: 15,
        src: "pics/card15.png",
        boolean: false,
    },
    {
        id: 16,
        src: "pics/card16.png",
        boolean: false,
    },
    {
        id: 17,
        src: "pics/memoryBg.png",
    },
    {
        id: 18,
        src: "pics/memoryBgI.png",
    }
]
let seconds = 0;
let sequenz_ID = 0;
let versuche = 0;
let summe = 0;
let number_of_cards = 0;
let card1 = 0;
let card2 = 0;
let cards_showed = 0;

function name() { //we get the name from the player and start the time
    document.getElementById("name").innerHTML = "Spieler: " + prompt("Enter your name");
    start_time();
}
function start_time() {
    sequenz_ID = setInterval(timer, 1000);
}
function stop_time() {
    clearInterval(sequenz_ID); //for when all cards are ready.
    message = "Congrats! You made it! You needed " + versuche + " tries and " + seconds + " seconds";
    alert(message);
}
function timer() { //starts timer
    seconds++;
    document.getElementById("time").innerHTML = "Zeit: " + seconds;
}
function start_show(myId) { //i need to add some delay to show, so it is not triggered before show_forever
    setTimeout(function () {
        show(myId)
    }, 250);
}
function show(clickedId) {
    var myId = clickedId;
    var img = document.getElementById(myId);
    if (img.boolean == true) return; //if boolean is true, we return without doing anything
    //used -1 because array starts with 0 and the IDs numbers starts with 1.
    img.src = array_cards[myId - 1].src;
    //we add the number to the sume
    summe += Number(myId);
    number_of_cards++; //increment number of cards
    if (number_of_cards == 1) card1 = myId; //and save me the ids of both cards
    if (number_of_cards == 2) card2 = myId;
    is_right(summe, number_of_cards); // in this function we check if they match, if not summe and number_of_cards return to 0
}
function show_forever(clickedId) { //if the matched we set the img to the 17 position of the array and boolean to true
    var myId = clickedId;
    var img = document.getElementById(myId);
    //used -1 because array starts with 0 and the IDs numbers starts with 1.
    img.src = array_cards[17].src;
    img.boolean = true; //if this is true we can't show the card again
}
function is_right() { //we check if that was the first card, if not we check the sume of the id to check if they match
    console.log(summe);
    if (summe < 17 && number_of_cards < 2) { //we check summe and if it is already the second card!
        console.log("That was the first card");
    } else if (summe == 17 && number_of_cards == 2) { 
        setTimeout(function () {
            show_forever(card1);
            show_forever(card2);
            summe = 0;
            card1 = 0;
            card2 = 0;
            cards_showed++;
            versuche++;
            document.getElementById("versuche").innerHTML = "Versuche: " + versuche;
            if (cards_showed == 8) stop_time();
        }, 200);
    } else {
        setTimeout(function () {
            hide(card1);
            hide(card2);
            summe = 0;
            card1 = 0;
            card2 = 0;
            versuche++;
            document.getElementById("versuche").innerHTML = "Versuche: " + versuche;
        }, 200);
    }
    if (number_of_cards == 2) number_of_cards = 0;
}
function hide(ID) { //we hide the cards again setting the src to the 16 position in array
    var myId = ID;
    var img = document.getElementById(myId);
    //used -1 because array starts with 0 and the IDs numbers starts with 1.
    img.src = array_cards[16].src;
}


function cards() {
    //we create a new array and we fill it with number between 1 and 16, making sure it they don't repeat themselves
    var arr = [];
    var boolean = 0;
    for (var i = 0; i < 16; i++) {
        boolean = 0;
        var number = Math.floor(Math.random() * 16); // random number between 0 and 15
        for (var j = 0; j < 16; j++) {
            if (number == arr[j] - 1) { // subtract 1 to match the array index
                boolean = 1; //we use boolean to know the number was already in the array
                i--;    //that means we have to do this number in the array again, so we use -1
                break; //and we break out of the for, we don't need to see the rest of the array
            }
        }
        if (boolean == 0) { //
            arr[i] = number + 1; // add 1 to match the card ID, 0 does not interest us
            var img = document.createElement("img"); //new element and setting some parameters like src and id for item handle
            img.id = array_cards[number].id;
            img.src = array_cards[16].src;
            img.setAttribute('onclick', 'start_show(this.id);'); //we also set onclick event here
            document.getElementById("spielbereich").appendChild(img); //we append it to the spielbereich
            if (i == 3 || i == 7 || i == 11) { //we use this to display it as 4x4
                document.getElementById("spielbereich").innerHTML += "<br><br>"
            }
        }
    }
}