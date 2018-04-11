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

 * Structures de données
 * ===========================================================================
 */

/**
 * Sets up the prototype chain for class inheritance.
 *
 * Useful function for easy creation of a new class 
 * from a base class using inheritance in ES5.
 *
 * @param {function} cls  New class constructor.
 * @param {function} base Base class constructor (optional)
 */
function Class(cls, base) {
    if (base !== undefined) {
        cls.prototype = Object.create(base.prototype);
        // The constructor property is set wrong. Let's fix this
        cls.prototype.constructor = cls
        cls.base = base.prototype;
    }
}


/**
 * "Classe de base" implementant un composant qui peut s'afficher ou se cacher
 */

Class(AfficherCacher);

function AfficherCacher() { }
AfficherCacher.prototype.afficher = function () {
    this.element.style.display = "block";
};
AfficherCacher.prototype.cacher = function () {
    this.element.style.display = "none";
};

/**
 * "Classe" représentant un lien
 */

// Constructeur
Class(Lien);

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

    this._styler();
}

// Définition des styles CSS d'un lien
Lien.prototype._styler = function () {
    this.entete.style.margin = "0px";
    this.titre.style.color = "#428bca";
    this.titre.style.marginRight = "5px";
    this.titre.style.textDecoration = "none";
};

/**
 * "Classe" représentant le message de feedback confirmant l'ajout du lien
 */

// Constructeur
Class(Feedback, AfficherCacher);

function Feedback() {
    this.element = document.createElement("div");
    this.element.style.display = "none";
}

// Méthode publique affichant un feedback de confirmation durant n secondes.
Feedback.prototype.confirmer = function (texte, n) {
    this.element.textContent = texte;
    this.afficher();
    setTimeout(function () {
        this.cacher();
    }.bind(this), n * 1000);

    this._styler();
};

// Définition des styles CSS pour le message de Feedback
Feedback.prototype._styler = function () {
    this.element.style.backgroundColor = "#d6ecf6";
    this.element.style.margin = "15px 0px";
    this.element.style.padding = "20px";
    this.element.style.color = "#67acca";
    this.element.style.fontSize = "larger";
    this.element.style.borderRadius = "10px";
}


/**
 * "Classe" représentant le bouton "Ajouter un lien"
 */

// Constructeur
Class(BoutonAjouter, AfficherCacher);

function BoutonAjouter() {
    this.element = document.createElement("button");
    this.element.style.display = "block";
    this.element.textContent = "Ajouter un lien";

    this._styler();
}

// Définition des styles CSS pour le bouton Ajouter
BoutonAjouter.prototype._styler = function () {
    this.element.style.margin = "15px 0px";
    this.element.style.padding = "3px 15px";
    this.element.style.borderRadius = "5px";
    this.element.style.backgroundColor = "#fff";
    this.element.style.border = "1px solid #B8B8B8";
}

/** 
 * "Classe" représentant le formulaire
 */

// Constructeur
Class(Formulaire, AfficherCacher);

function Formulaire(visible) {
    this.element = document.createElement("form");
    this.element.style.display = "none";

    this.auteur = this._creerSaisieTexte("auteur", "Entrez votre nom", "20%");
    this.element.appendChild(this.auteur);

    this.titre = this._creerSaisieTexte("titre", "Entrez le titre du lien", "25%");
    this.element.appendChild(this.titre);

    this.url = this._creerSaisieTexte("url", "Entrez l'URL du lien", "25%");
    this.element.appendChild(this.url);

    this.soumettre = document.createElement("input");
    this.soumettre.type = "submit";
    this.soumettre.value = "Ajouter";
    this.element.appendChild(this.soumettre);

    this._styler();
}

// Définition des styles CSS pour le formulaire
Formulaire.prototype._styler = function () {
    this.element.style.margin = "10px 0px";
    this.auteur.style.marginRight = "10px";
    this.titre.style.marginRight = "10px";
    this.url.style.marginRight = "10px";
    this.soumettre.style.borderRadius = "5px";
    this.soumettre.style.backgroundColor = "#fff";
    this.soumettre.style.border = "1px solid #B8B8B8";
    this.soumettre.style.padding = "3px 15px";
}

// Création d'un champs de saise de texte
Formulaire.prototype._creerSaisieTexte = function (name, placeholder, width) {
    var element = document.createElement("input");
    element.type = "texte";
    element.id = name;
    element.name, name;
    element.placeholder = placeholder;
    element.required = true;
    element.style.width = width;
    return element;
}

/* ===========================================================================
 * Point d'entrée de l'exécution du script 
 * ===========================================================================
 */

function main() {
    // Adaptation du titre 
    document.title = "Activité 5";
    document.body.firstElementChild.textContent = "Activité 3";

    return 0;

    // Création de la liste de liens
    var liste = document.getElementById("contenu");

    // Récupération des liens à partir de l'API web
    ajaxGet(serviceURI.GET, function (reponse) {
        var liens = JSON.parse(reponse);
        var liste = liste;
        liens.forEach(function (description) {
            var lien = new Lien(description);
            liste.appendChild(lien);
        };
    };



    // Création d'un conteneur pour le formulaire juste avant la liste de liens
    var formulaire = document.createElement("div");
    formulaire.id = "formulaire";
    liste.parentElement.insertBefore(formulaire, liste);

    // Initialisation des composants du formulaire
    var feedback = new Feedback();
    var bouton = new BoutonAjouter();
    var form = new Formulaire();

    // Gestion des événements
    bouton.element.addEventListener("click", function (e) {
        bouton.cacher();
        form.afficher();
        form.auteur.focus();
    });

    form.element.addEventListener("submit", function (e) {
        var description = {
            "titre": e.target.elements.titre.value,
            "url": e.target.elements.url.value,
            "auteur": e.target.elements.auteur.value
        };
        if (!/^https?\:\/\//.test(description.url)) {
            description.url = "http://" + description.url;
        }

        ajaxPost(serviceURI.POST, description, function (reponse) {
            var lien = new Lien(description);
            liste.insertBefore(lien, liste.firstElementChild);
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
