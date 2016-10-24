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
 * Structure de données représentant représentant un lien.
 */
var Lien = {

    /**
     * Méthode d'inititialisation du nouveau lien.
     * - description: objet décrivant le nouveau lien à créer.
     */
    init: function(description) {
        var lien = this._data = {};

        // Création du titre du nouveau lien
        lien.titre = document.createElement("a");
        lien.titre.textContent = description.titre;
        lien.titre.href = description.url;

        // Création de l'url du nouveau lien
        lien.url = document.createElement("span");
        lien.url.textContent = description.url;

        // Création de la ligne d'entête content le titre et l'url du nouveau
        // lien
        lien.entete = document.createElement("h4");
        lien.entete.appendChild(lien.titre);
        lien.entete.appendChild(lien.url);

        // Création de la ligne d'info du nouveau lien
        lien.info = document.createElement("span");
        lien.info.textContent = "Ajouté par " + description.auteur;

        // Création du conteneur pour le nouveau lien
        this.element = document.createElement("div");
        this.element.classList.add("lien");
        this.element.appendChild(lien.entete);
        this.element.appendChild(lien.info);

        // Application des styles CSS pour le nouveau lien
        this.style();
    },

    /**
     * Méthode responsable d'appliquer les styles CSS au nouveau lien
     */
    style: function() {
        var lien = this._data;

        // Styles à appliquer pour l'entête
        lien.entete.style.margin = "0px";

        // Styles à appliquer pour le titre
        lien.titre.style.color = "#428bca";
        lien.titre.style.marginRight = "5px";
        lien.titre.style.textDecoration = "none";

        // Styles à appliquer pour l'url

        // Styles à appliquer pour la ligne d'information

        // Styles à appliquer pour le conteneur this.element
    },
};


/**
 * Structure de donnée représentant la liste de liens dans le DOM.
 */
var Liste = {
    /**
     * Méthode d'initialisation d'un objet de type "Liste de liens".
     * - liste: élément du DOM destiné à contenir la liste.
     */
    init: function(liste) {
        this._data = [];
        this.element = liste;
    },

    /**
     * Méthode permettant d'ajouter un lien en queue de liste.
     */
    append: function(lien) {
        var liste = this._data;

        liste.push(lien);
        this.element.appendChild(lien.element);
    },
    
    /**
     * Méthode permettant d'ajouter un lien en début de liste.
     */
    prepend: function(lien) {
        var liste = this._data;

        if (liste.length > 0)
        {
            this.element.insertBefore(lien.element, liste[0].element);
            liste.splice(0, 0, lien);
        }
        else
        {
            this.append(lien);
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
        this._Feedback.afficher("Ceci est un essai", 3);
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

        /**
         * Méthode privée responsable de l'application des styles sur le bloc
         * de feedback.
         */
        _style: function () {
            this._blocElt.style.backgroundColor = "#CEE7F0";
        },
    
        /**
         * Méthode publique responsable de l'affichage d'un texte dans le bloc
         * de feedback durant n secondes.
         * texte: texte à afficher dans le bloc.
         * n: durée d'affichage du bloc en secondes.
         */
        afficher: function(texte, n) {
            this._blocElt.textContent = texte;
            this._blocElt.style.display = "block";
            setTimeout(function () {
                this._blocElt.style.display = "none";
            }.bind(this), n * 1000);
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

        /**
         * Méthode privée responsable de l'application des styles sur le bouton
         * "Ajouter un lien".
         */
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
        
        /**
         * Méthode privée responsable de l'application des styles sur le
         * formulaire d'ajout.
         */
        _style: function () {
            this._blocElt.style.margin = "20px 0px";
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
    var contenu = document.getElementById("contenu");

    // Création et initialisation de la liste
    var liste = Object.create(Liste);
    liste.init(contenu);

    // Itération à travers la liste de lien
    listeLiens.forEach(function (description) {
        var lien = Object.create(Lien);
        lien.init(description);
        liste.append(lien);
    });

    // Ajout du formulaire
    var formulaire = Object.create(Formulaire);
    formulaire.initFormulaire();
}

main();
