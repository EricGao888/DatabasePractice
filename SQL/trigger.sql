 CREATE TRIGGER No_Overlap
 BEFORE INSERT OR UPDATEE OF StartDate AND EndDate ON EmpProject
 	FOR EACH ROW
 	DECLARE cnt number;
 	BEGIN
 	SELECT COUNT(EmpId) INTO :cnt FROM EmpProject 
 	WHERE EmpId = :new.EmpId AND 
 	(EndDate IS NULL AND StartDate < :new.EndDate) OR 
 	(EndDate IS NOT NULL AND EndDate > :new.StartDate AND StartDate < :new.EndDate)
 	IF (:cnt > 0)
 	THEN rasie_application_error(-20601,"Overlapping!")
 	END IF;
 	END

CREATE TRIGGER Same_Dept
BEFORE INSERT OR UPDATEE OF StartDate AND EndDate ON EmpProject
	FOR EACH ROW
 	DECLARE cnt number;
 	BEGIN
 	SELECT COUNT(*) INTO :cnt FROM ProjectManager, Employee
 	WHERE ProjId = :new.ProjId AND MgrId = EmpId AND DeptId != 
 	(SELECT DeptId FROM Employee WHERE EmpId = :new.EmpId)
 	IF (:cnt > 0)
 	THEN rasie_application_error(-20601,"Not Same Department With Manager!")
 	END IF;
 	END

 ALTER TRIGGER No_Overlap, Same_Dept ENABLE;