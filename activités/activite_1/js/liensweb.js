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
        this._appliquerStyles();
    },

    /**
     * Méthode publique retournant la racine de l'arbre, l'élément section.
     */
    get: function() {
        return this._sectionElt;
    },

    /**
     * Méthode privée responsable d'appliquer les styles.
     */
    _appliquerStyles: function() {
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

    initListe: function () {
        this._contenu = []; 
        this._contenuElt = document.getElementById("contenu");
    },

    ajouter: function (lien) {
        this._contenu.push(lien.get());
        this._contenuElt.appendChild(lien.get());
    },
}

/**
 * Fonction d'exécution principale du script. Elle constitue le point d'entrée
 * pour l'exécution.
 */
function main() {
    // Création et initialisation de la liste
    var liste = Object.create(Liste);
    liste.initListe();

    // Itération à travers la liste de lien
    listeLiens.forEach(function (description) {
        var lien = Object.create(Lien);
        lien.initLien(description);
        liste.ajouter(lien);
    });
}

// Exécution du script
main();
