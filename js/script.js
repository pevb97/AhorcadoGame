var btnIniJuego = document.querySelector(".btnIniJuego");
var btnAgrPal = document.querySelector(".btnAgrPalabra");
var canvas = document.createElement("canvas");
var pincel = canvas.getContext("2d");

var cuerpo = document.querySelector(".cuerpo");
var listaBtn = document.querySelector(".listaBtn");
var inputAgrPalabra = document.createElement("input");

var inputLetras = document.createElement("input");
var inputPalabra = document.createElement("input");

var btnJuegoNuevo = document.createElement("input");
btnJuegoNuevo.type = "button";
btnJuegoNuevo.value = "Juego Nuevo";

var btnVolverInicio = document.createElement("input");
btnVolverInicio.type = "button";
btnVolverInicio.value = "Volver Inicio";

var btnAgrPal2 = document.createElement("input");
btnAgrPal2.type = "button";
btnAgrPal2.value = "Agregar Palabra";

var paginaActual;

var palabraActual;
var posLineas;
var letrasIncorrectas = "";
var letrasAdivinadas = "";
var partesDibujo = 8;
var palabraAgregada = "";

var palabrasSecretas = [
    "GRADO", "TARTA", "REPRESENTANTE", "EXPORTAR", "DESTRUIR", "PENSAMIENTO", "ARRASTRAR", "REBUZNAR", "DISTRIBUIR", "LINEA",
    "DELEITE", "CANGURO", "AUMENTAR", "EXPLICACION", "PROFETICO", "HOGAREÑO", "CRIMINAL", "TRISTEZA", "PSICODELICO", "ENTRE",
    "POETICO", "MIRAR", "CONSEJO", "ESPERAR", "ENCONTRAR", "IR", "PLEGABLE", "DESAGRADABLE", "BULEVAR", "SONDA",
    "ALIANZA", "GUERRA", "PATRULLA", "NEGRO", "TALON", "ABANDONO", "FROTAR", "CACIQUE", "RUIDO", "PLUMA",
    "PUÑO", "BESAR", "CRANEO", "ANHELO", "VIAJE", "VALLA", "NORTE", "FANTASTICO", "TIEMPO", "INTERNET",
    "RELAMPAGO", "GOLPEADO", "FALSIFICADOR", "ORACION", "MALDICION", "ROCA", "MISERABLE", "PRISA", "TORPE", "ACUOSO",
    "HUMEDO", "SOFTWARE", "ORADOR", "DESAFIANTE", "LICOR", "SATURAR", "RESPONSABILIDAD", "PRIVAR", "ENORME", "SENTIR",
    "MEJORA", "ELEFANTE", "AGENDA", "AMPLITUD", "APROBACION", "CAMINO", "COLUMNA", "MEZCLADA", "TAZA"];

btnIniJuego.addEventListener("click", function () {
    crearTablero();

    palabraActual = crearPalabraSecreta();
    letrasIncorrectas = "";
    letrasAdivinadas = "";
    //console.log(palabraActual);
    posLineas = mostrarGuiones(palabraActual);
    //console.log(posLineas);
    crearInputLetras();

    btnIniJuego.replaceWith(btnJuegoNuevo);
    btnJuegoNuevo.classList.add("btnIniJuego");

    btnAgrPal.replaceWith(btnVolverInicio);
    btnVolverInicio.classList.add("btnAgrPalabra");
    //console.log(palabrasSecretas);
    paginaActual = 2;
});



btnJuegoNuevo.addEventListener("click", function(){
    //crearTablero();
    palabraActual = crearPalabraSecreta();
    letrasIncorrectas = "";
    letrasAdivinadas = "";
    //console.log(palabraActual);
    posLineas = mostrarGuiones(palabraActual);
    //console.log(posLineas);
    //console.log(palabrasSecretas);
    crearInputLetras();
});

btnVolverInicio.addEventListener("click", function () {
    if (paginaActual == 2) {
        cuerpo.removeChild(canvas);
        cuerpo.removeChild(inputLetras);

        listaBtn.classList.add("listaBtn");

        btnJuegoNuevo.replaceWith(btnIniJuego);
        btnIniJuego.classList.add("btnIniJuego");

        btnVolverInicio.replaceWith(btnAgrPal);
        btnAgrPal.classList.add("btnAgrPalabra");
    } 
    else if (paginaActual == 3) {

        cuerpo.removeChild(inputPalabra);
        listaBtn.classList.add("listaBtn");

        btnAgrPal2.replaceWith(btnIniJuego);
        btnIniJuego.classList.add("btnIniJuego");

        btnVolverInicio.replaceWith(btnAgrPal);
        btnAgrPal.classList.add("btnAgrPalabra");
    }

});

btnAgrPal.addEventListener("click", function () {

    listaBtn.classList.remove("listaBtn");
    crearInputAgrPalabra();
        
    btnAgrPal.replaceWith(btnVolverInicio);
    btnVolverInicio.classList.add("btnAgrPalabra");

    btnIniJuego.replaceWith(btnAgrPal2);
    btnAgrPal2.classList.add("btnIniJuego");

    paginaActual = 3;

});

btnAgrPal2.addEventListener("click", function () {
    //console.log(palabraAgregada);
    var enPalabrasSecretas = false;

    if (palabraAgregada.length != 0) {
        for (let i = 0; i < palabrasSecretas.length; i++) {
            if(palabraAgregada == palabrasSecretas[i]){
                enPalabrasSecretas = true;
                break;
            }
            
        }
        if (enPalabrasSecretas) {
            alert("Tu palabra ya se encuentra en nuestras palabras secretas, intenta de nuevo");
        }else{
            palabrasSecretas.push(palabraAgregada);
            inputPalabra.value = "";
            palabraAgregada = "";
            //console.log(palabrasSecretas);
            alert("Palabra agregada exitosamente");
        }

    }else{
        alert("No introdujiste una palabra, intenta de nuevo");
    }
});

inputLetras.addEventListener("input", function () {
    var letraObtenida;
    var datoUsu = inputLetras.value;
    inputLetras.value = "";
    var ascii_code = datoUsu.charCodeAt(0);
    
    if (ascii_code >= 65 && ascii_code <= 90) {
        letraObtenida = String.fromCharCode((ascii_code));
    } else if (ascii_code == 241 || ascii_code == 209) {
        letraObtenida = String.fromCharCode((209));
    } else if (ascii_code >= 97 && ascii_code <= 122) {
        letraObtenida = String.fromCharCode((ascii_code - 32));
    } else {
        letraObtenida = "";
        alert("No ingresaste una letra");
    }
    var posLetra = verificarLetraPalabraSecreta(letraObtenida, palabraActual);
    //console.log(posLetra);
    //console.log(posLetra.length);
    //return letraObtenida;
});

inputPalabra.addEventListener("input", function (event) {
    //console.log(event.data);
    var letraObtenida;
    
    var  ascii_code;
    //console.log("antes del IF: "+ inputPalabra.value);
    if (inputPalabra.value != "") {
        ascii_code = inputPalabra.value[inputPalabra.value.length-1].charCodeAt(0);

        if (ascii_code == 241 || ascii_code == 209) {
            inputPalabra.value += String.fromCharCode((209));
            //console.log("antes SI 1 IF: "+ inputPalabra.value);
        } else if (ascii_code >= 97 && ascii_code <= 122) {
            inputPalabra.value = inputPalabra.value.substring(0, inputPalabra.value.length - 1);
            inputPalabra.value += String.fromCharCode(ascii_code-32);
            //console.log("antes SI 2 IF: "+ inputPalabra.value);
        } else if(!(ascii_code >= 65 && ascii_code <= 90)){
            alert("No estas ingresando una letra o estas tratando de ingresar mas de una palabra");
            //console.log("antes SI 3 IF: "+ inputPalabra.value);
            inputPalabra.value = inputPalabra.value.substring(0, inputPalabra.value.length - 1);
            //inputPalabra.value = palabraAgregada;
        }
        palabraAgregada = inputPalabra.value;
    }

});

function crearTablero() {

    canvas.width = 500;
    canvas.height = 800;

    cuerpo.insertBefore(canvas, listaBtn);
    canvas.classList.add("lienzo");
    listaBtn.classList.remove("listaBtn");
}
function crearPalabraSecreta() {

        var numRandom = Math.round(Math.random() * (palabrasSecretas.length - 1));
        var palabraActual = palabrasSecretas[numRandom];
        //console.log(palabraActual);
        return palabraActual;
}
function mostrarGuiones(palabraActual) {

    var tamPalabraActual = palabraActual.length;
    var posLineas = [];
    var divAlto = 4;
    var tamLineas = (canvas.width/tamPalabraActual);
    var espEntreLineas = (canvas.width/tamPalabraActual)/10;
    var posYLineas = canvas.height - ((canvas.height)/(divAlto)) + (canvas.height/divAlto)/2;

    pincel.beginPath();
    pincel.fillStyle = "#FAEBD7";
    pincel.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < tamPalabraActual; i++) {
        var posXIni = ((i*tamLineas) + espEntreLineas);
        var posXFin = (((i+1)*tamLineas) - espEntreLineas);


        
        pincel.beginPath();
        pincel.strokeStyle = "blue";
        pincel.moveTo(posXIni, posYLineas);
        pincel.lineTo(posXFin, posYLineas);
        
        pincel.stroke();
        posLineas.push([posXIni, posYLineas, posXFin, posYLineas]);
        
    }
    return posLineas;
}
function crearInputAgrPalabra() {

    cuerpo.insertBefore(inputPalabra, listaBtn);
    inputPalabra.classList.add("inputAgrP");
    inputPalabra.focus();

}
function crearInputLetras() {
    
    cuerpo.insertBefore(inputLetras, listaBtn);
    inputLetras.classList.add("inputUsu");
    inputLetras.disabled = false;
    inputLetras.focus();
    inputLetras.maxLength = 1;

}

function dibujarLetraCorrecta(letraObtenida, posLetra) {
    for (let i = 0; i < posLetra.length; i++) {
        var posXLetra = parseInt(posLineas[posLetra[i]][0] + (posLineas[posLetra[i]][2] - posLineas[posLetra[i]][0])/2);
        var posYLetra = posLineas[posLetra[i]][1];
        //dibTexto("center", "25px arial", letra, posXLetra, posYLetra, "red");

        pincel.beginPath();
        pincel.fillStyle = "red";
        pincel.textAlign = "center";
        pincel.font = "25px arial";
        pincel.fillText(letraObtenida, posXLetra, posYLetra);
        
    }
}
function dibujarLetraIncorrecta(letraObtenida) {
    var conLetrasIncorrectas = false;
    for (let i = 0; i < letrasIncorrectas.length; i++) {
        if (letraObtenida == letrasIncorrectas[i]) {
            conLetrasIncorrectas = true;
            break;
        }
        
    }
    if (!conLetrasIncorrectas) {
        letrasIncorrectas += letraObtenida;
        pincel.beginPath();
        pincel.fillStyle = "#FAEBD7";
        pincel.fillRect(0, canvas.height-((canvas.height/4)/2), canvas.width, ((canvas.height/4)/2));
        pincel.fillStyle = "red";
        pincel.textAlign = "center";
        pincel.font = "25px arial";
        pincel.fillText(letrasIncorrectas, canvas.width/2, canvas.height-canvas.height/4/4);
    }
    
}
function dibujarHorca() {
    function dibCircunferencia(posX, posY, radio, angIni, angFin, color) {
        pincel.beginPath();
        pincel.strokeStyle = color;
        pincel.arc(posX, posY, radio, angIni, angFin);
        pincel.stroke();
    }

    function dibLinea(posXIni, posYIni, posXFin, posYIFin, colorLinea) {
        pincel.beginPath();
        pincel.moveTo(posXIni, posYIni);
        pincel.lineTo(posXFin, posYIFin);
        pincel.strokeStyle = colorLinea;
        pincel.stroke();
    }

    var partesDibujo = [
        [(3 * canvas.width / 5), (canvas.height / 6), (canvas.height / 14)],//Cabeza
        [(3 * canvas.width / 5), (5 * canvas.height / 21), (41 * canvas.height / 84)],//Tronco
        [(3 * canvas.width / 5), (41 * canvas.height / 84), ((3 * canvas.width / 5) + (canvas.height / 14)), (47 * canvas.height / 84)],
        [(3 * canvas.width / 5), (41 * canvas.height / 84), ((3 * canvas.width / 5) - (canvas.height / 14)), (47 * canvas.height / 84)],
        [(3 * canvas.width / 5), (2 * canvas.height / 21), (canvas.height / 18)],
        [(3 * canvas.width / 5), (canvas.height / 18), (canvas.width / 2)],
        [((canvas.width / 2)), ((canvas.height / 18)), (167 * canvas.height / 252)],
        [((canvas.width / 2) - (2 * canvas.height / 14)), (167 * canvas.height / 252), ((canvas.width / 2) + (2 * canvas.height / 14))]
    ];
    function dibujarPartes(parte) {
        if (parte == 0) {
            dibCircunferencia(partesDibujo[0][0], partesDibujo[0][1], partesDibujo[0][2], 0, 2 * Math.PI);
        } else if (parte == 1) {
            dibLinea(partesDibujo[1][0], partesDibujo[1][1], partesDibujo[1][0], partesDibujo[1][2], "blue");
        } else if (parte == 2) {
            dibLinea(partesDibujo[2][0], partesDibujo[2][1], partesDibujo[2][2], partesDibujo[2][3], "blue");
        } else if (parte == 3) {
            dibLinea(partesDibujo[3][0], partesDibujo[3][1], partesDibujo[3][2], partesDibujo[3][3], "blue");
        } else if (parte == 4) {
            dibLinea(partesDibujo[4][0], partesDibujo[4][1], partesDibujo[4][0], partesDibujo[4][2], "blue");
        } else if (parte == 5) {
            dibLinea(partesDibujo[5][0], partesDibujo[5][1], partesDibujo[5][2], partesDibujo[5][1], "blue");
        } else if (parte == 6) {
            dibLinea(partesDibujo[6][0], partesDibujo[6][1], partesDibujo[6][0], partesDibujo[6][2], "blue");
        } else if (parte == 7) {
            dibLinea(partesDibujo[7][0], partesDibujo[7][1], partesDibujo[7][2], partesDibujo[7][1], "blue");
        }
    }

    //console.log("Tamaño letras incorrectas " + letrasIncorrectas.length);
    for (let i = 0; i < letrasIncorrectas.length; i++) {
        dibujarPartes(i);
        //console.log(dibujarPartes);
    }
    //letrasIncorrectas.length
}
function verificarLetraPalabraSecreta(letraObtenida, palabraActual) {
    var posLetra = [];
    var contLetPalSec = false;
    for (let i = 0; i < palabraActual.length; i++) {
        if (letraObtenida == palabraActual[i]) {
            contLetPalSec = true;
            //console.log("Tiene letra " + this.contLetPalSec);
            posLetra.push(i);
            letrasAdivinadas += letraObtenida;
            //break;
        }
    }
    if (contLetPalSec) {
        dibujarLetraCorrecta(letraObtenida, posLetra);
        verificarGanador(letrasIncorrectas.length);
    } else {
        dibujarLetraIncorrecta(letraObtenida);
        dibujarHorca();
        verificarFinJuego(letrasIncorrectas.length);
        
    }
    return posLetra;
}
function verificarFinJuego(cantLetrasIncorrectas) {
    //var partesDibujo = 8;
    function mostrarFinJugeo() {
        pincel.beginPath();
        pincel.fillStyle = "#FAEBD7";
        pincel.fillRect(0, 0, canvas.width, canvas.height);

        pincel.fillStyle = "black";
        pincel.textAlign = "center";
        pincel.font = "25px arial";
        pincel.fillText("Perdiste el juego " , (canvas.width/2), 2*(canvas.height/6));
        pincel.fillText("la palabra era: " , (canvas.width/2), 3*(canvas.height/6));
        pincel.fillStyle = "red";
        pincel.fillText(palabraActual, (canvas.width/2), 4*(canvas.height/6));
    }
    if (cantLetrasIncorrectas == partesDibujo) {
        mostrarFinJugeo();
        inputLetras.disabled = true;
    }
}
function verificarGanador(cantLetrasIncorrectas) {
    //var partesDibujo = 8;
    function mostrarGanoJuego() {
        pincel.beginPath();
        pincel.fillStyle = "#FAEBD7";
        pincel.fillRect(0, 0, canvas.width, canvas.height);

        pincel.fillStyle = "black";
        pincel.textAlign = "center";
        pincel.font = "25px arial";
        pincel.fillText("Ganaste el juego " , (canvas.width/2), 2*(canvas.height/6));
        pincel.fillText("la palabra era: " , (canvas.width/2), 3*(canvas.height/6));
        pincel.fillStyle = "green";
        pincel.fillText(palabraActual, (canvas.width/2), 4*(canvas.height/6));
    }
    //console.log("cantidad letras incorrectas "+cantLetrasIncorrectas);
    //console.log("cantidad letras adivinadas "+letrasAdivinadas.length);
    //console.log("cantidad letras palabra secreta  "+palabraActual.length);
    if (cantLetrasIncorrectas != partesDibujo && letrasAdivinadas.length == palabraActual.length) {
        mostrarGanoJuego();
        inputLetras.disabled = true;
    }
}