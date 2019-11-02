# contact_manager

## Installation
Installer WAMPP ou XAMPP ou MAMPP en fonction de votre système d'exploitatation.
Créer un dossier *contact-manager* et un virtual host qui pointe vers celui-ci. L'adresse du virtual host doit être **contact-manager**.

Le code php et la base de données de l'API sont disponibles dans le dépot git suivant :  [https://github.com/n3tx-code/contact-manager-api-php](https://github.com/n3tx-code/contact-manager-api-php).

Le code PHP doit être placé dans le dossier *contact-manager* et la base de données doit être importer via *phpmyadmin*.

Il est possible qu'il fasse modifier le fichier *_includes/bdd.php* si l'identifiant vers votre serveur de base de données n'est pas **root** et que le mot de passe n'est pas ***"vide"***.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
