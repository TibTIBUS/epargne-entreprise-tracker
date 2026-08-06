# Suivi de mon épargne entreprise

Application de suivi de l'épargne entreprise : versements personnels,
abondement employeur, plus-value de marché, projections fin d'année
et à 10 ans, blocage à 5 ans.

## Stack

React 18 + Vite + Tailwind CSS + Recharts. Aucun backend : les données sont
stockées uniquement dans le `localStorage` du navigateur utilisé.

## Limites du stockage local (important)

- Les données ne sont visibles que dans **le navigateur où elles ont été
  saisies**. Pas de compte, pas de synchronisation entre appareils.
- Vider le cache du navigateur, utiliser la navigation privée, ou changer
  d'appareil fait repartir l'app à zéro.
- Utilisez le bouton **Exporter mes données (JSON)** dans les Paramètres
  régulièrement pour avoir une sauvegarde, et **Importer un fichier JSON**
  pour la restaurer (y compris sur un autre appareil/navigateur).

## Démarrage

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build localement
```

## Déploiement

Le dépôt est connecté à Netlify (`netlify.toml` à la racine). Tout push sur
`main` déclenche un build (`npm run build`) et un déploiement automatique.

## Modifier les hypothèses de calcul

Deux façons :

1. **Sans toucher au code** : bouton "⚙️ Paramètres" dans l'application —
   montant de versement habituel, nombre de versements par an, ratio et
   plafond d'abondement, taux de rendement.
2. **Valeurs par défaut** (si vous préférez les changer dans le code) :
   `src/utils/constants.js`, objet `DEFAULT_SETTINGS`.

## Logique de calcul

Toutes les fonctions de calcul sont des fonctions pures, sans dépendance à
React, regroupées dans `src/utils/calculations.js` :

- `getTotalContributions` / `getTotalAbondement` : sommes à partir des
  opérations saisies.
- `getCurrentValue` : dernière valeur de portefeuille saisie (remplace,
  ne s'additionne pas), ou capital investi si aucun relevé n'a encore
  été saisi.
- `getTotalGain` = abondement total + plus-value de marché.
- `getYearEndProjection` / `getTenYearProjection` : projections basées sur
  le rythme de versement défini dans les Paramètres. N'affichées que si
  au moins une opération existe (sinon la projection n'a pas de sens).
- `getBlockingInfo` : disponibilité individuelle de chaque versement,
  5 ans après sa date (configurable).

## Ajouter mes données

Section "Ajouter une opération" en haut du tableau de bord : renseignez un
ou plusieurs des trois champs (versement personnel, abondement reçu, valeur
totale actuelle du portefeuille) avec la date réelle du relevé, puis
"Enregistrer". Répétez pour chaque relevé mensuel.

## Historique

Version 2 (août 2026) : réécriture complète suite à plusieurs incidents en
production (balises JSX mal fermées, variable de contexte fantôme,
référence non déclarée, fichier corrompu). Voir les commits de cette date
pour le détail de chaque cause racine corrigée structurellement.
