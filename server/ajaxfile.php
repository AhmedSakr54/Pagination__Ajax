<?php
include_once "dbh.php";

if(isset($_POST)) {
    $pageNumber = $_POST['pageNumber'];
    $rowsPerPage = $_POST['coursesPerPage'];
    $searchedFor = $_POST['searchedFor'];

    $pageLimit = $pageNumber*$rowsPerPage;
    $return_arr = array();

    $query =   "SELECT C.course_name, C.course_description, D.department_name, P.professor_name
                FROM course C, department D, professor P
                WHERE (C.professor_id = P.professor_id AND C.department_id = D.department_id) AND (REPLACE(C.course_name, ' ','') LIKE REPLACE('%$searchedFor%', ' ','')    OR REPLACE(C.course_description,' ','') LIKE REPLACE('%$searchedFor%', ' ','') OR REPLACE(P.professor_name,' ','') LIKE REPLACE('%$searchedFor%', ' ','')  OR REPLACE(D.department_name,' ','') LIKE REPLACE('%$searchedFor%', ' ',''))
                LIMIT $pageLimit,$rowsPerPage;";

    $result = mysqli_query($conn, $query);

    while ($row = mysqli_fetch_array($result)) {
        $Cname = $row['course_name'];
        $Cdesc = $row['course_description'];
        $DepName = $row['department_name'];
        $ProfName = $row['professor_name'];

        $return_arr[] = array(
            "course_name" => $Cname,
            "course_description" => $Cdesc,
            "department_name" => $DepName,
            "professor_name" => $ProfName
        );
    }

    echo json_encode($return_arr);
}
mysqli_close($conn);
?>