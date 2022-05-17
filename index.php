<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interfaz</title>
    <link href="style.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>

<body>
    <div id="chat" class="contenedor-chat">
        <div class="encabezado-chat">
            <p>Bot UG</p>
            <a id="btn-cerrar" class="btn-cerrar"><i class="fa fa-angle-down" aria-hidden="true"></i></a>
        </div>
        <div class="contenedor-busqueda">
            <form id="form-busqueda" role="search">
                <input type="search" id="texto-busqueda" placeholder="Buscar..">
                <button type="submit" id="btn-buscar">
                    <svg viewBox="0 0 1024 1024">
                        <path class="path1"
                            d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z">
                        </path>
                    </svg>
                </button>
            </form>
        </div>
        <div id="contenedor-mensajes" class="contenedor-mensajes">

        </div>
        <div class="contenedor-reinicio">
            <p id='btn-reiniciar'>Reinciar el chat</p>
        </div>
    </div>
    <div id="btn-mensaje" class="btn-mensaje">
        <a class="icono-mensaje"><i class="fa fa-comment" aria-hidden="true"></i></a>
    </div>

    <script src="app.js"></script>
</body>

</html>