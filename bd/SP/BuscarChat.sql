DELIMITER //
DROP PROCEDURE IF EXISTS Buscar;
CREATE PROCEDURE Buscar(
	texto varchar(255)
)

BEGIN
	DECLARE Consulta varchar(50) DEFAULT CONCAT('%', texto, '%');
	DECLARE Listo BOOLEAN DEFAULT FALSE;
	DECLARE _IdPrincipal int(11);
	DECLARE _IdTipo int(11) DEFAULT NULL;
	DECLARE _Nombre varchar(50) DEFAULT NULL;
	DECLARE _Padre int(11) DEFAULT NULL;
	DECLARE _Contenido varchar(500) DEFAULT NULL;
	DECLARE _Conector varchar(255);
    DECLARE val INT default 125;
    DECLARE val0 INT default 0;
    DECLARE val1 INT default -1;
    DECLARE val_index INT default 0;
    DECLARE val_Padre INT default -1;

	DECLARE micursor CURSOR FOR SELECT p.IdPrincipal, p.IdTipo, p.Nombre, p.Padre, p.Contenido, p.Conector FROM principal p WHERE p.Estado = 1 AND p.IdTipo = 2 AND p.Contenido LIKE Consulta GROUP BY p.IdPrincipal;
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET Listo = true;
    
    DROP table if exists tmp_tabla; 
    DROP table if exists tmp_tabla1; 
    DROP table if exists tmp_tabla2; 
    DROP table if exists tmp_tabla3; 

    CREATE TEMPORARY TABLE tmp_tabla(IdPrincipal int(11), IdTipo int(11), Nombre varchar(50), Padre int(11), 
    Contenido varchar(500), Conector varchar(255), grupo int(11), id_ int(11));
    
    CREATE TEMPORARY TABLE tmp_tabla1(IdPrincipal int(11), IdTipo int(11), Nombre varchar(50), Padre int(11), 
    Contenido varchar(500), Conector varchar(255), grupo int(11), id_ int(11));
    
    CREATE TEMPORARY TABLE tmp_tabla2(IdPrincipal int(11), IdTipo int(11), Nombre varchar(50), Padre int(11), 
    Contenido varchar(500), Conector varchar(255), grupo int(11), id_ int(11));
    
    CREATE TEMPORARY TABLE tmp_tabla3(IdPrincipal int(11), IdTipo int(11), Nombre varchar(50), Padre int(11), 
    Contenido varchar(500), Conector varchar(255), grupo int(11), id_ int(11), cant_hijos int(11));
    
    OPEN micursor;
		
		miloop: LOOP
			FETCH micursor into _IdPrincipal, _IdTipo, _Nombre, _Padre, _Contenido, _Conector;
				SET val0 = val0 + 1;
				IF Listo THEN LEAVE miloop;
				END IF;
                SET val = _IdPrincipal;
				#DELETE from `tabla1`;
                miloop2: LOOP
					insert into `tmp_tabla1` Select IdPrincipal, IdTipo, Nombre, Padre, Contenido, Conector, val0, val_index
						FROM principal p WHERE
							Estado = 1 AND
                            p.IdPrincipal = val AND 
                            p.IdTipo = 2 AND
                            p.Contenido LIKE Consulta GROUP BY p.IdPrincipal;
                    #insert into `tmp_tabla2` (IdPrincipal, id_) value(val, val_index);
                    SET val_index = val_index + 1;
					IF val <= 0 THEN
						LEAVE miloop2;
					END IF;
					Select p.Padre INTO val FROM principal p WHERE Estado = 1 AND p.IdPrincipal = val;
                END LOOP miloop2;
                Select MAX(s.id_) INTO val1 FROM `tmp_tabla1` s;
                insert into `tmp_tabla2` SELECT * FROM `tmp_tabla1` p WHERE p.id_ = (val1);
                #insert into `tmp_tabla` (IdPrincipal, IdTipo, Nombre, Padre, Contenido, Conector, grupo) VALUES(IdPrincipal, IdTipo, Nombre, Padre, Contenido, Conector, val0);
				
		END LOOP miloop;
    CLOSE micursor;
    
    insert into `tmp_tabla3` 	Select *, (
										SELECT COUNT(*) FROM principal s
										where s.Padre = p.IdPrincipal
									) as cant_hijos
							FROM `tmp_tabla2` p GROUP BY p.IdPrincipal;
 
    Select * From tmp_tabla3;
    #SELECT * FROM principal p WHERE p.IdTipo = 2 AND p.Contenido LIKE '%vincu%' GROUP BY p.IdPrincipal;
END;
END//