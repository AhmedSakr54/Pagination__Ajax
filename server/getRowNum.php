<?php
include_once "dbh.php";
if (isset($_POST)) {
    $requestPayload = file_get_contents("php://input");
    $object = json_decode($requestPayload);
    $searchedFor = $object->{'searchedFor'};

    $query =    "SELECT COUNT(*)
                FROM course C, department D, professor P
                WHERE (C.professor_id = P.professor_id AND C.department_id = D.department_id) AND (REPLACE(C.course_name, ' ','') LIKE REPLACE('%$searchedFor%', ' ','') OR REPLACE(C.course_description,' ','') LIKE REPLACE('%$searchedFor%', ' ','') OR REPLACE(P.professor_name,' ','') LIKE REPLACE('%$searchedFor%', ' ', '')  OR REPLACE(D.department_name,' ','') LIKE REPLACE('%$searchedFor%', ' ',''))";

    $result = mysqli_query($conn, $query);
    $cousesPerPage = 5;

    $row = mysqli_fetch_array($result);


    $returned_value = array(
        "num_courses" => $row[0],
        "courses_per_page" => $cousesPerPage
    );

    echo json_encode($returned_value);
}
mysqli_close($conn);
?>