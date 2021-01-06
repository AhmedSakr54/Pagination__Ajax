<?php
include_once "dbh.php";

$pageNumber = $_POST['pageNumber'];
$numOfRows = $_POST['numRows'];
$rowsPerPage = 2;
$pageLimit = $pageNumber*$rowsPerPage;
$return_arr = array();


$query =    "SELECT C.course_name, C.course_description, D.department_name, P.professor_name
            FROM course C, department D, professor P
            WHERE C.department_id = D.department_id AND C.professor_id = P.professor_id
            LIMIT $pageLimit,$rowsPerPage";

$result = mysqli_query($conn, $query);
$i = 0;
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
mysqli_close($conn);
?>