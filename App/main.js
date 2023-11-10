const piezas = document.querySelectorAll(".movil");
const origX = [200, 304, 446, 200];
const origY = [100, 100, 233, 204];
const winAudio = document.getElementById("win");

function establecerPosicionAleatoria(pieza, index) {
    const tamWidth = [134, 192, 134, 163];
    const tamHeight = [163, 134, 163, 134];

    const posicionAleatoriaX = 400 + Math.floor(Math.random() * 50);
    const posicionAleatoriaY = 200 + Math.floor(Math.random() * 50);

    pieza.width = `${tamWidth[index]}px`;
    pieza.height = `${tamHeight[index]}px`;
    pieza.style.position = "absolute";
    pieza.style.left = `${posicionAleatoriaX}px`;
    pieza.style.top = `${posicionAleatoriaY}px`;

    pieza.addEventListener("mousedown", seleccionarElemento);
    pieza.addEventListener("dragstart", (e) => e.preventDefault());
}

piezas.forEach((pieza, index) => {
    establecerPosicionAleatoria(pieza, index);
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

            const coordenadas = {
                A: { left: 524, top: 8 },
                B: { left: 850, top: 60 },
                C: { left: 491, top: 321 },
                D: { left: 805, top: 377 },
            };

            const distanciaDeteccion = 45;

            for (const etiqueta in coordenadas) {
                if (Math.abs(posx - coordenadas[etiqueta].left) < distanciaDeteccion && Math.abs(posy - coordenadas[etiqueta].top) < distanciaDeteccion) {
                    pieza.style.left = `${coordenadas[etiqueta].left}px`;
                    pieza.style.top = `${coordenadas[etiqueta].top}px`;

                    pieza.style.pointerEvents = "none";
                    pieza.style.transition = "top 0.3s, left 0.3s";

                    // No se utiliza setTimeout aquí para desactivar la capacidad de mover la pieza
                    break;
                }
            }
        });
    });
}

// Llama a la función para establecer posiciones aleatorias cerca del centro de la pantalla al cargar la página.
establecerPosicionAleatoria();

const middleLayer = document.getElementById('middleLayer');
const bottomLayer = document.getElementById('bottomLayer');

middleLayer.addEventListener('click', () => {
    middleLayer.style.pointerEvents = 'none';
    bottomLayer.style.pointerEvents = 'auto';
});
