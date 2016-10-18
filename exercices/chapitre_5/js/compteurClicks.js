var Compteur = {
    initCompteur: function() {
        // Initialisation du compteur
        this._n = 0;

        // On recherche les éléments dans le dom
        this._boutonElt = document.getElementById("clic");
        this._compteurElt = document.getElementById("compteurClics");
        this._zeroElt = document.getElementById("zero");
        this._desactivateurElt = document.getElementById("desactiver");

        // On attache this aux gestionnaires d'événement
        this.gestionnaire = this.gestionnaire.bind(this);
        this.zero = this.zero.bind(this);
        this.desactiver = this.desactiver.bind(this);

        // On ajoute un gestionnaire d'événement au bouton
        this._boutonElt.addEventListener("click", this.gestionnaire);
        this._zeroElt.addEventListener("click", this.zero);
        this._desactivateurElt.addEventListener("click", this.desactiver);
    },

    gestionnaire: function(e) {
        // Le gestionnaire commence par mettre à jour le compteur
        this._n++;

        // Mise à jour de la valeur du compteur dans le dom
        this._compteurElt.textContent = this._n.toString();

        // On arrête la propagation de l'événement
        e.stopPropagation();

    },

    zero: function() {
        this._n = 0;
        // Mise à jour de la valeur du compteur dans le dom
        this._compteurElt.textContent = this._n.toString();

        // On arrête la propagation de l'événement
        e.stopPropagation();

    },

    desactiver: function() {
        this._boutonElt.removeEventListener("click", this.gestionnaire);

        // On arrête la propagation de l'événement
        e.stopPropagation();

    },
};

var compteur = Object.create(Compteur);
compteur.initCompteur();
