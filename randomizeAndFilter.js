var cards = document.querySelectorAll(".card");
var i, j;
var selections = document.getElementsByClassName("filter");

document.addEventListener('DOMContentLoaded', function() {
var randIndex, generatedBefore = 0;
var cards = document.querySelectorAll(".card");
var shuffledCardIndices = new Array();
j = 0;

while(j !== cards.length) {
    randIndex = Math.floor( Math.random() * cards.length );
    for(i = 0; i !== shuffledCardIndices.length; i++)
        if(shuffledCardIndices[i] == randIndex) generatedBefore++;
    if(!generatedBefore) {
        shuffledCardIndices[j] = randIndex;
        j++;
    }
    else generatedBefore--;
}

for(i = 0; i !== cards.length; i++) {
    if(shuffledCardIndices[i+1] != null)
        cards[shuffledCardIndices[i]].parentNode.insertBefore(cards[shuffledCardIndices[i+1]], cards[shuffledCardIndices[i]]);
}
}, false);

function filter() {
    var majorPicked = document.getElementById("majorMenu").querySelector("option:checked");
    var majVal = majorPicked.value;
    var cardsWithMaj = document.getElementsByClassName(majVal);

    var professionPicked = document.getElementById("professionMenu").querySelector("option:checked");
    var proVal = professionPicked.value;
    var cardsWithPro = document.getElementsByClassName(proVal);

    if(majVal === "allMajors") {
        if(proVal === "allProfessions")
            for(i = 0; i !== cards.length; i++)
                cards[i].style.display = "";
        else {
            for(i = 0; i !== cardsWithPro.length; i++)
                if(cardsWithPro[i].style.display !== "block")
                    cardsWithPro[i].style.display = "";
            for(i = 0; i !== cards.length; i++)
                if(!cards[i].classList.contains(proVal))
                    if(cards[i].style.display !== "none")
                        cards[i].style.display = "none";
        }
    }
    else {
        if(proVal === "allProfessions") {
            for(i = 0; i !== cardsWithMaj.length; i++)
                if(cardsWithMaj[i].style.display !== "block")
                    cardsWithMaj[i].style.display = "";
            for(i = 0; i !== cards.length; i++)
                if(!cards[i].classList.contains(majVal))
                    if(cards[i].style.display !== "none")
                        cards[i].style.display = "none";
        }
        else
            for(i = 0; i !== cards.length; i++) {
                if(cards[i].classList.contains(majVal)) {
                    if(cards[i].classList.contains(proVal)) {
                        if(cards[i].style.display !== "block")
                            cards[i].style.display = "";
                    }
                    else
                        if(cards[i].style.display !== "none")
                            cards[i].style.display = "none";
                }
                else
                    if(cards[i].style.display !== "none")
                        cards[i].style.display = "none";
            }
    }

    if(majVal !== "allMajors") {
        selections[0].textContent = majorPicked.textContent.concat(String.fromCharCode(160));
        selections[0].style.display = "block";
        selections[2].style.display = "block";
    }
    else {
        selections[0].style.display = "none";
        if(proVal === "allProfessions")
            selections[2].style.display = "none";
    }

    if(proVal !== "allProfessions") {
        selections[1].textContent = professionPicked.textContent.concat(String.fromCharCode(160));
        selections[1].style.display = "block";
        selections[2].style.display = "block";
    }
    else {
        selections[1].style.display = "none";
        if(majVal === "allMajors")
            selections[2].style.display = "none";
    }
}

function clearSelections() {
    for(i = 0; i !== selections.length; i++)
        selections[i].style.display = "none";
    document.getElementById("majorMenu").value = "allMajors";
    document.getElementById("professionMenu").value = "allProfessions";
    filter();
}

function clearMajor() {
    selections[0].style.display = "none";
    if(window.getComputedStyle(selections[1]).display === "none")
        selections[2].style.display = "none";
    document.getElementById("majorMenu").value = "allMajors";
    filter();
}

function clearProfession() {
    selections[1].style.display = "none";
    if(window.getComputedStyle(selections[0]).display === "none")
        selections[2].style.display = "none";
    document.getElementById("professionMenu").value = "allProfessions";
    filter();
}
