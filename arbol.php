<?php
    include('conexion.php');

    $hijoQuery=htmlspecialchars($_GET['hijo']);

    $texto=htmlspecialchars($_GET['busqueda']);
    
    if ($texto != ''){
        $query = "CALL Buscar('$texto')";
    }else{
        $query = "CALL ListarMsgs('$hijoQuery')";
        //$query = 'SELECT *, (SELECT COUNT(*) FROM principal where Padre = p.IdPrincipal) as cant_hijos FROM principal p WHERE Padre = '.$hijoQuery.' AND Estado = 1';
    }
        
    
    $result = mysqli_query($conexion, $query);

    if(!$result){
        die('el query falló'.mysqli_error($conexion));
    }


    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'id_principal' => $row['IdPrincipal'],
            'id_tipo' => $row['IdTipo'],
            'padre' => $row['Padre'],
            'contenido' => $row['Contenido'],
            'conector' => $row['Conector'],
            'cant_hijos' => $row['cant_hijos'],
        );
    }

 
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>
 


