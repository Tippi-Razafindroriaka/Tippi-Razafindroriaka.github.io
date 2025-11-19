# Guide de Déploiement - Portfolio Personnel

## 📦 Déploiement sur GitHub Pages

### Étape 1 : Préparer le Repository GitHub

1. **Créer un nouveau repository sur GitHub**
   - Allez sur https://github.com/new
   - Nom du repository : `portfolio` ou `votre-nom.github.io`
   - Description : "Mon portfolio professionnel"
   - Laissez le repository public
   - Ne cochez pas "Initialize with README" (nous avons déjà un README)
   - Cliquez sur "Create repository"

### Étape 2 : Initialiser Git Localement

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
# Initialiser le repository Git
git init

# Configurer votre identité (si ce n'est pas déjà fait)
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit - Portfolio personnel complet"

# Renommer la branche en main
git branch -M main

# Ajouter le remote (remplacez par votre URL)
git remote add origin https://github.com/votre-username/portfolio.git

# Pousser vers GitHub
git push -u origin main
```

### Étape 3 : Activer GitHub Pages

1. Sur GitHub, allez dans votre repository
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous "Source", sélectionnez :
   - Branch : `main`
   - Folder : `/ (root)`
5. Cliquez sur **Save**
6. Attendez quelques minutes pour le déploiement

### Étape 4 : Accéder à Votre Site

Votre site sera disponible à l'adresse :
```
https://votre-username.github.io/portfolio/
```

## 🔄 Mettre à Jour Votre Portfolio

Après avoir modifié des fichiers :

```powershell
# Vérifier les changements
git status

# Ajouter les fichiers modifiés
git add .

# Commiter les changements
git commit -m "Description de vos modifications"

# Pousser vers GitHub
git push
```

Les changements seront automatiquement déployés sur GitHub Pages en quelques minutes.

## 🎨 Personnalisation Avant le Déploiement

### 1. Informations Personnelles

Dans `index.html`, remplacez :
- `[Votre Nom]` par votre nom réel (toutes les occurrences)
- `votre.email@example.com` par votre vraie adresse email
- Les liens vers vos réseaux sociaux (GitHub, LinkedIn, Twitter)

### 2. Images

Ajoutez vos images dans le dossier `images/` :
- `profile.jpg` : Votre photo de profil (500x500px recommandé)
- `projet1-1.jpg`, `projet1-2.jpg` : Captures d'écran du projet 1
- `projet2-1.jpg`, `projet2-2.jpg` : Captures d'écran du projet 2
- `projet3-1.jpg`, `projet3-2.jpg` : Captures d'écran du projet 3

### 3. Contenu des Projets

Modifiez les sections de projets avec :
- Vos vrais projets
- Descriptions détaillées
- Technologies réellement utilisées
- Liens vers les projets et repositories GitHub

### 4. Compétences

Ajustez les pourcentages des barres de progression selon vos vraies compétences.

### 5. Réalisations

Remplacez les exemples par vos vraies certifications et réalisations.

## 🔍 Tests Avant Déploiement

### 1. Test Local

Ouvrez `index.html` dans plusieurs navigateurs :
- Chrome
- Firefox
- Edge
- Safari (si disponible)

### 2. Test Responsive

Utilisez les outils de développement du navigateur (F12) :
- Vue mobile (375px)
- Vue tablette (768px)
- Vue desktop (1920px)

### 3. Validation HTML/CSS

- HTML : https://validator.w3.org/
- CSS : https://jigsaw.w3.org/css-validator/

### 4. Vérifications Finales

- [ ] Tous les liens fonctionnent
- [ ] Toutes les images se chargent
- [ ] Le formulaire de contact valide correctement
- [ ] La navigation est fluide
- [ ] Les animations fonctionnent
- [ ] Le site est responsive
- [ ] Pas d'erreurs dans la console (F12)

## 🚀 Alternatives de Déploiement

### Option 2 : Netlify

1. Créez un compte sur https://www.netlify.com
2. Glissez-déposez le dossier du projet
3. Votre site est en ligne instantanément !

### Option 3 : Vercel

1. Créez un compte sur https://vercel.com
2. Connectez votre repository GitHub
3. Déployez en un clic

### Option 4 : GitHub Pages avec Domaine Personnalisé

1. Achetez un nom de domaine (ex: votrenom.com)
2. Dans les paramètres GitHub Pages, ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions GitHub

## 📊 Suivi et Amélioration

### Google Analytics (Optionnel)

Ajoutez avant la fermeture de `</head>` dans `index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Performances

Testez les performances sur :
- https://pagespeed.web.dev/
- https://gtmetrix.com/

## 🔧 Résolution de Problèmes

### Le site ne s'affiche pas

1. Vérifiez que GitHub Pages est activé
2. Attendez 5-10 minutes après le premier déploiement
3. Vérifiez l'URL (elle peut inclure le nom du repository)

### Les images ne s'affichent pas

1. Vérifiez que les images sont dans le dossier `images/`
2. Vérifiez les noms de fichiers (sensibles à la casse)
3. Utilisez des chemins relatifs : `images/profile.jpg`

### Les styles ne s'appliquent pas

1. Vérifiez que `style.css` est dans le dossier `css/`
2. Vérifiez le lien dans `index.html`
3. Videz le cache du navigateur (Ctrl+F5)

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Consultez la documentation GitHub Pages
3. Recherchez l'erreur sur Stack Overflow

## ✅ Checklist Finale de Déploiement

- [ ] Informations personnelles mises à jour
- [ ] Images ajoutées et optimisées
- [ ] Contenu des projets personnalisé
- [ ] Compétences ajustées
- [ ] Réalisations mises à jour
- [ ] Liens de contact vérifiés
- [ ] Tests sur plusieurs navigateurs effectués
- [ ] Tests responsive effectués
- [ ] HTML/CSS validés
- [ ] Repository GitHub créé
- [ ] Code poussé sur GitHub
- [ ] GitHub Pages activé
- [ ] Site accessible en ligne
- [ ] Tests finaux sur le site déployé

---

**Félicitations ! Votre portfolio est maintenant en ligne ! 🎉**
