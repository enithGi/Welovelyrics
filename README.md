# Welovelyrics — GitHub Pages

Sitio estático para practicar inglés con música. No usa API, backend ni claves.

## Archivos
- `index.html`: estructura y textos visibles de la página.
- `style.css`: colores, diseño y adaptación a móviles.
- `app.js`: canciones, traducciones, glosarios, preguntas, rutas de los dos videos y lógica de las actividades.
- `media/`: carpeta para el video musical completo de cada canción y los videos MP4 de las actividades.

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
- `SONGS.videoSrc`: ruta del video musical completo de cada canción, por ejemplo `media/twinkle-completa.mp4`. El video aparece en la Biblioteca, junto a la letra bilingüe y el vocabulario, para que puedan verlo y escucharlo mientras leen.
- `QUIZ_QUESTIONS`: cada pregunta tiene su propia propiedad `videoSrc`, además del enunciado, respuesta, cuatro opciones y definición. Ejemplos: `media/pregunta-1.mp4`, `media/pregunta-2.mp4` y `media/pregunta-3.mp4`.
- Los videos de la actividad 3 se configuran individualmente en `orderExercises` dentro de cada canción.
- `ORDER_EXERCISE`: palabras mezcladas y oración correcta.

Usa MP4 para los videos musicales completos de la Biblioteca y para los fragmentos de las actividades. Mantén los nombres de archivo sencillos, sin espacios ni tildes. Para que funcione en GitHub Pages, sube los archivos a la carpeta `media` y conserva exactamente las rutas escritas en `app.js`. Usa contenido propio, de dominio público o con permiso para publicarlo.


## Actividad 3: varios incisos por canción

Cada canción puede tener uno o varios ejercicios en la propiedad `orderExercises` dentro de `SONGS`. Cada ejercicio usa `label`, `sentence`, `videoSrc` (opcional) e `instruction` (opcional). El estudiante debe ordenar correctamente el inciso actual para desbloquear el siguiente.

Ejemplo de tres incisos:

```js
orderExercises: [
  { label: "A", sentence: "You bring a little light", videoSrc: "media/sol-inciso-a.mp4" },
  { label: "B", sentence: "You make the day feel bright", videoSrc: "media/sol-inciso-b.mp4" },
  { label: "C", sentence: "We sing and learn together", videoSrc: "media/sol-inciso-c.mp4" }
]
```

Para una canción con un solo inciso, deja un único objeto dentro del arreglo. Para agregar más, copia otro objeto y cambia la letra, la frase y la ruta del video. Las palabras se mezclan automáticamente.
