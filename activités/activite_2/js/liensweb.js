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
    url: "http://Wikipedia.org",
    auteur: "annie.zette"
}];


/**
 * Structure de données représentant un élément Lien. 
 * Convention: les identifiants des propriétés et méthodes privées commencent
 * par un caractère de soulignement "_".
 */
var Lien = {

    /**
     * Méthode d'initialisation des objets de type Lien.
     * description: objet contenant les propriétés titre, url et auteur
     */
    initLien: function(description) {
        // Création des nouveaux éléments
        this._sectionElt = document.createElement("section");
        this._sectionElt.classList.add("lien");

        this._titreElt = document.createElement("h2");
        this._aElt = document.createElement("a");
        this._urlElt = document.createElement("span");

        this._auteurElt = document.createElement("p");

        // Ajout des données
        this._aElt.textContent = description.titre;
        this._aElt.href = description.url;
        this._urlElt.textContent = " " + description.url;
        this._auteurElt.textContent = "Ajouté par " + description.auteur;

        // Construction de l'arbre
        this._titreElt.appendChild(this._aElt);
        this._titreElt.appendChild(this._urlElt);

        this._sectionElt.appendChild(this._titreElt);
        this._sectionElt.appendChild(this._auteurElt);

        // Application des styles
        this._style();
    },

    /**
     * Méthode publique retournant la racine de l'arbre, c-à-d l'élément section.
     */
    get: function() {
        return this._sectionElt;
    },

    /**
     * Méthode privée responsable d'appliquer les styles CSS aux liens.
     */
    _style: function() {
        //Styles pour l'élément titre
        this._titreElt.style.marginTop = "0";
        this._titreElt.style.marginBottom = "0.5ex";

        // Styles pour l'élément a
        this._aElt.style.textDecoration = "none";
        this._aElt.style.color = "#428bca";

        // Styles pour l'élément url
        this._urlElt.style.fontSize = getComputedStyle(this._auteurElt).fontSize;

        // Styles pour l'élément auteur
        this._auteurElt.style.marginTop = "0";
        this._auteurElt.style.marginBottom = "0";
    },
};

/**
 * Structure de donnée représentant la liste de liens dans le DOM.
 */
var Liste = {
    /**
     * Méthode d'initialisation d'un objet de type "Liste de liens".
     */
    initListe: function() {
        this._contenu = [];
        this._contenuElt = document.getElementById("contenu");
    },

    /**
     * Méthode publique permettant d'ajouter un lien en queue de liste.
     */
    ajouter: function(lien) {
        this._contenu.push(lien.get());
        this._contenuElt.appendChild(lien.get());
    },
    
    /**
     * Méthode publique permettant d'ajouter un lien en début de liste.
     */
    ajouterDebut: function(lien) {
        if (this._contenu.length > 0)
        {
            this._contenuElt.insertBefore(lien.get(), this._contenu[0]);
            this._contenu.splice(0, 0, lien.get());
        }
        else
        {
            this.ajouter(lien);
        }
    },
}

/**
 * Structure de donnée représentant le formulaire.
 */
var Formulaire = {
    /**
     * Méthote d'initialisation d'un formulaire de saisie de liens.
     */
    initFormulaire: function() {
        this._Feedback.init(false);
        this._Bouton.init(true);
        this._Formulaire.init(true);
        this._Feedback.afficher("Ceci est un essai");
    },

    /**
     * Structure de donnée responsable de la gestion du feedback lorsqu'un
     * nouveau lien a été ajouté.
     */
    _Feedback: {
        init: function(visible) {
            this._blocElt = document.createElement("p");
            if (!visible) {
                this._blocElt.style.display = "none";
            }

            var contenuElt = document.getElementById("contenu");
            document.body.insertBefore(this._blocElt, contenuElt);

            this._style();
        },

        _style: function () {
            this._blocElt.style.backgroundColor = "#CEE7F0";
        },

        afficher: function(texte) {
            this._blocElt.textContent = texte;
            this._blocElt.style.display = "block";
            setTimeout(function () {
                this._blocElt.style.display = "none";
            }.bind(this), 5000);
        },

    },

    /**
     * Structure de donnée responsable de la gestion du bouton "Ajouter un
     * lien".
     */
    _Bouton: {
        init: function(visible) {
            this._blocElt = document.createElement("div");
            this._boutonElt = document.createElement("button");
            this._boutonElt.textContent = "Ajouter un lien";
            if (!visible) {
                this._blocElt.style.display = "none";
            }
            this._blocElt.appendChild(this._boutonElt);

            var contenuElt = document.getElementById("contenu");
            document.body.insertBefore(this._blocElt, contenuElt);

            this._style();
        },

        _style: function () {
        },

        afficher: function() {},

        cacher: function() {},
    },

    /**
     * Structure de donnée responsable de la gestion du formulaire d'ajout.
     */
    _Formulaire: {
        init: function(visible) {
            this._blocElt = document.createElement("form");
            this._blocElt.style.margin = "20px 0px";

            this._auteurElt = this._creerSaisieTexte("auteur", "Entrez votre nom", "20%");
            this._blocElt.appendChild(this._auteurElt);

            this._titreElt = this._creerSaisieTexte("titre", "Entrez le titre du lien", "25%");
            this._blocElt.appendChild(this._titreElt);

            this._urlElt = this._creerSaisieTexte("url", "Entrez l'URL du lien", "25%");
            this._blocElt.appendChild(this._urlElt);

            this._boutonElt = document.createElement("input");
            this._boutonElt.setAttribute("type", "submit");
            this._boutonElt.setAttribute("value", "Ajouter");
            if (!visible) {
                this._blocElt.style.display = "none";
            }
            this._blocElt.appendChild(this._boutonElt);

            var contenuElt = document.getElementById("contenu");
            document.body.insertBefore(this._blocElt, contenuElt);

            this._style();
        },

        _style: function () {
            this._titreElt.style.marginLeft = "10px";
            this._urlElt.style.marginLeft = "10px";
            this._boutonElt.style.marginLeft = "10px";
        },

        _creerSaisieTexte: function(name, placeholder, width) {
            var element = document.createElement("input");
            element.setAttribute("type", "texte");
            element.setAttribute("id", name);
            element.setAttribute("name", name);
            element.setAttribute("placeholder", placeholder);
            element.required = true;
            element.style.width = width;
            return element;
        },

        afficher: function() {},

        cacher: function() {},
    },
}


/**
 * Fonction d'exécution principale du script. Elle constitue le point d'entrée
 * pour l'exécution. L'approche objet me permet de gérer les composants de la 
 * page en langage haut niveau.
 */
function main() {
    // Création et initialisation de la liste
    var liste = Object.create(Liste);
    liste.initListe();

    // Itération à travers la liste de lien
    listeLiens.forEach(function(description) {
        var lien = Object.create(Lien);
        lien.initLien(description);
        liste.ajouter(lien);
    });

    // Ajout du formulaire
    var formulaire = Object.create(Formulaire);
    formulaire.initFormulaire();
}

main();
