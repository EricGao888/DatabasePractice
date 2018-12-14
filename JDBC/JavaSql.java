import java.sql.*;
import java.util.*;



public class JavaSql {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Please type in username: ");
        String username = input.nextLine();
//        System.out.println(username);

        System.out.println("Please type in password: ");
        String passwd = input.nextLine();
//        System.out.println(passwd);

        System.out.println("Please type in the ID of the employee: ");
        int empID = input.nextInt();
        String driverName = "oracle.jdbc.driver.OracleDriver";


        try {
            // Load the JDBC Driver
            Class.forName(driverName); // Must be write in try
            Connection con = DriverManager.getConnection( "jdbc:oracle:thin:@claros.cs.purdue.edu:1524:strep", username, passwd);
            // Make connection
            System.out.println("Access Established Successfully...\n");
//            Statement stmt = conn.createStatement();
            Statement stmt = con.createStatement();
            String query1 = "SELECT EmpName, DeptName, HomeZipCode FROM Employee, Department " +
                    "WHERE Employee.DeptId = Department.DeptId AND EmpId = " + Integer.toString(empID);
            ResultSet rs1 = stmt.executeQuery(query1);
            System.out.println("Print the answer of question 3.1: ");
            while (rs1.next()) {
             System.out.print(rs1.getString(1) + "\t");
             System.out.print(rs1.getString(2) + "\t");
             System.out.print(rs1.getInt(3) + "\t");
             System.out.print("\n");
            }
            System.out.print("\n");

            String query2 = "SELECT COUNT(DISTINCT ProjId) FROM EmpProject WHERE EmpId = " + Integer.toString(empID);
            ResultSet rs2 = stmt.executeQuery(query2);
            System.out.println("Print the answer of question 3.2: ");
            while (rs2.next()) {
                System.out.print(rs2.getInt(1));
                System.out.print("\n");
            }
            System.out.print("\n");


            String query3 = "SELECT COUNT(DISTINCT MgrId) FROM ProjectManager, Employee WHERE " +
            "MgrId = Employee.EmpId AND Employee.DeptId = (SELECT DeptId FROM Employee WHERE Employee.EmpId = "+
                    Integer.toString(empID)+")";
            ResultSet rs3 = stmt.executeQuery(query3);
            System.out.println("Print the answer of question 3.3: ");
            while (rs3.next()) {
                System.out.print(rs3.getInt(1));
                System.out.print("\n");
            }
            System.out.print("\n");

            System.out.println("Process update operation of question 3.4 Successfully!");
            con.setAutoCommit(false);
            String update = "UPDATE Graduate SET GradYear = GradYear - 5";
            PreparedStatement pst1 = con.prepareStatement(update);
            pst1.executeUpdate();
            con.commit();

            System.out.print("\n");


//            String queryTest = "SELECT * FROM GRADUATE";
//            ResultSet rsTest = stmt.executeQuery(queryTest);
//            System.out.println("Test: ");
//            while (rsTest.next()) {
//                System.out.print(rsTest.getInt(1) + "\t");
//                System.out.print(rsTest.getInt(2) + "\t");
//                System.out.print(rsTest.getInt(3) + "\t");
//                System.out.print("\n");
//            }
//            System.out.print("\n");

            System.out.println("Process delete operation of question 3.5 Successfully!");
            con.setAutoCommit(false);

            String query5 = "SELECT DISTINCT ProjId FROM EmpProject WHERE EmpId = "+Integer.toString(empID);
            ResultSet rs5 = stmt.executeQuery(query5);
            ArrayList<Integer> projectList = new ArrayList<Integer>();
            while (rs5.next()) {
                projectList.add(rs5.getInt(1));
            }


            String delete = "DELETE FROM ProjectManager WHERE MgrId = "+Integer.toString(empID);
            PreparedStatement pst2 = con.prepareStatement(delete);
            pst2.executeUpdate();
            con.commit();

            delete = "DELETE FROM EmpProject WHERE EmpId = "+Integer.toString(empID);
            pst2 = con.prepareStatement(delete);
            pst2.executeUpdate();
            con.commit();

            delete = "DELETE FROM Graduate WHERE EmpId = "+Integer.toString(empID);
            pst2 = con.prepareStatement(delete);
            pst2.executeUpdate();
            con.commit();

            delete = "DELETE FROM Employee WHERE EmpId = "+Integer.toString(empID);
            pst2 = con.prepareStatement(delete);
            pst2.executeUpdate();
            con.commit();

            System.out.print("\n");

            for(int i = 0; i < projectList.size(); i++){
                delete = "DELETE FROM ProjectManager WHERE ProjId = "+Integer.toString(projectList.get(i));
                pst2 = con.prepareStatement(delete);
                pst2.executeUpdate();
                con.commit();

                delete = "DELETE FROM EmpProject WHERE ProjId = "+Integer.toString(projectList.get(i));
                pst2 = con.prepareStatement(delete);
                pst2.executeUpdate();
                con.commit();

                delete = "DELETE FROM Project WHERE ProjId = "+Integer.toString(projectList.get(i));
                pst2 = con.prepareStatement(delete);
                pst2.executeUpdate();
                con.commit();
            }

        } catch (ClassNotFoundException e) {
            // TODO catch
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO catch
            e.printStackTrace();
        }



    }

}
