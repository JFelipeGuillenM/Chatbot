$(document).ready(function () {
    fetchMensajes(0, null,0, '',1);

})

$(function(){
    $('#btn-mensaje').on('click',function(){  
        $('#chat').fadeIn();
        $('#btn-mensaje').hide();
        $('#contenedor-popup').hide();
    });
})
$(function(){
    $('#btn-cerrar').on('click',function(){  
        $('#chat').fadeOut();
        $('#btn-mensaje').fadeIn();
        $('#contenedor-popup').fadeIn();
    });
})
$(function(){
    $('#contenedor-popup').on('click',function(){  
        $('#chat').fadeIn();
        $('#btn-mensaje').hide();
        $('#contenedor-popup').hide();
    });
})
$(function(){
    $('#btn-reiniciar').on('click',function(){  
        $('#contenedor-mensajes').empty();
        fetchMensajes(0, null,0, '');
    });
})

$('#form-busqueda').submit(function(e){
    if($('#texto-busqueda').val()!=''){
        $('#contenedor-mensajes').empty();
        fetchMensajes(0, null,0, '');
        let texto = $('#texto-busqueda').val();
        fetchMensajes(0, null,0, texto);
        $('.saludo').css({"pointer-events": "none"});
        $('#texto-busqueda').val('');

        e.preventDefault();
    }else{
        $('#texto-busqueda').val('');
        let sinRespuesta = `
        <div class="mensaje-box">
            <div class="mensaje" ><p>No hemos encontrado lo que buscas</p></div>
        </div>    
        `
        $('#contenedor-mensajes').html(sinRespuesta);
    }
    e.preventDefault();
})



function fetchMensajes(id, conector, hijos, texto, tipo){
    var now = new Date(Date.now());

    /*let cargando = document.createElement('div');
    cargando.innerHTML = '<p id="cargando">Escribiendo...</p>';*/
    
    var minutos = now.getMinutes();
    if(minutos < 10 ){
        minutos = "0"+minutos;
    }
    var formatted = now.getHours() + ":" + minutos;
    

    if (conector != null && conector != '' && hijos > 0){
        let con = `
        <div class="mensaje" >
            <p>${conector}</p>
            <p class="hora-mensaje">${formatted}</p>
        </div>`;
        //$('#contenedor-mensajes').append(cargando);
        //setTimeout(function() { $("#cargando").hide(); }, 1000);
        //setTimeout(function() { $("#contenedor-mensajes").append(con).show(); }, 1050);
        $('#contenedor-mensajes').append(con);
    }

    /*if(tipo == 2 && conector == ''){
        let con = `
        <div class="mensaje" >
            <p>Estas son las opciones:</p>
            <p class="hora-mensaje">${formatted}</p>
        </div>`
        $('#contenedor-mensajes').append(con);
    }*/

    


    $.ajax({
        async: false,
        data: {hijo: id, busqueda: texto},
        url: 'arbol.php',
        type: 'GET',
        cache: false,
        dataType: 'JSON',
        success: function (response) {
            $('#circulo-activo').css({"background-color": "#00b118"});
            $("#"+id+"").css({"pointer-events": "none"});
            
            if(id!='1'){
                $("#"+id+"").css({"background-color": "#16664c"});
                $("#"+id+"").toggleClass('seleccionado');
            }

            var datos = JSON.stringify(response);
            var parsed = JSON.parse(datos);
            

            let template = '';

            $.each(parsed, function(i, item) {
                if (item.id_tipo == 1 && item.padre == 0)
                {
                    template += `
                    <div class="mensaje-box">
                        <div class="mensaje saludo" id="${item.id_principal}" onclick="fetchMensajes(${item.id_principal},'${item.conector}',${item.cant_hijos},'',${item.id_tipo})">
                            <p>${item.contenido}</p>
                            <p class="hora-mensaje">${formatted}</p>
                        </div>
                    </div>
                    `
                } 

                if (item.id_tipo == 1 && item.padre != 0)
                {
                    template += `
                    <div class="mensaje-box">
                        <div class="mensaje" id="${item.id_principal}">
                            <p>${item.contenido}</p>
                            <p class="hora-mensaje">${formatted}</p>
                        </div>
                    </div>    
                    `
                   /* $('#contenedor-mensajes').append(cargando);
                    setTimeout(function() { $("#cargando").hide(); }, 1000);*/
                    
                } 

                if (item.id_tipo == 2 && item.cant_hijos>0)
                {
                    template += `
                    <div class="opcion-box">
                        <div class="opcion" id="${item.id_principal}" onclick="fetchMensajes(${item.id_principal},'${item.conector}',${item.cant_hijos},'',${item.id_tipo})">
                            <p>${item.contenido}</p>
                            <p class="hora-opcion">${formatted}</p>
                        </div>
                    </div>`;
                } 

            });
            
            //setTimeout(function() { $("#contenedor-mensajes").append(template).show().scrollTop($('#contenedor-mensajes').height()) }, 1150);
            $('#contenedor-mensajes').append(template).scrollTop($('#contenedor-mensajes').height());
        },
        error: function (data) {
            $('#circulo-activo').css({"background-color": "#f03030"});
            let sinRespuesta = `
                <div class="mensaje-box">
                    <div class="mensaje" ><p>El bot está inaccesible</p></div>
                </div>    
                `
            $('#contenedor-mensajes').append(sinRespuesta);
        }
        
    })
}

