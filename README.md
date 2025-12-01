# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# 📌 Version Control & Branching Strategy

Este projeto utiliza o **[Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)** para gerenciamento de branches e releases.

## 🔀 Branches

- **`main`** → branch de produção (releases estáveis).
- **`developer`** → branch de desenvolvimento (próximas features).
- **`feature/*`** → branches para novas funcionalidades (devem ser mergeadas em `developer` quando concluídas).
- **`hotfix/*`** → branches para correções críticas em produção (devem ser mergeadas em `main` e `developer`).

---

## 🏷️ Versioning

O versionamento segue o padrão **`x.y.z`** (SemVer simplificado):

- **`x` (major):** incrementado em mudanças grandes ou breaking changes
  > Ex.: redesign completo, API v2, etc.
- **`y` (minor):** incrementado ao adicionar novas funcionalidades.
- **`z` (patch):** incrementado para hotfixes e correções.

### 📌 Exemplos

- Correção de bug em produção: `v1.5.8` → `v1.5.9`
- Nova feature: `v1.5.8` → `v1.6.0`
- Mudança de grande impacto: `v1.6.3` → `v2.0.0`

---

## 🏷️ Tags

- Sempre que finalizar uma release, crie uma **tag** no formato:
  ```
  vX.Y.Z
  ```
  Exemplo: `v1.5.8`
