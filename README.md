[twikito.com](http://twikito.com)
===========

Twikito.com est le webfolio de Matthieu Bué, Web et UI designer, développeur front-end et formateur.

Installation
-----------

Twikito.com est complié avec l'application [Prepros](https://prepros.io/). Vous trouverez la config à la racine.

Support navigateur
-----------

Twikito.com utilise [Autoprefixer](https://github.com/postcss/autoprefixer) pour rendre la plupart des fonctionnalités compatibles avec les anciennes versions des navigateurs. D'après Can i use, Twikito.com est compatible avec :

* Chrome
* Firefox
* Edge
* Internet Explorer 10+
* Opera
* Safari

Copyright et license
-----------

Code copyright 2016 Matthieu Bué. Le code est délivré sous [license MIT](https://github.com/Twikito/twikito.com/blob/master/LICENSE). Les illustrations sont délivrées sous license [CC BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr).

Notes de codage
-----------

Twikito.com est codé à la main dans les règles de l'art, sans CMS et sans plugin JavaScript. La plupart des fonctionalités ont été codé par CSS.

Le code étant en grande partie expérimentale et démonstrative, pour des questions de maintenabilité, je commente ici les réflexions et choix des techniques employées.

### L'icône de navigation

L'icône est réalisée avec l'élément ``.navicon``. Un élément enfant et deux pseudo-éléments adjacents sur lesquels j'applique une transformation pour obtenir la flêche.

### La barre de navigation

_La navigation n'étant pas primordiale sur ce site en single page, j'ai fait le choix de la cacher par défaut._

L'apparition/disparition de cette barre se fait par CSS uniquement.

Je me sers d'un checkbox, converti en bouton via ``role='button'``. L'icône est placée dans un label qui est associé à ce checkbox. Le ``nav`` étant adjacent, je n'ai qu'à appliquer les transformations voulues à l'icône et la navigation au ``:checked`` du checkbox.

Une subtilité pour améliorer l'expérience utilisateur : sur mobile, j'ajoute un pseudo-élément au label qui recouvre tout le viewport, sous la navigation, qui permet ainsi de simplifier la fermeture de la navigation.

Voir la [démo isolée](http://codepen.io/Twikito/full/zGdqVO) pour plus de détails.

### L'animation du logo

L'animation se fait par CSS uniquement. Cette animation est basée sur la propriété ``stroke-dasharray`` sur chaque ``<path>`` du SVG.

Voir la [démo isolée](http://codepen.io/Twikito/pen/GpeJqR) pour plus de détails.

### Les zones en biais

Les zones de biais sont simulées avec un ``<hr>`` avant et après chaque zone, sur lesquels j'applique une couleur d'arrière-plan. À l'intérieur de ces ``<hr>``, j'ajoute les deux pseudo-éléments. Sur l'un j'applique la couleur d'arrière-plan de la zone précédente, sur l'autre celle de la zone suivante. J'applique enfin une rotation légèrement différente sur chacun d'eux pour obtenir cet effet.

### Le texte défilant

L'animation du texte défilant se fait par CSS uniquement. Un simple élément en ``inline-block`` et ``overflow: hidden``, et un enfant multiligne animé sur la transformation ``translateY``.

### L'appartion des éléments au scroll

Cette animation se fait par JavaScript (sans jQuery) et CSS.

Tout d'abord, j'ajoute l'attribut ``data-se`` ("se" est configurable) à chaque élément que je veux animer, renseigné avec le nom de la classe CSS qui sera appliquée à cet élément lorsqu'il sera __en dehors__ de l'écran. De cette façon, c'est l'état initial de l'élément qui est affiché à l'écran.

Ensuite je prépare la classe CSS voulue : elle peut être identique ou différente pour chaque élément, et être adaptée en responsive ou non. Classique. Ici, j'applique une opacité et une transformation.

Enfin la partie JavaScript : le principe est d'appliquer un ``eventListener`` sur ``window``, qui s'occupe de vérifier si chaque élément ayant pour attribut ``data-se`` est affiché à l'écran. Si l'élément est en dehors, j'ajoute la classe renseignée dans l'attribut ``data-se`` de cet élément ; si il est affiché, je supprime cette classe.

Ici, j'ai également ajouté un offset (configurable), c'est à dire un décalage depuis les bords haut et bas de l'écran après lequel la classe sera suprimée.

Voici l'usage :

```html
<foo data-(sePrefix)="(class added when outside screen)" [ data-(sePrefix)-repeat="('true'|'false'|max count)" data-(sePrefix)-offset="(offset in px)" ]></foo>
```

Voir la [démo isolée](http://codepen.io/Twikito/pen/kXJwKN) pour plus de détails.

### Les panneaux de réalisation

L'ouverture/fermeture de ces panneaux se fait via CSS uniquement.

J'utilise un checkbox, caché par ``aria-hidden='true'``, avant chaque panneau, puis le titre dans le label associé. Ainsi, je n'ai qu'à appliquer les styles voulus, notamment ``min-height``, à chaque élément du panneau au ``:checked`` du checkbox.

### Les lightbox

Le zoom des captures par lightbox se fait via CSS uniquement.

Ici, j'ai préparé une imbrication de quatre ``<span>`` qui ont chacune un objectif spécifique : overlay, effet, conteneur et image. Le fait que le conteneur soit en ``display: none`` par défaut fait que l'image d'arrière plan de son enfant ne se charge pas de suite. Je simule ainsi un lazyload.

Enfin, lors du focus du lien adjacent, j'applique les styles, ce qui charge l'image.

Voir la [démo isolée](http://codepen.io/Twikito/full/JYzYKo) pour plus de détails.

### Le scroll automatique

Le scroll automatique vers les ancres se fait via JavaScript.

Au clic sur un lien commencant par #, je récupère l'ancre cible, puis la valeur du scroll de cette cible. J'anime ensuite le ``body`` vers cette ancre, puis change l'URL de la page pour garder l'historique. Pas de plugin, juste cinq lignes de code.

### La page 404

La page 404 a été assez complexe à réaliser.

L'illustration s'adapte à la taille de l'écran. Ainsi, si vous redimmensionnez votre navigateur, vous verrez la mouche se faire attraper, et approcher dangereusement d'une mort certaine :D

Pour obtenir cet effet, il faut une imbrication d'éléments, dimensionnés en pourcentage de la taille totale de l'illustration, avec débordements cachés, pour déplacer ces éléments par rapport à une référence : la mouche.

L'effet de survol et focus sont réalisés avec un lien placé dessus, dont le contenu a été dissimulé (et pas caché) mais lisible pour les lecteurs d'écran. Au survol, j'applique une animation de filtre teinte en répétition infinie. Aussi, je lance la lecture du son pour un effet des plus WTF.

### Le code Konami

Pour ça, je vous laisse voir par vous-même !

<kbd>&uarr;</kbd> <kbd>&uarr;</kbd> <kbd>&darr;</kbd> <kbd>&darr;</kbd> <kbd>&larr;</kbd> <kbd>&rarr;</kbd> <kbd>&larr;</kbd> <kbd>&rarr;</kbd> <kbd>B</kbd> <kbd>A</kbd> <kbd>ENTER</kbd>
