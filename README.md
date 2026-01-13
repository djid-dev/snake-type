# Snake Type Game 🐍

Un juego minimalista de mecanografía diseñado para poner a prueba y mejorar tu velocidad y precisión al escribir.

## 🚀 Características

- **Cálculo de WPM**: Mide tus Palabras Por Minuto en tiempo real.
- **Nivel de Precisión**: Monitorea qué tan exacto eres al escribir.
- **Temporizador Dinámico**: Rondas rápidas de 30 segundos para practicar.
- **Feedback Visual**:
  - Colores distintivos para aciertos (verde) y fallos (rojo).
  - Cursor animado suave para seguir tu progreso.
  - Advertencia visual si tienes el "Bloq Mayús" activado.
- **Interfaz Limpia**: Diseño enfocado en el contenido sin distracciones.

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Para la estructura semántica de la aplicación.
- **CSS3**: Uso de Variables CSS, Animaciones (`@keyframes`), Flexbox y Grid para un diseño moderno y responsivo.
- **JavaScript (ES6+)**: Lógica del juego estructurada en módulos (`events.js`, `data.js`, `script.js`) sin dependencias externas.

## 🎮 Cómo Jugar

1. **Abre el juego**: Ejecuta el archivo `index.html` en tu navegador.
2. **Empieza a escribir**: No necesitas hacer clic en ningún lado, el foco se activa automáticamente (o al presionar cualquier tecla).
3. **Sigue el texto**: Escribe las palabras que aparecen en pantalla.
   - El temporizador comenzará automáticamente con tu primera tecla.
4. **Resultados**: Al finalizar el tiempo, verás tu puntuación de WPM y tu porcentaje de precisión.
5. **Reiniciar**: Presiona el botón de reinicio para jugar otra ronda.

## 📂 Estructura del Proyecto

- `index.html`: Punto de entrada y estructura DOM.
- `styles.css`: Estilos visuales y animaciones.
- `script.js`: Controlador principal y bucle del juego.
- `events.js`: Manejadores de eventos de teclado.
- `data.js`: Diccionario de palabras para el juego.

---
Hecho con 💖 por **Orlando J. Jorge**
