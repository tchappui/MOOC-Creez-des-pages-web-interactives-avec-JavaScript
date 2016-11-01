/* 
 * Activité 3
 */

/* ===========================================================================
 * Données relatives à l'API de gestion des liens
 * ===========================================================================
 */

var serviceURI = {
    "GET": "https://oc-jswebsrv.herokuapp.com/api/liens",
    "POST": "https://oc-jswebsrv.herokuapp.com/api/lien",
};

/* ===========================================================================
 * Définition des styles CSS
 * ===========================================================================
 */

// Définition des styles CSS d'un lien
function stylerLien(lien) {
    lien.entete.style.margin = "0px";
    lien.titre.style.color = "#428bca";
    lien.titre.style.marginRight = "5px";
    lien.titre.style.textDecoration = "none";

    return lien.element;
};

// Définition des styles CSS pour le message de Feedback
function stylerFeedback(fb) {
    fb.element.style.backgroundColor = "#d6ecf6";
    fb.element.style.margin = "15px 0px";
    fb.element.style.padding = "20px";
    fb.element.style.color = "#67acca";
    fb.element.style.fontSize = "larger";
    fb.element.style.borderRadius = "10px";

    return fb.element;
}

// Définition des styles CSS pour le bouton Ajouter
function stylerBoutonAjouter(btn) {
    btn.element.style.margin = "15px 0px";
    btn.element.style.padding = "3px 15px";
    btn.element.style.borderRadius = "5px";
    btn.element.style.backgroundColor = "#fff";
    btn.element.style.border = "1px solid #B8B8B8";

    return btn.element;
}

// Définition des styles CSS pour le formulaire
function stylerFormulaire(fm) {
    fm.element.style.margin = "10px 0px";
    fm.auteur.style.marginRight = "10px";
    fm.titre.style.marginRight = "10px";
    fm.url.style.marginRight = "10px";
    fm.soumettre.style.borderRadius = "5px";
    fm.soumettre.style.backgroundColor = "#fff";
    fm.soumettre.style.border = "1px solid #B8B8B8";
    fm.soumettre.style.padding = "3px 15px";

    return fm.element;
}

/* ===========================================================================
 * Structures de données
 * ===========================================================================
 */

// Fonction utilitaire facilitant la définission de classes et l'héritage
function newClass(cls, base) {
    if (base !== undefined) {
        cls.prototype = Object.create(base.prototype);
        cls.prototype.constructor = cls;
    }
}

/**
 * "Classe de base" implementant un composant qui peut s'afficher ou se cacher
 */

newClass(AfficherCacher);

function AfficherCacher() {}
AfficherCacher.prototype.afficher = function() {
    this.element.style.display = "block";
};
AfficherCacher.prototype.cacher = function() {
    this.element.style.display = "none";
};

/**
 * "Classe" représentant un lien
 */

// Constructeur
newClass(Lien);

function Lien(description) {
    // Création du titre du nouveau lien
    this.titre = document.createElement("a");
    this.titre.textContent = description.titre;
    this.titre.href = description.url;

    // Création de l'url du nouveau lien
    this.url = document.createElement("span");
    this.url.textContent = description.url;

    // Création de la ligne d'entête content le titre et l'url du nouveau
    // lien
    this.entete = document.createElement("h4");
    this.entete.appendChild(this.titre);
    this.entete.appendChild(this.url);

    // Création de la ligne d'info du nouveau lien
    this.info = document.createElement("span");
    this.info.textContent = "Ajouté par " + description.auteur;

    // Création du conteneur pour le nouveau lien
    this.element = document.createElement("div");
    this.element.classList.add("lien");
    this.element.appendChild(this.entete);
    this.element.appendChild(this.info);
}

/**
 * "Classe" représentant le message de feedback confirmant l'ajout du lien
 */

// Constructeur
newClass(Feedback, AfficherCacher);

function Feedback() {
    this.element = document.createElement("div");
    this.element.style.display = "none";
}

// Méthode publique affichant un feedback de confirmation durant n secondes.
Feedback.prototype.confirmer = function(texte, n) {
    this.element.textContent = texte;
    this.afficher();
    setTimeout(function() {
        this.cacher();
    }.bind(this), n * 1000);
};


/**
 * "Classe" représentant le bouton "Ajouter un lien"
 */

// Constructeur
newClass(BoutonAjouter, AfficherCacher);

function BoutonAjouter() {
    this.element = document.createElement("button");
    this.element.style.display = "block";
    this.element.textContent = "Ajouter un lien";
}

/** 
 * "Classe" représentant le formulaire
 */

// Constructeur
newClass(Formulaire, AfficherCacher);

function Formulaire(visible) {
    this.element = document.createElement("form");
    this.element.style.display = "none";

    this.auteur = creerSaisieTexte("auteur", "Entrez votre nom", "20%");
    this.element.appendChild(this.auteur);

    this.titre = creerSaisieTexte("titre", "Entrez le titre du lien", "25%");
    this.element.appendChild(this.titre);

    this.url = creerSaisieTexte("url", "Entrez l'URL du lien", "25%");
    this.element.appendChild(this.url);

    this.soumettre = document.createElement("input");
    this.soumettre.type = "submit";
    this.soumettre.value = "Ajouter";
    this.element.appendChild(this.soumettre);

    // Création d'un champs de saise de texte
    function creerSaisieTexte(name, placeholder, width) {
        var element = document.createElement("input");
        element.type = "texte";
        element.id = name;
        element.name, name;
        element.placeholder = placeholder;
        element.required = true;
        element.style.width = width;
        return element;
    }
}

/* ===========================================================================
 * Point d'entrée de l'exécution du script 
 * ===========================================================================
 */


function main() {
    // Adaptation du titre 
    document.title = "Activité 3";
    document.body.firstElementChild.textContent = "Activité 3";

    // Création de la liste de liens
    var liste = document.getElementById("contenu");

    // Récupération des liens à partir de l'API web
    ajaxGet(serviceURI.GET, function(reponse) {
        var liens = JSON.parse(reponse);
        liens.forEach(function(description) {
            var lien = new Lien(description);
            liste.appendChild(stylerLien(lien));
        });
    });

    // Création d'un conteneur pour le formulaire juste avant la liste de liens
    var formulaire = document.createElement("div");
    formulaire.id = "formulaire";
    liste.parentElement.insertBefore(formulaire, liste);

    // Initialisation des composants du formulaire
    var feedback = new Feedback();
    var bouton = new BoutonAjouter();
    var form = new Formulaire();

    // Gestion des événements
    bouton.element.addEventListener("click", function(e) {
        bouton.cacher();
        form.afficher();
        form.auteur.focus();
    });

    form.element.addEventListener("submit", function(e) {
        var description = {
            "titre": e.target.elements.titre.value,
            "url": e.target.elements.url.value,
            "auteur": e.target.elements.auteur.value
        };
        if (!/^https?\:\/\//.test(description.url)) {
            description.url = "http://" + description.url;
        }

        ajaxPost(serviceURI.POST, description, function(reponse) {
            var lien = new Lien(description);
            liste.insertBefore(stylerLien(lien), liste.firstElementChild);
            feedback.confirmer('Le lien "' + e.target.elements.titre.value +
                '" a bien été ajouté.', 2);
        }, true);

        form.cacher();
        bouton.afficher();
        e.target.reset();
        e.preventDefault();
    });

    // Ajout des composants du formulaire dans le DOM
    formulaire.appendChild(stylerFeedback(feedback));
    formulaire.appendChild(stylerBoutonAjouter(bouton));
    formulaire.appendChild(stylerFormulaire(form));
}

// Exécution du script
main();
