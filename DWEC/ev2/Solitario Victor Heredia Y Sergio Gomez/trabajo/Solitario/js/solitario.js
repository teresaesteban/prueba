/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos:
let palos = ["ova", "cua", "hex", "cir"];
// Array de número de cartas:
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [9, 10, 11, 12];

// Paso (top y left) en pixeles de una carta a la siguiente en un mazo:
let paso = 5;
var emisor;


// Mazos
var mazo_inicial = [];
var mazo_aux = [];
var mazo_sobrantes = [];
var mazo_receptor1 = [];
var mazo_receptor2 = [];
let mazo_receptor3 = [];
var mazo_receptor4 = [];

// Contadores de cartas
var cont_inicial = document.getElementById("contador_inicial");
var cont_sobrantes = document.getElementById("cont_sobrantes");
var cont_receptor1 = document.getElementById("cont_receptor1");
var cont_receptor2 = document.getElementById("cont_receptor2");
var cont_receptor3 = document.getElementById("cont_receptor3");
var cont_receptor4 = document.getElementById("cont_receptor4");
var cont_movimientos = document.getElementById("cont_movimientos");

// Tiempo
let cont_tiempo = document.getElementById("cont_tiempo"); // span cuenta tiempo
let segundos = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/


// Rutina asociada a boton reset: comenzar_juego
//document.getElementById("reset").onclick = comenzar_juego;

// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/

// Desarrollo del comienzo del juego
function comenzar_juego() {
	cont_inicial = document.getElementById("contador_inicial");
	cont_sobrantes = document.getElementById("contador_sobrantes");
	cont_receptor1 = document.getElementById("contador_receptor1");
	cont_receptor2 = document.getElementById("contador_receptor2");
	cont_receptor3 = document.getElementById("contador_receptor3");
	cont_receptor4 = document.getElementById("contador_receptor4");
	cont_movimientos = document.getElementById("contador_movimientos");
	/* Crear baraja, es decir crear el mazo_inicial. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles "for", bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero "png" que contiene a la carta (recuérdese poner
	el "path" correcto en la URL asociada al atributo "src" de <img>). Una vez creado
	el elemento <img>, inclúyase como elemento del array "mazo_inicial". 
	*/

	/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
	mazo_inicial = [
		'./imagenes/baraja/1-cir.png', './imagenes/baraja/1-cua.png', './imagenes/baraja/1-hex.png', './imagenes/baraja/1-ova.png',
		'./imagenes/baraja/2-cir.png', './imagenes/baraja/2-cua.png', './imagenes/baraja/2-hex.png', './imagenes/baraja/2-ova.png',
		'./imagenes/baraja/3-cir.png', './imagenes/baraja/3-cua.png', './imagenes/baraja/3-hex.png', './imagenes/baraja/3-ova.png',
		'./imagenes/baraja/4-cir.png', './imagenes/baraja/4-cua.png', './imagenes/baraja/4-hex.png', './imagenes/baraja/4-ova.png',
		'./imagenes/baraja/5-cir.png', './imagenes/baraja/5-cua.png', './imagenes/baraja/5-hex.png', './imagenes/baraja/5-ova.png',
		'./imagenes/baraja/6-cir.png', './imagenes/baraja/6-cua.png', './imagenes/baraja/6-hex.png', './imagenes/baraja/6-ova.png',
		'./imagenes/baraja/7-cir.png', './imagenes/baraja/7-cua.png', './imagenes/baraja/7-hex.png', './imagenes/baraja/7-ova.png',
		'./imagenes/baraja/8-cir.png', './imagenes/baraja/8-cua.png', './imagenes/baraja/8-hex.png', './imagenes/baraja/8-ova.png',
		'./imagenes/baraja/9-cir.png', './imagenes/baraja/9-cua.png', './imagenes/baraja/9-hex.png', './imagenes/baraja/9-ova.png',
		'./imagenes/baraja/10-cir.png', './imagenes/baraja/10-cua.png', './imagenes/baraja/10-hex.png', './imagenes/baraja/10-ova.png',
		'./imagenes/baraja/11-cir.png', './imagenes/baraja/11-cua.png', './imagenes/baraja/11-hex.png', './imagenes/baraja/11-ova.png',
		'./imagenes/baraja/12-cir.png', './imagenes/baraja/12-cua.png', './imagenes/baraja/12-hex.png', './imagenes/baraja/12-ova.png'];
	// Barajar
	barajar(mazo_inicial);
	// Dejar mazo_inicial en tapete inicial
	cargar_tapete_inicial(mazo_inicial);

	// Puesta a cero de contadores de mazos
	set_contador(cont_sobrantes, 0);
	set_contador(cont_receptor1, 0);
	set_contador(cont_receptor2, 0);
	set_contador(cont_receptor3, 0);
	set_contador(cont_receptor4, 0);
	set_contador(cont_movimientos, 0);
	set_contador(cont_inicial, mazo_inicial.length);

	// Arrancar el conteo de tiempo
	arrancar_tiempo();
} // comenzar_juego


/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a "clearInterval" en su caso.   
*/

function arrancar_tiempo() {
	/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
	let cont_tiempo = document.getElementById("cont_tiempo"); // span cuenta tiempo
	let segundos = 0;    // cuenta de segundos
	let temporizador = null; // manejador del temporizador
	if (temporizador) clearInterval(temporizador);
	let hms = function () {

		let seg = Math.trunc(segundos % 60);
		let min = Math.trunc((segundos % 3600) / 60);
		let hor = Math.trunc((segundos % 86400) / 3600);
		let tiempo = ((hor < 10) ? "0" + hor : "" + hor)
			+ ":" + ((min < 10) ? "0" + min : "" + min)
			+ ":" + ((seg < 10) ? "0" + seg : "" + seg);
		set_contador(cont_tiempo, tiempo);
		segundos++;
	}
	segundos = 0;
	hms(); // Primera visualización 00:00:00
	temporizador = setInterval(hms, 1000);


} // arrancar_tiempo


/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
	Para reordenar el array puede emplearse el siguiente pseudo código:

	- Recorramos con i todos los elementos del array
		- Sea j un indice cuyo valor sea un número aleatorio comprendido 
			entre 0 y la longitud del array menos uno. Este valor aleatorio
			puede conseguirse, por ejemplo con la instrucción JavaScript
				Math.floor( Math.random() * LONGITUD_DEL_ARRAY );
		- Se intercambia el contenido de la posición i-ésima con el de la j-ésima

*/
function barajar(mazo) {
	/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
	for (let i = 0; i <= mazo.length - 1; i++) {
		j = Math.floor(Math.random() * mazo.length);
		[mazo[i], mazo[j]] = [
			mazo[j], mazo[i]];
	};
} // barajar



/**
	  En el elemento HTML que representa el tapete inicial (variable tapete_inicial)
	se deben añadir como hijos todos los elementos <img> del array "mazo".
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas "top" y "left", algun atributo de tipo "data-", etc.
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function cargar_tapete_inicial(mazo) {
	/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! **/
	paso = 0
	let carta;
	for (let i = 0; i <= mazo.length - 1; i++) {
		carta = document.createElement("img");
		carta.setAttribute("id", i);
		carta.setAttribute("src", mazo[i]);
		carta.setAttribute("width", "50");
		carta.setAttribute("height", "50");
		carta.setAttribute("style", "top:" + paso + "px; left:" + paso + "px;");
		carta.setAttribute("draggable", "false");
		carta.setAttribute("ondragsdtart", "drag(event)");
		tapete_inicial = document.getElementById("inicial");
		tapete_inicial.appendChild(carta);
		paso = paso + 11
	}

	carta.draggable = true;


} // cargar_tapete_inicial


/**
	  Esta función debe incrementar el número correspondiente al contenido textual
		  del elemento que actúa de contador
*/
function inc_contador(contador) {
	contador.innerHTML = +contador.innerHTML + 1;
} // inc_contador

/**
	Idem que anterior, pero decrementando 
*/
function dec_contador(contador) {
	/*** !!!!!!!!!!!!!!!!!!! CÓDIGO !!!!!!!!!!!!!!!!!!!! ***/
	contador.innerHTML = +contador.innerHTML - 1;
} // dec_contador

/**
	Similar a las anteriores, pero ajustando la cuenta al valor especificado
*/
function set_contador(contador, valor) {
	//contador  = document.getElementById("cont_tiempo");
	contador.innerHTML = valor;
} // set_contador


// Desarrollo de la continuación del juego
// Funciones drag & drop
function allowDrop(event) {
	let objetivo = event.target.id;
	let procedencia = document.getElementById(emisor).parentElement.id;

	if (objetivo == "receptor1" || objetivo == "receptor2" || objetivo == "receptor3" || objetivo == "receptor4" || (objetivo == "sobrantes" && procedencia != "sobrantes")) {
		event.preventDefault();
	}

}
function drag(event) {
	event.dataTransfer.setData("text", event.target.id);
	emisor = event.target.id;
}

function drop(event) {
	let procedencia = document.getElementById(emisor).parentElement.id;
	let data = event.dataTransfer.getData("text");
	let objetivo = event.target.id;
	cont_movimientos = document.getElementById("contador_movimientos");
	event.preventDefault();

	let carta_nombre = document.getElementById(data).src.substr(-10, 5);
	carta_nombre = carta_nombre.replace("/", "");
	let numero_simbolo = carta_nombre.split("-")
	let color_emisor;
	let color_receptor;
	let numero_siguiente;
	let mover = false;
	if (numero_simbolo[1] == "ci" || numero_simbolo[1] == "he") {
		color_emisor = "gris"
	} else {
		color_emisor = "naranja"
	}
	let numero = numero_simbolo[0];


	switch (objetivo) {
		case "receptor1":

			carta_receptor = mazo_receptor1[mazo_receptor1.length - 1];

			if (carta_receptor) {
				numero_simbolo = mazo_receptor1[mazo_receptor1.length - 1].split("-")
				if (numero_simbolo[1] == "ci" || numero_simbolo[1] == "he") {
					color_receptor = "gris"
				} else {
					color_receptor = "naranja"
				}
			}

			numero_siguiente = numero;
			numero_siguiente++;
			if (mazo_receptor1.length == 0 && numero == 12 || mazo_receptor1.length != 0 && color_emisor
				!= color_receptor && numero_siguiente == numero_simbolo[0]) {
				mazo_receptor1.push(carta_nombre);
				inc_contador(cont_receptor1)
				document.getElementById(data).draggable = false;
				inc_contador(cont_movimientos)
				event.target.appendChild(document.getElementById(data));
				mover = true;

			}

			break;

		case "receptor2":

			carta_receptor = mazo_receptor2[mazo_receptor2.length - 1];

			if (carta_receptor) {
				numero_simbolo = mazo_receptor2[mazo_receptor2.length - 1].split("-")
				if (numero_simbolo[1] == "ci" || numero_simbolo[1] == "he") {
					color_receptor = "gris"
				} else {
					color_receptor = "naranja"
				}
			}
			numero_siguiente = numero;
			numero_siguiente++;
			if (mazo_receptor2.length == 0 && numero == 12 || mazo_receptor2.length != 0 && color_emisor
				!= color_receptor && numero_siguiente == numero_simbolo[0]) {
				mazo_receptor2.push(carta_nombre);
				inc_contador(cont_receptor2)
				document.getElementById(data).draggable = false;
				inc_contador(cont_movimientos)
				event.target.appendChild(document.getElementById(data));
				mover = true;
			}
			break;

		case "receptor3":

			carta_receptor = mazo_receptor3[mazo_receptor3.length - 1];

			if (carta_receptor) {
				numero_simbolo = mazo_receptor3[mazo_receptor3.length - 1].split("-")
				if (numero_simbolo[1] == "ci" || numero_simbolo[1] == "he") {
					color_receptor = "gris"
				} else {
					color_receptor = "naranja"
				}
			}
			numero_siguiente = numero;
			numero_siguiente++;
			if (mazo_receptor3.length == 0 && numero == 12 || mazo_receptor3.length != 0 && color_emisor
				!= color_receptor && numero_siguiente == numero_simbolo[0]) {
				mazo_receptor3.push(carta_nombre);
				inc_contador(cont_receptor3)
				document.getElementById(data).draggable = false;
				inc_contador(cont_movimientos)
				event.target.appendChild(document.getElementById(data));
				mover = true;
			}
			break;

		case "receptor4":

			carta_receptor = mazo_receptor4[mazo_receptor4.length - 1];

			if (carta_receptor) {
				numero_simbolo = mazo_receptor4[mazo_receptor4.length - 1].split("-")
				if (numero_simbolo[1] == "ci" || numero_simbolo[1] == "he") {
					color_receptor = "gris"
				} else {
					color_receptor = "naranja"
				}
			}
			numero_siguiente = numero;
			numero_siguiente++;
			if (mazo_receptor4.length == 0 && numero == 12 || mazo_receptor4.length != 0 && color_emisor
				!= color_receptor && numero_siguiente == numero_simbolo[0]) {
				mazo_receptor4.push(carta_nombre);
				inc_contador(cont_receptor4)
				document.getElementById(data).draggable = false;
				inc_contador(cont_movimientos)
				event.target.appendChild(document.getElementById(data));
				mover = true;
			}
			break;

		case "sobrantes":

			mazo_sobrantes.push(data);
			inc_contador(cont_sobrantes)
			inc_contador(cont_movimientos)
			event.target.appendChild(document.getElementById(data));
			mazo_sobrantes.push(carta_nombre);
			mazo_aux.push(mazo_inicial[mazo_inicial.length - 1]);
			mover = true;
			break;

	}



	if (procedencia == "sobrantes" && mover) {
		mazo_sobrantes.pop();
		mazo_aux.pop();
		dec_contador(cont_sobrantes)
	}

	if (objetivo != "sobrantes" && mover) {
		document.getElementById(data).draggable = false;

	}
	if (procedencia == "inicial" && mover) {
		mazo_inicial.pop();
		document.getElementById(procedencia).lastElementChild.draggable = true;
		dec_contador(cont_inicial)
		if (mazo_inicial.length == 0 && mazo_sobrantes.length != 0) {
			set_contador(cont_sobrantes, 0);
			mazo_inicial = mazo_aux;
			mazo_sobrantes = [];
			mazo_aux = [];
			set_contador(cont_inicial, mazo_inicial.length);
			barajar(mazo_inicial);
			cargar_tapete_inicial(mazo_inicial);
			var e = document.getElementById("sobrantes");

			var child = e.lastElementChild;
			while (child) {
				child = e.lastElementChild;
				if (child.id != "contador_sobrantes" && child) {
					e.removeChild(child);
				} else if (child.id == "contador_sobrantes") {
					child = null;
				}

			}
		}
	}

	if (mazo_inicial.length == 0 && mazo_sobrantes.length == 0) {
		alert("Ha finalizado la partida, has realizado " + cont_movimientos.innerHTML + " durante " + document.getElementById("cont_tiempo").innerHTML);
		var marcadores = document.getElementById("marcadores");
		var carta= document.createElement("video");
		carta.autoplay="true"
		carta.loop="true"
		carta.setAttribute("src", "./imagenes/Mono.mp4");
		tapete_inicial = document.getElementById("inicial");
		tapete_inicial.appendChild(carta);
		new Audio('./imagenes/Audio.mp3').play()
		if (mazo_inicial.length === 0 && mazo_sobrantes.length === 0) {
		  marcadores.style.display = "none";
		} else {
		  marcadores.style.display = "block";
	}
}
}

