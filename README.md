# 🎧 Rehabilitación Auditiva con React

Este proyecto es una aplicación web diseñada para ayudar a personas con implante coclear a entrenar y mejorar su percepción auditiva. La plataforma ofrece distintos modos de entrenamiento—por ejemplo, reconocimiento de palabras, comprensión de frases y discriminación de sonidos fonológicos—para trabajar diversos aspectos de la audición de forma lúdica y progresiva.

## Objetivos del Proyecto

- **Mejorar la percepción auditiva:** Facilitar ejercicios que ayuden en la discriminación y reconocimiento de sonidos, palabras y frases.
- **Entrenamiento adaptado:** Ofrecer distintos niveles y grupos temáticos, permitiendo entrenar tanto en aspectos generales como en contrastes específicos (por ejemplo, consonantes o vocales).
- **Accesibilidad y usabilidad:** Desarrollado pensando en la accesibilidad para personas con implante coclear, con interfaces intuitivas y retroalimentación visual y auditiva en cada ejercicio.

## Tecnologías Utilizadas

- **[React](https://reactjs.org/)** 19 para el desarrollo de la interfaz.
- **[Vite](https://vitejs.dev/)** para un entorno de desarrollo rápido y optimizado.
- **[Tailwind CSS](https://tailwindcss.com/)** para el diseño y estilo responsivo.
- **[React Router](https://reactrouter.com/)** para la navegación entre vistas.
- **[Framer Motion](https://www.framer.com/motion/)** para animaciones fluidas y atractivas.
- **Google Cloud Text-to-Speech** para la generación de audios con voces naturales.
- **Vite Plugin GitHub Pages** para facilitar el despliegue en GitHub Pages.

## Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables (Navbar, Layout, AudioButton, etc.)
├── data/              # Listas y conjuntos de palabras y frases
├── pages/             # Páginas principales (Home, Training, etc.)
└── utils/             # Scripts y utilidades (generación de audios, manejo de grupos de palabras)
public/
└── audios/            # Archivos de audio generados
```

## Cómo Empezar

### Instalación
1. Clona el repositorio:
   ```sh
   git clone https://github.com/TU_USUARIO/rehab-palabras.git
   cd rehab-palabras
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```

### Ejecución en Desarrollo
Para iniciar el entorno de desarrollo:
```sh
npm run dev
```

### Generar Audios
Utiliza los scripts ubicados en `src/utils` para generar los audios de entrenamiento mediante Google Cloud TTS. Por ejemplo:
```sh
cd src/utils
node generateAudiosQwen.js
```

### Despliegue en GitHub Pages
1. Asegúrate de que `vite.config.js` tenga el `base` correcto:
   ```js
   export default defineConfig({
     base: '/rehab-palabras/',
     plugins: [react(), tailwindcss()],
   });
   ```
2. Instala el plugin:
   ```sh
   npm install -D vite-plugin-gh-pages
   ```
3. Actualiza el script de despliegue en `package.json`:
   ```json
   "deploy": "vite build && vite-gh-pages --dir=dist"
   ```
4. Ejecuta el despliegue:
   ```sh
   npm run deploy
   ```
La web se publicará en: `https://luisalbertofer.github.io/rehab-palabras`

## Créditos

Desarrollado por [Luis Alberto Fernández](https://github.com/luisalbertofer) como herramienta de apoyo en el proceso de rehabilitación auditiva.

---

¡Esperamos que esta aplicación contribuya a mejorar la calidad de vida de quienes la utilicen!