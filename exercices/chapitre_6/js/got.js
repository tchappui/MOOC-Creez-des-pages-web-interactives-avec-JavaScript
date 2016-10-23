// Liste de quelques maisons de Game of Thrones. Chaque maison a un code et un nom
var maisons = [
    {
        code: "ST",
        nom: "Stark"
    },
    {
        code: "LA",
        nom: "Lannister"
    },
    {
        code: "BA",
        nom: "Baratheon"
    },
    {
        code: "TA",
        nom: "Targaryen"
    }
];

// Renvoie un tableau contenant quelques personnages d'une maison
function getPersonnages(codeMaison) {
    switch (codeMaison) {
    case "ST":
        return ["Eddard", "Catelyn", "Robb", "Sansa", "Arya", "Jon Snow"];
    case "LA":
        return ["Tywin", "Cersei", "Jaime", "Tyrion"];
    case "BA":
        return ["Robert", "Stannis", "Renly"];
    case "TA":
        return ["Aerys", "Daenerys", "Viserys"];
    default:
        return [];
    }
}

var maisonSelectElt = document.getElementById("maison");

maisons.forEach(function (m) {
    var option = document.createElement("option");
    option.value = m.code;
    option.textContent = m.nom;
    maisonSelectElt.appendChild(option);
});

maisonSelectElt.addEventListener("change", function (e) {
    var listeElt = document.querySelector("#persos");

    listeElt.innerHTML = "";

    var persos = getPersonnages(e.target.value);
    persos.forEach(function (p) {
        var item = document.createElement("li");
        item.textContent = p;
        listeElt.appendChild(item);
    });

});
