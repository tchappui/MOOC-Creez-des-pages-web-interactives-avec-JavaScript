var f = document.querySelector("form");

f.addEventListener("submit", function(e) {
    var info = document.querySelector("#infoMdp");
    info.textContent = "";

    if (e.target.elements.mdp1.value !== e.target.elements.mdp2.value)
    {
        info.innerHTML += "Erreur: les deux mots de passe ne sont pas identiques<br>";
    }

    if (e.target.elements.mdp1.value.length < 6) {
        info.innerHTML += "Erreur: la longueur minimale du mot de passe est de 6 caractères<br>";
    }

    if (!/[0-9]/.test(e.target.elements.mdp1.value))
    {
        info.innerHTML += "Erreur: le mot de passe doit contenir au minimum un chiffre!"
    };



    e.preventDefault();
});
