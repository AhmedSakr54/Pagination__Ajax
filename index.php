<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagination</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="style/styles.css" type="text/css">
</head>

<body>
    <div class="search-field">
        <input type="text">
        <button>Search</button>
    </div>
    <div class="container">
        <table id="course-table">
            <thead>
                <tr>
                    <th width=20%>Course Name</th>
                    <th width=40%>Course Description</th>
                    <th width=20%>Department Name</th>
                    <th width=20%>Professor Name</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    <button class="previous round">&#8249;</button>
    <button class="next round">&#8250;</button>
    <script src="app.js"></script>
</body>

</html>