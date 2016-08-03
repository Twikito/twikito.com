[twikito.com](http://twikito.com)
===========

Le site [twikito.com](http://twikito.com) est le webfolio de Matthieu Bué, Web et UI designer, développeur front-end et formateur.

Installation
-----------

Le site [twikito.com](http://twikito.com) est compilé avec l'application [Prepros](https://prepros.io/). Vous trouverez la config à la racine.

Support navigateur
-----------

Le site [twikito.com](http://twikito.com) utilise [Autoprefixer](https://github.com/postcss/autoprefixer) pour rendre la plupart des fonctionnalités compatibles avec les anciennes versions des navigateurs. D'après [Can I Use](http://caniuse.com/), le site est compatible avec :

* Chrome
* Firefox
* Edge
* Internet Explorer 10+
* Opera
* Safari

Copyright et licence
-----------

Code copyright 2016 Matthieu Bué. Le code est délivré sous [licence MIT](https://github.com/Twikito/twikito.com/blob/master/LICENSE). Les illustrations sont délivrées sous licence [CC BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr).

Notes de codage
-----------

Le site [twikito.com](http://twikito.com) est codé à la main dans les règles de l'art, sans CMS et sans plugin jQuery. La plupart des fonctionnalités ont été codées par CSS uniquement.

Le code étant en grande partie expérimentale et démonstrative, pour des questions de maintenabilité, je commente ici les réflexions et choix des techniques employées.

* [Les icônes](#les-icônes)
* [Le burger](#le-burger)
* [La barre de navigation](#la-barre-de-navigation)
* [La navigation responsive](#La-navigation-responsive)
* [L'animation du logo](#lanimation-du-logo)
* [Les zones de travers](#les-zones-de-travers)
* [Le texte défilant](#le-texte-défilant)
* [L'apparition des éléments au scroll](#lapparition-des-éléments-au-scroll)
* [Les panneaux de réalisation](#les-panneaux-de-réalisation)
* [La lightbox](#la-lightbox)
* [Le scroll automatique](#le-scroll-automatique)
* [La page 404](#la-page-404)
* [Le code Konami](#le-code-konami)
* [Pour finir](#pour-finir)

### Les icônes

Toutes les illustrations du site sont réalisées par SVG. Pour des questions d'optimisation, les icônes sociales, de navigation et quote sont insérées par sprite SVG externe, afin de profiter du cache navigateur.

### Le burger

_L'animation de SVG par transformations reste encore assez complexe via CSS, c'est pourquoi j'ai choisi d'animer des objets HTML._

L'icône &laquo; burger &raquo; est réalisée avec l'élément ``.navicon``. Un élément enfant et deux pseudo-éléments adjacents sur lesquels j'applique une transformation pour obtenir la flèche.

### La barre de navigation

_La navigation n'étant pas primordiale sur ce site en single page, j'ai fait le choix de la cacher par défaut._

L'apparition/disparition de cette barre se fait par CSS uniquement.

Je me sers d'un checkbox, converti en bouton via ``role='button'``. L'icône est placée dans un label qui est associé à ce checkbox. Le ``nav`` étant adjacent, je n'ai qu'à appliquer les transformations voulues à l'icône et la navigation au ``:checked`` du checkbox.

Pour une question d'accessibilité, j'ai laissé la navigation accessible au clavier même lorsqu'elle est fermée.

Une subtilité pour améliorer l'expérience utilisateur : sur mobile, j'ajoute un pseudo-élément au label qui recouvre tout le viewport, sous la navigation, ce qui permet ainsi de simplifier la fermeture de cette navigation.

_[Voir la démo isolée pour plus de détails](http://codepen.io/Twikito/full/zGdqVO)._

### La navigation responsive

La barre de navigation s'adapte en fonction de la taille de l'écran.

Sur grands écrans, la navigation est pensée pour être secondaire, c'est-à-dire qu'on peut faire le choix de ne pas l'utiliser, cela ne nuira pas à la lecture du site. Il est possible également de laisser cette navigation toujours ouverte, sans être gêné pour la lecture.

Sur écrans intermédiaires, les dimensions de la barre sont diminuées, de même pour tous les contenus du site.

Sur petits écrans, typiquement smartphones, la navigation recouvre une plus grande partie de l'espace disponible, les intitulés étant affichés d'emblée. C'est pour cette raison que la fermeture est facilitée avec la possibilité de cliquer (ou taper) en dehors pour fermer la navigation.

Enfin, sur écrans à hauteur réduite, typiquement smartphones ou tablettes en orientation paysage, j'ai fait le choix de cacher les items jugés secondaires, laissant ainsi les plus importants visibles sans débordement.

### L'animation du logo

_J'ai voulu l'animation du logo par CSS pour plus de fluidité, et pour éviter l'ajout d'un plugin JavaScript._

L'animation se fait par CSS uniquement. Cette animation est basée sur la propriété ``stroke-dasharray`` sur chaque ``<path>`` du SVG.

_[Voir la démo isolée pour plus de détails](http://codepen.io/Twikito/pen/GpeJqR)._

### Les zones de travers

_À l'époque où j'avais codé cette partie, le fait d'appliquer une transformation ``skew`` à un conteneur et un ``skew`` inverse à son contenu provoquait du crénelage au texte. J'ai donc dû trouver une autre solution._

Les zones de travers sont simulées avec un ``<hr>`` avant et après chaque zone, sur lesquels j'applique une couleur d'arrière-plan. À l'intérieur de ces ``<hr>``, j'ajoute les deux pseudo-éléments. Sur l'un j'applique la couleur d'arrière-plan de la zone précédente, sur l'autre celle de la zone suivante.

J'applique enfin une transformation ``skew`` légèrement différente sur chacun d'eux pour obtenir cet effet.

### Le texte défilant

L'animation du texte défilant se fait par CSS uniquement. Un simple élément en ``inline-block`` et ``overflow: hidden``, et un enfant multiligne animé sur la transformation ``translateY``.

### L'apparition des éléments au scroll

_Pour cette partie, j'ai voulu me séparer d'un plugin JavaScript devenu dépassé, qui n'était pas suffisamment permissif quant aux effets à configurer. Je l'ai donc recodé et optimisé moi-même._

Cette animation se fait par JavaScript (sans jQuery) et CSS.

Tout d'abord, j'ajoute l'attribut ``data-se`` (configurable) à chaque élément que je veux animer, renseigné avec le nom de la classe CSS qui sera appliquée à cet élément lorsqu'il sera __en dehors__ de l'écran. De cette façon, c'est l'état initial de l'élément qui est affiché à l'écran.

Ensuite je prépare la classe CSS voulue : elle peut être identique ou différente pour chaque élément, et être adaptée en responsive ou non. Classique. Ici, j'applique une opacité et une transformation.

Enfin la partie JavaScript : le principe est de vérifier si chaque élément ayant pour attribut ``data-se`` est affiché à l'écran lors du scroll. Si l'élément est en dehors, j'ajoute la classe renseignée dans l'attribut ``data-se`` de cet élément ; s'il est affiché, je supprime cette classe.

Ici, j'ai également ajouté un offset (configurable), c'est à dire un décalage depuis les bords haut et bas de l'écran après lequel la classe sera suprimée.

Voici l'usage :

```html
<foo data-(sePrefix)="(class added when outside screen)" [ data-(sePrefix)-repeat="('true'|'false'|max count)" data-(sePrefix)-offset="(offset in px)" ]></foo>
```

_[Voir la démo isolée pour plus de détails](http://codepen.io/Twikito/pen/kXJwKN)._

### Les panneaux de réalisation

_J'ai voulu cet effet par CSS pour plus de fluidité, mais aussi par challenge._

L'ouverture/fermeture de ces panneaux se fait via CSS uniquement.

J'utilise un checkbox, caché par ``aria-hidden='true'``, avant chaque panneau, puis le titre dans le label associé. Ainsi, je n'ai qu'à appliquer les styles voulus, notamment ``min-height``, à chaque élément du panneau au ``:checked`` du checkbox.

### La lightbox

_La plupart des Lightbox ne sont que peu configurables sur les effets, et lourds en ressources. Il m'est arrivé de coder cet effet par JavaScript, mais j'ai voulu tenter le coup par CSS._

Le zoom des captures par lightbox se fait via CSS uniquement.

Ici, j'ai préparé une imbrication de quatre ``<span>`` qui ont chacune un objectif spécifique : overlay, effet, conteneur et image. Le fait que le conteneur soit en ``display: none`` par défaut fait que l'image d'arrière-plan de son enfant ne se charge pas de suite. Je simule ainsi un lazyload et optimise la performance.

Enfin, lors du focus du lien adjacent, j'applique les styles, ce qui charge l'image.

Il semble y avoir un bug sur iOS pour quitter ce focus. Je n'ai pour le moment pas trouvé de solution.

_[Voir la démo isolée pour plus de détails](http://codepen.io/Twikito/full/JYzYKo)._

### Le scroll automatique

Le scroll automatique vers les ancres se fait via JavaScript.

<del>Au clic sur un lien commençant par ``#``, je récupère l'ancre cible, puis la valeur du scroll de cette cible. J'anime ensuite le scroll du ``body`` vers cette ancre, puis change l'URL de la page pour garder l'historique. Pas de plugin, juste cinq lignes de code.</del>
<ins>Pour cette partie, je me suis résolu à utiliser le script [smooth-scroll](https://github.com/cferdinandi/smooth-scroll) de [Chris Ferdinandi](https://github.com/cferdinandi) qui fait ça très bien sans jQuery.</ins>

### La page 404

_Une page 404 n'a que peu d'intérêt pour un site en single page. On peut donc se lâcher complètement._

La page 404 a été assez complexe à réaliser.

L'illustration s'adapte à la taille de l'écran. Ainsi, si vous redimensionnez votre navigateur, vous verrez la mouche se faire attraper, et approcher dangereusement d'une mort certaine :D

Pour obtenir cet effet, il faut une imbrication d'éléments, dimensionnés en pourcentage de la taille totale de l'illustration, avec débordements cachés, pour déplacer ces éléments par rapport à une référence : la mouche.

J'ai placé un lien par-dessus, son contenu dissimulé (et pas caché) pour rester lisible pour les lecteurs d'écran. Au survol et focus, j'applique une animation de filtre teinte en répétition infinie aux SVG adjacents directs. Aussi, je lance la lecture du son pour un effet des plus WTF.

### Le code Konami

Pour ça, je vous laisse voir par vous-même !

<kbd>&uarr;</kbd> <kbd>&uarr;</kbd> <kbd>&darr;</kbd> <kbd>&darr;</kbd> <kbd>&larr;</kbd> <kbd>&rarr;</kbd> <kbd>&larr;</kbd> <kbd>&rarr;</kbd> <kbd>B</kbd> <kbd>A</kbd>

### Pour finir

Mon seul regret est d'être encore dépendant de jQuery&hellip; pour le moment.
