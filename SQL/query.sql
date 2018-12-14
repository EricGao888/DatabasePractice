-- Query 1.1
SELECT E.EmpName, D.DeptName, U.UnivName, G.GradYear FROM Employee E,
University U, Department D, Graduate G WHERE E.EmpId = G.EmpId AND E.DeptId = D.DeptId AND
G.UnivId =  U.UnivId; 

-- Query 1.2
SELECT E.EmpName, G.GradYear FROM Employee E, Graduate G WHERE E.EmpId = G.EmpId
AND (SELECT COUNT(DISTINCT EP.ProjId) FROM EmpProject EP WHERE E.EmpId = EP.EmpId) = 1;

-- Query 1.3
SELECT E.EmpName FROM Employee E WHERE E.HomeZipCode = 47906 OR E.HomeZipCode = 47907;

-- Query 1.4
SELECT T2.ProjName FROM 
(SELECT T1.ProjName, COUNT(DISTINCT T1.UnivId) AS UnivNum FROM
(SELECT P.ProjId, P.ProjName, EP.EmpId, G.UnivId From Project P, EmpProject EP, Graduate G
WHERE P.ProjId = EP.ProjId AND EP.EndDate IS NULL AND EP.EmpId = G.EmpId) T1
GROUP BY T1.ProjName) T2 
WHERE T2.UnivNum = 1

-- Query 1.5
SELECT P.ProjName, COUNT(EP2.EmpId) FROM Project P NATURAL LEFT OUTER JOIN 
(SELECT * FROM EmpProject WHERE EndDate IS NULL) EP2 GROUP BY P.ProjName;   

-- Query 1.6
SELECT DeptName, EmpNum FROM
(SELECT D.DeptName, COUNT(E.EmpId) AS EmpNum FROM Department D NATURAL LEFT OUTER JOIN Employee E GROUP BY DeptName) 
ORDER BY EmpNum DESC;

-- Query 1.7
SELECT UnivName FROM (SELECT UnivName, COUNT(DISTINCT MgrId) AS PMNUM FROM University, ProjectManager, Graduate 
WHERE MgrId = EmpId AND Graduate.UnivId = University.UnivId GROUP BY UnivName) WHERE PMNUM >= ALL(SELECT PMNUM FROM (SELECT UnivName, COUNT(DISTINCT MgrId) AS PMNUM FROM University, ProjectManager, Graduate 
WHERE MgrId = EmpId AND Graduate.UnivId = University.UnivId GROUP BY UnivName)) 

-- Query 1.8
SELECT EmpName FROM Employee, Department WHERE Employee.DeptId = Department.DeptId AND Department.DeptName = 'Development' 

-- Query 1.9
SELECT UnivName, GNUM FROM 
(SELECT UnivName, COUNT(EmpId) AS GNUM FROM University, Graduate 
WHERE University.UnivId = Graduate.UnivId AND GradYear >= 2010 GROUP BY UnivName) WHERE GNUM >= 3;

-- Query 1.10
SELECT EmpName FROM Employee, Graduate, University 
WHERE Employee.EmpId = Graduate.EmpId AND Graduate.UnivId = University.UnivId AND UnivName = 'Purdue';

-- Query 1.11
SELECT EmpName FROM Employee, EmpProject, ProjectManager PM WHERE
Employee.EmpId = EmpProject.EmpId AND PM.ProjId = EmpProject.ProjId 
AND EmpProject.EndDate IS NULL AND PM.EndDate IS NULL AND Employee.HomeZipCode = 
(SELECT HomeZipCode FROM Employee WHERE EmpId = PM.MgrId);

-- Query 1.12
SELECT ProjName FROM 
(SELECT ProjName, COUNT(DISTINCT EmpId) AS ENUM FROM
(SELECT ProjName, EmpId FROM Project, EmpProject WHERE Project.ProjId = EmpProject.ProjId AND EndDate IS NULL)
GROUP BY ProjName) WHERE ENUM >= 2

-- Query 1.13
SELECT EmpId, EmpName, COUNT(DISTINCT ProjId), AVG(EndDate - StartDate) FROM Employee NATURAL LEFT OUTER JOIN EmpProject GROUP BY EmpId, EmpName;

-- Query 1.14
SELECT ProjName, EmpName FROM Project, Employee, ProjectManager PM 
WHERE Project.ProjId = PM.ProjID AND EmpId = PM.MgrId AND (PM.EndDate - PM.StartDate) >= 
ALL(SELECT (EndDate - StartDate) FROM ProjectManager WHERE ProjId = PM.ProjId AND EndDate IS NOT NULL)；

-- Query 1.15
SELECT EmpName FROM Employee, EmpProject, ProjectManager WHERE 
Employee.EmpId = MgrId AND EmpProject.ProjId = ProjectManager.ProjId AND EmpProject.EmpId = MgrId 
AND ProjectManager.EndDate IS NULL AND ProjectManager.StartDate != EmpProject.StartDate;
