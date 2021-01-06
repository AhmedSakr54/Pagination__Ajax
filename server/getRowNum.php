<?php
include_once "dbh.php";

$query = "SELECT COUNT(*) FROM course";

$result = mysqli_query($conn, $query);
$cousesPerPage = 5;

$row = mysqli_fetch_array($result);


$returned_value = array(
    "num_courses" => $row[0],
    "courses_per_page" => $cousesPerPage
);

echo json_encode($returned_value);

mysqli_close($conn);
?>