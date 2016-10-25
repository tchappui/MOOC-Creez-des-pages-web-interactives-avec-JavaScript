/* 
 * Activité 1
 */

/**
 * Liste des liens Web à afficher. Un lien est défini par :
 * - son titre
 * - son URL
 * - son auteur (la personne qui l'a publié)
 */
var listeLiens = [{
    titre: "So Foot",
    url: "http://sofoot.com",
    auteur: "yann.usaille"
}, {
    titre: "Guide d'autodéfense numérique",
    url: "http://guide.boum.org",
    auteur: "paulochon"
}, {
    titre: "L'encyclopédie en ligne Wikipedia",
    url: "http://wikipedia.org",
    auteur: "annie.zette"
}];


// Insertion d'un conteneur pour le formulaire avant "contenu"
var divContenu = document.getElementById("contenu");
var divFormulaire = document.createElement("div");
divFormulaire.id = "formulaire";
document.body.insertBefore(divFormulaire, divContenu);

// Création et initialisation de la liste de liens
var liste = new Liste(divContenu);

// Itération à travers la liste de lien
listeLiens.forEach(function(description) {
    var lien = new Lien(description);
    liste.append(lien);
});

// Ajout du formulaire
var formulaire = new Formulaire(divFormulaire, liste);


// Structures de données ====================================================

//Construction d'un lien
function Lien(description) {
    // Passage de this aux méthodes privées
    var self = this;

    // Création du titre du nouveau lien
    var titre = document.createElement("a");
    titre.textContent = description.titre;
    titre.href = description.url;

    // Création de l'url du nouveau lien
    var url = document.createElement("span");
    url.textContent = description.url;

    // Création de la ligne d'entête content le titre et l'url du nouveau
    // lien
    var entete = document.createElement("h4");
    entete.appendChild(titre);
    entete.appendChild(url);

    // Création de la ligne d'info du nouveau lien
    var info = document.createElement("span");
    info.textContent = "Ajouté par " + description.auteur;

    // Création du conteneur pour le nouveau lien
    var element = document.createElement("div");
    element.classList.add("lien");
    element.appendChild(entete);
    element.appendChild(info);
    this.element = element;

    // Application des styles CSS pour le nouveau lien
    style();

    // Définition des styles CSS d'un lien
    function style() {
        // Styles à appliquer pour l'entête
        entete.style.margin = "0px";

        // Styles à appliquer pour le titre
        titre.style.color = "#428bca";
        titre.style.marginRight = "5px";
        titre.style.textDecoration = "none";
    }
}

// Construction d'une liste de liens
function Liste(liste) {
    var liens = [];
    this.element = liste;

    // Méthode publique permettant d'ajouter un lien en queue de liste.
    this.append = function(lien) {
        liens.push(lien);
        this.element.appendChild(lien.element);
    };

    // Méthode publique permettant d'ajouter un lien en début de liste.
    this.prepend = function(lien) {
        if (liens.length > 0) {
            this.element.insertBefore(lien.element, liens[0].element);
            liens.splice(0, 0, lien);
        } else {
            this.append(lien);
        }
    };
}

// Construction du formulaire
function Formulaire(formulaire, liste) {
    // Lien vers l'élément du DOM destiné à contenir le formulaire
    this.element = formulaire;
    this.liste = liste;

    // Initialisation des composants du formulaire
    var feedback = new Feedback(false);
    var bouton = new Bouton(true);
    var form = new Form(false);

    bouton.element.addEventListener("click", function(e) {
        bouton.cacher();
        form.afficher();
    });

    form.element.addEventListener("submit", function(e) {
        var description = {
            "titre": e.target.elements.titre.value,
            "url": e.target.elements.url.value,
            "auteur": e.target.elements.auteur.value
        };
        if (!/^https?\:\/\//.test(description.url))
        {
            description.url = "http://" + description.url;
        }
        var lien = new Lien(description);
        this.liste.prepend(lien);
        form.cacher();
        bouton.afficher();
        feedback.afficher('Le lien "' + e.target.elements.titre.value + '" a bien été ajouté.', 2);
        e.preventDefault();
    }.bind(this));

    this.element.appendChild(feedback.element);
    this.element.appendChild(bouton.element);
    this.element.appendChild(form.element);
}

// Construction du feedback
function Feedback(visible) {
    // Passage de this aux méthodes privées
    var self = this;

    this.element = document.createElement("div");
    if (!visible) {
        this.element.style.display = "none";
    }

    // Application des styles CSS à notre élément de feedback
    style();

    // Définition des styles pour l'élément MessageFeedback
    function style() {
        self.element.style.backgroundColor = "#CEE7F0";
        self.element.style.margin = "15px 0px";
        self.element.style.padding = "20px";
        self.element.style.color = "#147A9C";
    }

    // Méthode publique affichant un texte de feedback durant n secondes.
    this.afficher = function(texte, n) {
        this.element.textContent = texte;
        this.element.style.display = "block";
        setTimeout(function() {
            this.element.style.display = "none";
        }.bind(this), n * 1000);
    };
}


// Construction du bouton "Ajouter un lien"
function Bouton(visible) {
    // Passage de this aux méthodes privées
    var self = this;

    this.element = document.createElement("div");
    var bouton = document.createElement("button");
    bouton.textContent = "Ajouter un lien";
    this.element.appendChild(bouton)
    if (!visible) {
        this.element.style.display = "none";
    }

    // Appliquation des styles CSS au bouton
    style();

    // Définition des styles CSS pour le composant BoutonAjouter
    function style() {
        self.element.style.margin = "15px 0px";
        bouton.style.borderRadius = "5px";
    }

    // Méthode publique affichant le bouton "Ajouter un lien"
    this.afficher = function() {
        this.element.style.display = "block";
    };

    // Méthode publique cachant le bouton "Ajouter un lien
    this.cacher = function() {
        this.element.style.display = "none";
    };
}


// Construction de <form>
function Form(visible) {
    // Passage de this aux méthodes privées
    var self = this;

    // Création et initialisation des composants
    this.element = document.createElement("form");

    var auteur = creerSaisieTexte("auteur", "Entrez votre nom", "20%");
    this.element.appendChild(auteur);

    var titre = creerSaisieTexte("titre", "Entrez le titre du lien", "25%");
    this.element.appendChild(titre);

    var url = creerSaisieTexte("url", "Entrez l'URL du lien", "25%");
    this.element.appendChild(url);

    var bouton = document.createElement("input");
    bouton.setAttribute("type", "submit");
    bouton.setAttribute("value", "Ajouter");
    this.element.appendChild(bouton);

    if (!visible) {
        this.element.style.display = "none";
    }

    // Application des styles CSS au composant form
    style();

    // Définition des styles CSS pour le formulaire.
    function style() {
        self.element.style.margin = "10px 0px";
        auteur.style.marginRight = "10px";
        titre.style.marginRight = "10px";
        url.style.marginRight = "10px";
        bouton.style.borderRadius = "5px";
    }

    // Création d'un champs de saise de texte
    function creerSaisieTexte(name, placeholder, width) {
        var element = document.createElement("input");
        element.setAttribute("type", "texte");
        element.setAttribute("id", name);
        element.setAttribute("name", name);
        element.setAttribute("placeholder", placeholder);
        element.required = true;
        element.style.width = width;
        return element;
    }

    // Méthode publique affichant le formulaire de saisie de lien
    this.afficher = function() {
        this.element.style.display = "block";
    };

    // Méthode publique cachant le formulaire de saisie de lien
    this.cacher = function() {
        this.element.style.display = "none";
    };
}
