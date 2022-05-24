DELIMITER //
DROP PROCEDURE IF EXISTS ListarMsgs;

CREATE DEFINER=`` PROCEDURE `ListarMsgs`(Hijo int)
begin
    SELECT *, (SELECT COUNT(*) FROM principal where Padre = p.IdPrincipal) as cant_hijos FROM principal p WHERE Padre = Hijo AND Estado = 1;
END

END //