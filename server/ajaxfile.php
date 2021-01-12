<?php
include_once "dbh.php";

if(isset($_POST)) {
    $requestPayLoad = file_get_contents("php://input");
    $object = json_decode($requestPayLoad);

    $pageNumber = $object->{'pageNumber'};
    
    $coursesPerPage = $object->{'coursesPerPage'};

    $searchedFor = $object->{'searchedFor'};

    $pageLimit = $pageNumber*$coursesPerPage;
    
    $return_arr = array();

    $query =   "SELECT C.course_name, C.course_description, D.department_name, P.professor_name
                FROM course C, department D, professor P
                WHERE (C.professor_id = P.professor_id AND C.department_id = D.department_id) AND (REPLACE(C.course_name, ' ','') LIKE REPLACE('%$searchedFor%', ' ','')    OR REPLACE(C.course_description,' ','') LIKE REPLACE('%$searchedFor%', ' ','') OR REPLACE(P.professor_name,' ','') LIKE REPLACE('%$searchedFor%', ' ','')  OR REPLACE(D.department_name,' ','') LIKE REPLACE('%$searchedFor%', ' ',''))
                LIMIT $pageLimit,$coursesPerPage;";

    $result = mysqli_query($conn, $query);

    $output = '';
    $count = 0;
    while ($row = mysqli_fetch_array($result)) {
        $output .= "<tr>" .
        "<td align='center'>" . $row["course_name"] . "</td>" .
        "<td align='center'>" . $row["course_description"]. "</td>" .
        "<td align='center'>" . $row["department_name"].  "</td>" .
        "<td align='center'>" . $row["professor_name"].  "</td>" .
        "</tr>";
        $count++;    
    }
    if ($count == 0) {
        $output = "<tr><td colspan='4' align='center' class='no-records'>No Courses Found</td></tr>";
    }

    echo $output;
}
mysqli_close($conn);
?>