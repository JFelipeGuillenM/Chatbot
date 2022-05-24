<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interfaz</title>
    <link href="src/css/style.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
</head>

<body>
    <div id="chat" class="contenedor-chat">
        <div class="encabezado-chat">
            <img class="robot-encabezado" src="src/img/robot.svg">
            <p class="texto-encabezado">Asistente virtual UG</p>
            <div id="circulo-activo" class="circulo-activo"></div>
            <a id="btn-cerrar" class="btn-cerrar"><i class="fa fa-angle-down" aria-hidden="true"></i></a>
        </div>
        <div class="contenedor-busqueda">
            <form id="form-busqueda" role="search">
                <input type="search" id="texto-busqueda" placeholder="Buscar..">
                <button type="submit" id="btn-buscar">
                    <a id="icono-buscar" class="icono-bucar">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </a>
                </button>
            </form>
        </div>
        <div id="contenedor-mensajes" class="contenedor-mensajes">

        </div>
        <div class="contenedor-reinicio">
            <p id='btn-reiniciar'>Volver a preguntar</p>
        </div>
    </div>
    <div id="btn-mensaje" class="btn-mensaje">
        <a class="icono-mensaje"><i class="fa fa-comment" aria-hidden="true"></i></a>
    </div>
    <div id="contenedor-popup" class="contenedor-popup">
        <p class="texto-popup">Asistente virtual UG</p>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="src/js/app.js"></script>
</body>

</html>