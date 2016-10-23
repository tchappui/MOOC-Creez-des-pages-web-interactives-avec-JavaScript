// Liste des pays
var listePays = [
    "Afghanistan",
    "Afrique du Sud",
    "Albanie",
    "Algérie",
    "Allemagne",
    "Andorre",
    "Angola",
    "Anguilla",
    "Antarctique",
    "Antigua-et-Barbuda",
    "Antilles néerlandaises",
    "Arabie saoudite",
    "Argentine",
    "Arménie",
    "Aruba",
    "Australie",
    "Autriche",
    "Azerbaïdjan"
];

paysElt = document.querySelector("#pays");
suggestionsElt = document.querySelector("#suggestions");

paysElt.addEventListener("input", function(e) {
    var input = e.target.value.toLowerCase();
    suggestionsElt.innerHTML = "";

    var propositions = listePays.filter(function(s) {
        return s.toLowerCase().startsWith(input);
    });


    propositions.forEach(function(p) {
        var propositionElt = document.createElement("div");
        propositionElt.classList.add("suggestion");
        propositionElt.textContent = p;

        propositionElt.addEventListener("click", function(e) {
            paysElt.value = e.target.textContent;
            suggestionsElt.innerHTML = "";
        });

        suggestionsElt.appendChild(propositionElt);
    });
});

