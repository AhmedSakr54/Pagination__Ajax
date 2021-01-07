$(document).ready(function () {
    const $courseTable = $("#course-table tbody");
    let numberOfRows;
    let pageNumber;
    let coursesPerPage;
    liveSearch();
    function liveSearch() {
        const searchFor = $("#search").val();
        $.ajax({
            url: 'server/getRowNum.php',
            type: 'post',
            dataType: 'JSON',
            data: {'searchedFor': searchFor},
            success: function (result) {
                courseInfo = JSON.parse(JSON.stringify(result));
                numberOfRows = courseInfo.num_courses;
                pageNumber = 0;
                coursesPerPage = courseInfo.courses_per_page;
                getCourses();
                disableEnableButtons();
            }
        });
    }

    $("#search").keyup(function() {
        $courseTable.empty();
        liveSearch();
    });

    function getCourses() {
        const searchFor = $("#search").val();
        console.log(searchFor);
        $.ajax({
            url: 'server/ajaxfile.php',
            type: 'post',
            dataType: 'JSON',
            data: {
                'coursesPerPage': coursesPerPage,
                'pageNumber': pageNumber,
                'searchedFor': searchFor
            },
            success: function (courses) {
                $.each(courses, function (i, course) {
                    const tr_str = "<tr>" +
                        "<td align='center'>" + course.course_name + "</td>" +
                        "<td align='center'>" + course.course_description + "</td>" +
                        "<td align='center'>" + course.department_name + "</td>" +
                        "<td align='center'>" + course.professor_name + "</td>" +
                        "</tr>";
                    $courseTable.append(tr_str);
                });
            }
        });
    }
    function disableEnableButtons() {
        if (pageNumber <= 0) {
            $(".previous").attr("disabled", true);
        }
        if (pageNumber >= Math.ceil(numberOfRows / coursesPerPage) - 1) {
            $(".next").attr("disabled", true);            
        }
        if (pageNumber >= 1) {
            $(".previous").attr("disabled", false);
        }
        if (pageNumber <= Math.ceil(numberOfRows / coursesPerPage) - 2) {
            $(".next").attr("disabled", false);
        }
    }
    $(".navigation").click(function () {
        const btnClass = $(this).attr("class");
        if (btnClass === "btn btn-secondary next navigation") {
            pageNumber++;
        } else if (btnClass === "btn btn-secondary previous navigation") {
            pageNumber--;
        }
        disableEnableButtons();
        $courseTable.empty();
        getCourses();
    });
});