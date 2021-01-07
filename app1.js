const doEveryThing = () => {
    const courseTable = document.querySelector("#course-table tbody");
    courseTable.innerHTML = "";   
    let numberOfRows;
    let pageNumber;
    let coursesPerPage;
    liveSearch("");

    function liveSearch(whatTosearch) {
        const searchFor = whatTosearch;
        const request = new XMLHttpRequest(); // new HttpRequest instance 
        const theUrl = "server/getRowNum.php";
        request.open("POST", theUrl);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        const whatIsSent = {
            searchedFor: searchFor
        };
        const whatIsSentJSON = JSON.stringify(whatIsSent);
        console.log(whatIsSentJSON);
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log('succeed1');
                courseInfo = JSON.parse(request.responseText);
                numberOfRows = courseInfo.num_courses;
                pageNumber = 0;
                coursesPerPage = courseInfo.courses_per_page;
                console.log(request.responseText);
                getCourses(whatTosearch);
                disableEnableButtons();
            } else {
                console.log('1server error');
            }
        };
        request.send(whatIsSentJSON);
    }

    function getCourses(whatTosearch) {
        const searchFor = whatTosearch;
        const request = new XMLHttpRequest();
        const theUrl = "server/ajaxfile.php";
        request.open("POST", theUrl);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        const whatIsSent = {
            coursesPerPage: coursesPerPage,
            pageNumber: pageNumber,
            searchedFor: searchFor
        };
        const whatIsSentJSON = JSON.stringify(whatIsSent);
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log("success2");
                const allCourses = JSON.parse(request.responseText);
                console.log(allCourses);
                for (const course of allCourses) {
                    const tr_str = "<tr>" +
                        "<td align='center'>" + course.course_name + "</td>" +
                        "<td align='center'>" + course.course_description + "</td>" +
                        "<td align='center'>" + course.department_name + "</td>" +
                        "<td align='center'>" + course.professor_name + "</td>" +
                        "</tr>";
                    courseTable.innerHTML += tr_str;
                }
            } else {
                console.log("2server error");
            }
        };
        request.send(whatIsSentJSON);
    }
    function disableEnableButtons() {
        if (pageNumber <= 0) {
            document.querySelector(".previous").disabled = true;
        }
        if (pageNumber >= Math.ceil(numberOfRows / coursesPerPage) - 1) {
            document.querySelector(".next").disabled = true;         
        }
        if (pageNumber >= 1) {
            document.querySelector(".previous").disabled = false;
        }
        if (pageNumber <= Math.ceil(numberOfRows / coursesPerPage) - 2) {
            document.querySelector(".next").disabled = false;
        }
    }

    document.querySelector(".navigation").addEventListener('click', function() {
        const btnClass = this.className;
        if (btnClass === "btn btn-secondary next navigation") {
            pageNumber++;
        } else if (btnClass === "btn btn-secondary previous navigation") {
            pageNumber--;
        }
        disableEnableButtons();
        courseTable.innerHTML = "";
        const searchFor = document.querySelector("#search").value;
        getCourses(searchFor);
    });
};
document.addEventListener('DOMContentLoaded', doEveryThing());