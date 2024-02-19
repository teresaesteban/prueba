
<?php
	// Para evitar el error del CORS Access-Control-Allow-Origin al trabajar con AJAX permitiendo las peticiones desde cualquier dominio.
	header("Access-Control-Allow-Origin: *");
	
	// Recoge en las variables los datos enviados mediante el método HTTP POST.
	$name = $_POST['name'];
	$lastname = $_POST['lastname'];
	
	$mensaje = "<br />La petición se procesó en el servidor.<br />Nombre: ".$name."<br />Apellido: ".$lastname;
	echo $mensaje; // En el caso de una petición AJAX, devuelve una respuesta.
	
	// Imprime el texto en la pantalla con saltos de línea.
	//print("<br />La petición se procesó en el servidor.<br />Nombre: ".$name."<br />Apellido: ".$lastname);
	// Respuesta directa:
	//echo "Prueba";
?>
