$(document).ready(function () {
    //fetchMensajes(0, null,0, '');

    $(function(){
        $('#btn-mensaje').on('click',function(){  
            $('#chat').fadeIn();
            $('#btn-mensaje').hide();
        });
    })
    $(function(){
        $('#btn-cerrar').on('click',function(){  
            $('#chat').fadeOut();
            $('#btn-mensaje').fadeIn();
        });
    })
    $(function(){
        $('#btn-reiniciar').on('click',function(){  
            //$('#contenedor-mensajes').empty();

            // agregar validacion que tenga texto

            fetchMensajes(0, null,0, 'vincu');
        });
    })
})

function fetchMensajes(id, conector, hijos, texto){
    
    if (conector != null && conector != '' && hijos > 0){
        let con = `<div class="mensaje" ><p>${conector}</p></div>`
        $('#contenedor-mensajes').append(con);
    }

    $.ajax({
        async: false,
        data: {hijo: id, busqueda: texto},
        url: 'arbol.php',
        type: 'GET',
        cache: false,
        dataType: 'JSON',
        success: function (response) {

            $("#"+id+"").css({"pointer-events": "none"});
            
            var datos = JSON.stringify(response);
            var parsed = JSON.parse(datos);

            let template = '';

            $.each(parsed, function(i, item) {

                if (item.id_tipo == 1 && item.padre == 0)
                {
                    template += `<div class="mensaje" id="${item.id_principal}" onclick="fetchMensajes(${item.id_principal},'${item.conector}',${item.cant_hijos},'')"><p>${item.contenido}</p></div>`
                } 

                if (item.id_tipo == 1 && item.padre != 0)
                {
                    template += `<div class="opcion" id="${item.id_principal}" ><p>${item.contenido}</p></div>`
                } 

                if (item.id_tipo == 2)
                {
                    template += `<div class="opcion" id="${item.id_principal}" onclick="fetchMensajes(${item.id_principal},'${item.conector}',${item.cant_hijos},'')"><p>${item.contenido}</p></div>`
                } 

            });
            $('#contenedor-mensajes').append(template);
        },
        error: function (data) {
            console.log(data)
        }
    })
}


