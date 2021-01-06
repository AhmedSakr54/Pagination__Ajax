<?php
include_once "dbh.php";

$query = "SELECT COUNT(*) FROM course";

$result = mysqli_query($conn, $query);

$row = mysqli_fetch_array($result);
echo $row[0];
mysqli_close($conn);
?>