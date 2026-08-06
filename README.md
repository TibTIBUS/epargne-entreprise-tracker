# Suivi de mon épargne entreprise

Application web de suivi d'épargne entreprise avec calcul d'abondement et projections, déployable sur GitHub + Netlify.

## Fonctionnalités

- �� 📊 **Tableau de bord** : Visualisation claire des versements, abondement, capital total et plus-value
- �� 📝 **Mise à jour mensuelle** : Formulaire simple pour enregistrer vos opérations
- �� 📈 **Graphiques interactifs** : 
  - Évolution année en cours
  - Prévision fin d'année
  - Prévision sur 10 ans
- �� 💾 **Stockage local** : 100% basé sur `localStorage` avec export/import JSON
- �� ⚙��️ **Paramètres configurables** : Ajustez les taux, plafonds et autres hypothèses
- �� 📱 **Responsive** : Optimisé pour mobile et desktop
- �� 🇫���🇷 **Interface en français** : Terminologie financière claire

## Déploiement

### Prérequis
- Node.js (v16+)
- npm ou yarn

### Installation locale
```bash
# Cloner le dépôt
git clone <votre-depot-github>
cd epargne-entreprise-tracker

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

### Build pour production
```bash
npm run build
```

### Déploiement sur Netlify
1. Poussez votre code sur GitHub
2. Connectez votre dépôt à Netlify
3. Netlify détectera automatiquement :
   - Commande de build : `npm run build`
   - Répertoire de publication : `dist`
4. Votre site sera déployé à l'URL fournie par Netlify

## Utilisation

1. **Première utilisation** :
   - L'application démarre avec des données vides
   - Utilisez le formulaire "Mettre à jour mes données" pour saisir :
     - Votre versement personnel du mois
     - L'abondement employeur reçu
     - La valeur actuelle totale (à partir de vos relevés)
   - Cliquez sur "Enregistrer"

2. **Mises à jour mensuelles** :
   - Répétez le processus chaque mois avec vos nouveaux relevés
   - L'historique s'accumule automatiquement

3. **Analyse des résultats** :
   - Le tableau de bord affiche vos KPIs principaux
   - Les graphiques montrent l'évolution et les projections
   - Le panneau d'information indique vos dates de disponibilité (blocage 5 ans)

4. **Gestion des données** :
   - **Exporter** : Sauvegardez vos données via le menu Paramètres
   - **Importer** : Restaurez vos données à partir d'un fichier JSON
   - **Réinitialiser** : Remettez les paramètres par défaut ou supprimez toutes les données

## Personnalisation

### Paramètres ajustables
Dans le menu Paramètres, vous pouvez modifier :
- Montant de base par versement (défaut : 165€)
- Nombre de versements par an (défaut : 10)
- Ratio d'abondement (défaut : 1,5×)
- Plafond annuel d'abondement (défaut : 2500€)
- Taux de rendement annuel moyen pour les projections (défaut : 4% avec options 2%/6%)

### Stockage des données
- Toutes vos données sont stockées dans le `localStorage` de votre navigateur
- Aucune donnée n'est envoyée à un serveur externe
- Pour synchroniser entre appareils : exportez sur l'appareil A, importez sur l'appareil B

## Notes importantes

### Calcul de l'abondement
L'abondement employeur est calculé comme :
```
abondement = min(versements_personnels_annuels × ratio, plafond_annuel)
```
Avec :
- `ratio` : configurable (défaut : 1,5)
- `plafond_annuel` : configurable (défaut : 2500€)

### Projections
- **Projection fin d'année** : Part de votre capital actuel + ajoute les versements/abondements restants de l'année courante avec un rendement composé mensuel
- **Projection 10 ans** : Part de votre capital actuel + ajoute les apports annuels récurrents avec un rendement annuel composé

### Blocage de 5 ans
Chaque versement devient disponible exactement 5 ans après sa date de versement. Le panneau d'information indique :
- Le montant déjà disponible
- La date de disponibilité du prochain versement
- Le détail historique par versement

## Support

Pour toute question ou suggestion d'amélioration, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.