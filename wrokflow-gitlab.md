# 📘 Git Workflow – Projet `sendchap`

## 🎯 Objectif

Définir un flux de travail Git clair, stable et sans conflit, du développement à la production, en passant par un systeme de merge request.

---

## 🌱 Structure des branches

| Branche   | Rôle              | Description                                       |
|-----------|-------------------|---------------------------------------------------|
| `develop` | Développement     | Intégration des nouvelles fonctionnalités         |
| `preprod` | Recette / staging | Validation technique et fonctionnelle            |
| `prod`    | Production         | Code déployé en production stable                |

---

## 🔄 Flux Git autorisé

Le code suit **uniquement ce chemin** :

```
feature/* → develop → preprod → prod
```

**⛔ Aucun merge inversé n’est autorisé.**

---

## 🚧 Règles de création et de merge

### 🔧 Développement d'une fonctionnalité

```bash
git checkout develop
git pull
git checkout -b feature/ma-fonctionnalite
# ... développement ...
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin feature/ma-fonctionnalite
```

➡️ Ouvrir une **Merge Request (MR)** vers `develop`

---

### 🚀 Passage en préproduction

➡️ Ouvrir une **MR de `develop` vers `preprod`**  
✔️ Revue obligatoire  
✔️ Tests validés

---

### ✅ Mise en production

➡️ Ouvrir une **MR de `preprod` vers `prod`**  
✔️ Revue obligatoire  
✔️ Validation finale  
✔️ Déclenche le déploiement en production

---

## 🛑 Interdictions

- ❌ `preprod` → `develop`
- ❌ `prod` → `preprod`
- ❌ Push direct sur `develop`, `preprod`, ou `prod`
- ✅ Tous les merges se font via Merge Requests uniquement

---

## 🧪 Intégration continue (CI/CD)

Le fichier `.gitlab-ci.yml` est configuré pour :
- Bloquer les flux non autorisés
- Déployer automatiquement selon la branche :
  - `preprod` → environnement de recette
  - `prod` → environnement de production

---

## 🔐 Configuration GitLab recommandée

- **Branches protégées :** `develop`, `preprod`, `prod`
- **Merge Requests obligatoires**
- **Revue obligatoire** avant tout merge
- **Aucun push direct autorisé**

---

## 📜 Exemple de conventions de branches

| Type       | Nom                                      |
|------------|-------------------------------------------|
| Fonctionnalité | `feature/ajout-auth`                |
| Bugfix     | `bugfix/fix-email-null`                  |
| Hotfix     | `hotfix/paiement-urgent`                 |

---

## ✅ Checklist Merge Request

- [ ] Le code est à jour avec la branche cible (`rebase`)
- [ ] Tous les tests CI passent
- [ ] MR approuvée par au moins 1 reviewer
- [ ] Aucun conflit présent
- [ ] Le titre respecte la convention de message (`feat:`, `fix:`…)

---

## 📌 Résumé

- ✅ **Flux unique :** `develop → preprod → prod`
- 🔒 **Branches protégées & MRs obligatoires**
- 🧪 **CI/CD automatisé par environnement**
- 📂 **Nommage structuré & nettoyage régulier des branches temporaires**

---

> Ce workflow permet d'assurer une livraison continue, stable, et sans conflit jusqu'en production.