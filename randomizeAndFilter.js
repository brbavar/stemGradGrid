var cards = document.getElementsByClassName("card");
var i, j;
var selections = document.getElementsByClassName("filter");

/* Reset page. This includes both selecting the "All majors" and "All career paths" options by default and randomizing the 
   order of the cards - each of which contains one picture and the corresponding text. */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('majorMenu').children[0].selected = 'true';
    document.getElementById('professionMenu').children[0].selected = 'true';

    var randIndex, generatedBefore = 0;
    var cards = document.querySelectorAll(".card");
    var shuffledCardIndices = new Array();
    j = 0;

    while (j < cards.length) {
        randIndex = Math.floor( Math.random() * cards.length );
        for (i = 0; i < shuffledCardIndices.length; i++)
            if (shuffledCardIndices[i] == randIndex) 
                generatedBefore++;
        if (!generatedBefore) {
            shuffledCardIndices[j] = randIndex;
            j++;
        }
        else 
            generatedBefore--;
    }

    for (i = 0; i < cards.length; i++) {
        if (shuffledCardIndices[i+1] != null)
            cards[shuffledCardIndices[i]].parentNode.insertBefore(cards[shuffledCardIndices[i+1]], cards[shuffledCardIndices[i]]);
    }
}, false);

// Display or hide cards based on which menu items are selected.
function filter() {
    var majorPicked = document.getElementById("majorMenu").querySelector("option:checked");
    var majVal = majorPicked.value;
    var cardsWithMaj = document.getElementsByClassName(majVal);

    var professionPicked = document.getElementById("professionMenu").querySelector("option:checked");
    var proVal = professionPicked.value;
    var cardsWithPro = document.getElementsByClassName(proVal);

    if (majVal === "allMajors") {                  // If no particular major has been selected, then...
        if (proVal === "allProfessions")           // if no particular profession has been selected, display all cards;
            for (i = 0; i < cards.length; i++)
                cards[i].style.display = "flex";
        else {                                     // otherwise, display only cards that match selected profession.
            for (i = 0; i < cardsWithPro.length; i++)
                if (cardsWithPro[i].style.display !== "flex")
                    cardsWithPro[i].style.display = "flex";
            for (i = 0; i < cards.length; i++)
                if (!cards[i].classList.contains(proVal))
                    if (cards[i].style.display !== "none")
                        cards[i].style.display = "none";
        }
    }
    else {                                             // Otherwise...
        if (proVal === "allProfessions") {             // if no particular profession has been selected, display only cards 
            for (i = 0; i < cardsWithMaj.length; i++)  // that match selected major;
                if (cardsWithMaj[i].style.display !== "flex")
                    cardsWithMaj[i].style.display = "flex";
            for (i = 0; i < cards.length; i++)
                if (!cards[i].classList.contains(majVal))
                    if (cards[i].style.display !== "none")
                        cards[i].style.display = "none";
        }
        else                                           // otherwise, display only cards that match selected major and
            for (i = 0; i < cards.length; i++) {       // profession.
                if (cards[i].classList.contains(majVal) && cards[i].classList.contains(proVal)) {
                    if (cards[i].style.display !== "flex")
                        cards[i].style.display = "flex";
                }
                else
                    if (cards[i].style.display !== "none")
                        cards[i].style.display = "none";
            }
    }
    /* If a major has been selected, display box containing name of major and box for clearing all selections. 
       Otherwise, hide box containing name of major, and if no profession has been selected, also hide box for
       clearing all selections. */
    if (majVal !== "allMajors") {
        selections[0].textContent = majorPicked.textContent.concat(String.fromCharCode(160));
        selections[0].style.display = "inline-block";
        selections[2].style.display = "inline-block";
    }
    else {
        selections[0].style.display = "none";
        if (proVal === "allProfessions")
            selections[2].style.display = "none";
    }

    /* If a profession has been selected, display box containing name of profession and box for clearing all selections. 
       Otherwise, hide box containing name of profession, and if no major has been selected, also hide box for
       clearing all selections. */
    if (proVal !== "allProfessions") {
        selections[1].textContent = professionPicked.textContent.concat(String.fromCharCode(160));
        selections[1].style.display = "inline-block";
        selections[2].style.display = "inline-block";
    }
    else {
        selections[1].style.display = "none";
        if (majVal === "allMajors")
            selections[2].style.display = "none";
    }
}

// Deselect major and/or profession. As a result, all cards are displayed.
function clearSelections() {
    for (i = 0; i < selections.length; i++)
        selections[i].style.display = "none";
    document.getElementById("majorMenu").value = "allMajors";
    document.getElementById("professionMenu").value = "allProfessions";
    filter();
}

// Deselect major. As a result, cards are displayed as long as they match selected profession (if any).
function clearMajor() {
    selections[0].style.display = "none";
    if (window.getComputedStyle(selections[1]).display === "none")
        selections[2].style.display = "none";
    document.getElementById("majorMenu").value = "allMajors";
    filter();
}

// Deselect profession. As a result, cards are displayed as long as they match selected major (if any).
function clearProfession() {
    selections[1].style.display = "none";
    if (window.getComputedStyle(selections[0]).display === "none")
        selections[2].style.display = "none";
    document.getElementById("professionMenu").value = "allProfessions";
    filter();
}
