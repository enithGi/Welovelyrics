# Welovelyrics — GitHub Pages

Sitio estático para practicar inglés con música. No usa API, backend ni claves.

## Archivos
- `index.html`: estructura y textos visibles de la página.
- `style.css`: colores, diseño y adaptación a móviles.
- `app.js`: canciones, traducciones, glosarios, preguntas y lógica de las actividades.
- `media/`: carpeta para tus videos y audios locales (crea esta carpeta al añadir tus archivos).

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub.
2. Sube `index.html`, `style.css`, `app.js` y, si la usas, la carpeta `media`.
3. Abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
6. Espera a que GitHub Pages publique el sitio y abre la URL que te muestra.

## Personalizar
Abre `app.js`:
- `SONGS`: canciones, letras, traducciones y vocabulario.
- `VIDEO_SRC`: ruta de tu video, por ejemplo `media/mi-cancion.mp4`.
- `QUIZ_QUESTIONS`: enunciado, respuesta, cuatro opciones y definición de cada pregunta.
- `AUDIO_SRC`: ruta del audio, por ejemplo `media/mi-fragmento.mp3`.
- `ORDER_EXERCISE`: palabras mezcladas y oración correcta.

Usa archivos MP4 para video y MP3, WAV u OGG para audio. Mantén los nombres de archivo sencillos, sin espacios ni tildes. Usa letras y audios propios, de dominio público o con permiso para publicarlos.
