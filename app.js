$(document).ready(function() {
    const $courseTable = $("#course-table tbody");
    let numberOfRows;
    $.ajax({
        url: 'server/getRowNum.php',
        type: 'get',
        dataType: 'text',
        success: function(numCourses) {
            numberOfRows = numCourses;
        }
    });
    let pageNumber = 0;
    if (pageNumber <= 0) {
        pageNumber = 0;
        $(".previous round").attr("disabled", true);
    }
    $(".round").click(function() {
        const btnClass = $(this).attr("class");
        $courseTable.empty();
        $.ajax({
            url: 'server/ajaxfile.php',
            type: 'post',
            dataType: 'JSON',
            data: {
                'numRows': numberOfRows,
                'pageNumber': pageNumber
            },
            success: function(courses) {
                $.each(courses, function(i, course) {
                    const tr_str = "<tr>" + 
                    "<td align='center'>" + course.course_name + "</td>" +
                    "<td align='center'>" + course.course_description + "</td>" +
                    "<td align='center'>" + course.department_name + "</td>" +
                    "<td align='center'>" + course.professor_name + "</td>" +
                    "</tr>";
                    $courseTable.append(tr_str); 
                });
                if (btnClass === "next round") {
                    pageNumber++;
                }
                else if (btnClass === "previous round") {
                    pageNumber--;
                }
                console.log(pageNumber);
                if (pageNumber <= 0) {
                    pageNumber = 0;
                    $(this).attr("disabled", true);
                }
                else if (pageNumber >= Math.ceil(numberOfRows/2)) {
                    pageNumber = Math.ceil(numberOfRows/2);
                    $(this).attr("disabled", true);
                }
                else {
                    $(this).attr("disabled", false);
                }
            }
        });
    });
});