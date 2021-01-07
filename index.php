<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagination</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style/styles.css" type="text/css">
</head>

<body>
    <div class="input-group flex-nowrap centered col-lg-4 offset-lg-4 p-3">
        <button class="btn btn-secondary" id="search-btn">Search</button>
        <input id="search" type="text" class="form-control" placeholder="Search...">
    </div>

    <div class="container">
        <table id="course-table" class="table table-hover table-light table-striped">
            <thead class="thead-dark">
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
    <div class="btn-group center-btns p-3 my-wrapper">
<!-- 
        <button class="btn btn-secondary previous navigation">Prev</button>


        <button class="btn btn-secondary next navigation">Next</button> -->

    </div>
    <script src="app.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>
</body>

</html>