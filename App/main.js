const piezas = document.querySelectorAll(".movil");
const origX = [200, 304, 446, 200];
const origY = [100, 100, 233, 204];
const winAudio = document.getElementById("win");



piezas.forEach((pieza, index) => {
  const tamWidth = [134, 192, 134, 163];
  const tamHeight = [163, 134, 163, 134];

  pieza.width = `${tamWidth[index]}px`;
  pieza.height = `${tamHeight[index]}px`;
  pieza.style.position = "absolute";
  pieza.style.left = `${Math.floor(Math.random() * 10 + 1)}px`;
  pieza.style.top = `${Math.floor(Math.random() * 409 + 1)}px`;

  pieza.addEventListener("mousedown", seleccionarElemento);
  pieza.addEventListener("dragstart", (e) => e.preventDefault()); // Evitar el arrastre por defecto
});

let elementSelect = null;
let offsetX = 0;
let offsetY = 0;

function seleccionarElemento(evt) {
  elementSelect = evt.target;
  offsetX = evt.clientX - parseFloat(elementSelect.style.left);
  offsetY = evt.clientY - parseFloat(elementSelect.style.top);

  elementSelect.style.zIndex = "1";
  document.addEventListener("mousemove", moverElemento);
  document.addEventListener("mouseup", soltarElemento);
}

function moverElemento(evt) {
  const posX = evt.clientX - offsetX;
  const posY = evt.clientY - offsetY;

  elementSelect.style.left = `${posX}px`;
  elementSelect.style.top = `${posY}px`;

  iman();
}

function soltarElemento() {
  elementSelect.style.zIndex = "0";
  document.removeEventListener("mousemove", moverElemento);
  document.removeEventListener("mouseup", soltarElemento);
  elementSelect = null;
  testing();
}



function testing() {
  const bienUbicadas = Array.from(piezas).filter((pieza, index) => {
    const posx = parseFloat(pieza.style.left);
    const posy = parseFloat(pieza.style.top);
    return origX[index] === posx && origY[index] === posy;
  });

  if (bienUbicadas.length === piezas.length) {
    winAudio.play();
  }
}

function iman() {
  piezas.forEach((pieza) => {
    pieza.addEventListener("mouseup", () => {
      const posx = parseFloat(pieza.style.left);
      const posy = parseFloat(pieza.style.top);

      // Define las coordenadas específicas para cada pieza
      const coordenadas = {
        A: { left: -34, top: -67 },
        B: { left: 291, top: -14 },
        C: { left: -69, top: 251 },
        D: { left: 246, top: 305 },
      };

      // Aumenta la distancia de detección a 30 píxeles
      const distanciaDeteccion = 30;

      // Verifica si la pieza se soltó cerca de las coordenadas específicas
      for (const etiqueta in coordenadas) {
        if (Math.abs(posx - coordenadas[etiqueta].left) < distanciaDeteccion && Math.abs(posy - coordenadas[etiqueta].top) < distanciaDeteccion) {
          // Mueve la pieza a las coordenadas específicas
          pieza.style.left = `${coordenadas[etiqueta].left}px`;
          pieza.style.top = `${coordenadas[etiqueta].top}px`;
          
          // Desactiva la capacidad de mover la pieza
          pieza.style.pointerEvents = "none";
          
          // Aplica una transición suave para el acomodamiento
          pieza.style.transition = "top 0.3s, left 0.3s";
          break; // Detiene el bucle una vez que se encuentra una coincidencia
        }
      }
    });
  });
}

function establecerPosicionesAleatoriasCercaDelCentro() {
  piezas.forEach((pieza, index) => {
    const tamWidth = [134, 192, 134, 163];
    const tamHeight = [163, 134, 163, 134];
    
    // Calcula posiciones aleatorias más a la derecha y un poco más lejos del centro
    const posicionAleatoriaX = 400 + Math.floor(Math.random() * 50); // Ajusta la posición X hacia la derecha
    const posicionAleatoriaY = 200 + Math.floor(Math.random() * 50); // Ajusta la posición Y hacia abajo

    pieza.width = `${tamWidth[index]}px`;
    pieza.height = `${tamHeight[index]}px`;
    pieza.style.position = "absolute";
    pieza.style.left = `${posicionAleatoriaX}px`;
    pieza.style.top = `${posicionAleatoriaY}px`;

    pieza.addEventListener("mousedown", seleccionarElemento);
    pieza.addEventListener("dragstart", (e) => e.preventDefault()); // Evitar el arrastre por defecto
  });
}

// Llama a la función para establecer posiciones aleatorias cerca del centro de la pantalla al cargar la página.
establecerPosicionesAleatoriasCercaDelCentro();


const middleLayer = document.getElementById('middleLayer');
const bottomLayer = document.getElementById('bottomLayer');

middleLayer.addEventListener('click', () => {
    middleLayer.style.pointerEvents = 'none';
    bottomLayer.style.pointerEvents = 'auto';
});
 
