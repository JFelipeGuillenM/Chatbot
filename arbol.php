<?php
    include('conexion.php');

    $hijoQuery=htmlspecialchars($_GET['hijo']);

    $texto=htmlspecialchars($_GET['busqueda']);
    
    if ($texto != '')
        $query = "SELECT *, (SELECT COUNT(*) FROM principal where padre = p.id_principal) as cant_hijos FROM principal p WHERE p.id_tipo = 2 AND p.contenido LIKE '%$texto%' ";
    else
        $query = 'SELECT *, (SELECT COUNT(*) FROM principal where padre = p.id_principal) as cant_hijos FROM principal p WHERE padre = '.$hijoQuery.' ';
    


    $result = mysqli_query($conexion, $query);

    if(!$result){
        die('el query falló'.mysqli_error($conexion));
    }


    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'id_principal' => $row['id_principal'],
            'id_tipo' => $row['id_tipo'],
            'padre' => $row['padre'],
            'contenido' => $row['contenido'],
            'conector' => $row['conector'],
            'cant_hijos' => $row['cant_hijos'],
        );
    }

 
    $jsonstring = json_encode($json);
    echo $jsonstring; 
?>
