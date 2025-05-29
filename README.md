# 🎧 Rehabilitación Auditiva con React

Este es un proyecto web de rehabilitación auditiva diseñado para personas con implante coclear. Permite entrenar la percepción auditiva a través de palabras, frases, fonología y contrastes entre sonidos.

## 🚀 Tecnologías utilizadas

- React 19
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Google Cloud Text-to-Speech (para generación de audios)
- Vite Plugin GitHub Pages (para despliegue)

## 📁 Estructura de carpetas

```
src/
├── components/        # Componentes reutilizables
├── data/              # Listas de palabras y frases
├── pages/             # Páginas principales del proyecto
├── public/audios/     # Audios generados
```

## 🧪 Scripts disponibles

| Comando          | Acción                                 |
|------------------|----------------------------------------|
| `npm run dev`    | Ejecuta el entorno de desarrollo       |
| `npm run build`  | Genera la versión de producción        |
| `npm run preview`| Previsualiza la build localmente       |
| `npm run deploy` | Publica la web en GitHub Pages         |

## 🌐 Despliegue en GitHub Pages

1. Asegúrate de que tu repositorio está publicado en GitHub (público o privado).
2. En `vite.config.js`, añade:

```js
export default defineConfig({
  base: '/NOMBRE_DEL_REPO/',
  plugins: [react(), tailwindcss()],
});
```

3. Asegúrate de que `vite-plugin-gh-pages` está instalado:

```
npm install -D vite-plugin-gh-pages
```

4. Añade el script en tu `package.json`:

```json
"deploy": "vite build && vite-gh-pages --dir=dist"
```

5. Ejecuta el despliegue:

```
npm run deploy
```

Tu web se publicará en: `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO`

---

## ✨ Créditos

Desarrollado por Alberto Fernández como herramienta de ayuda para personas en proceso de rehabilitación auditiva.
