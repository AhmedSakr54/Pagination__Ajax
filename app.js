const doEveryThing = () => {
    const courseTable = document.querySelector("#course-table tbody");
    courseTable.innerHTML = "";
    let numberOfRows;
    let pageNumber;
    let coursesPerPage;
    let allPages = [];
    let prevPushedBtn;
    liveSearch("");

    function liveSearch(whatTosearch) {
        const searchFor = whatTosearch;
        const request = new XMLHttpRequest();
        const theUrl = "server/getRowNum.php";
        request.open("POST", theUrl);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        const whatIsSent = {
            searchedFor: searchFor
        };
        const whatIsSentJSON = JSON.stringify(whatIsSent);
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                courseInfo = JSON.parse(request.responseText);
                numberOfRows = courseInfo.num_courses;
                pageNumber = 0;
                coursesPerPage = courseInfo.courses_per_page;
                getCourses(whatTosearch);
                pagination(numberOfRows, coursesPerPage);
                runAfterEveryThing();
                if (allPages.length >= 1) {
                    allPages[0].disabled = true;
                    prevPushedBtn = allPages[0];
                }
                disableEnableButtons();
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
                const allCourses = JSON.parse(request.responseText);
                showCourses(allCourses);
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



    function runAfterEveryThing() {
        document.querySelectorAll(".navigation").forEach((button) => {
            button.addEventListener('click', function () {
                const btnClass = this.className;
                if (btnClass === "btn btn-secondary next navigation") {
                    pageNumber++;
                    allPages[pageNumber].disabled = true;
                    prevPushedBtn.disabled = false;
                    prevPushedBtn = allPages[pageNumber];
                } else if (btnClass === "btn btn-secondary previous navigation") {
                    pageNumber--;
                    allPages[pageNumber].disabled = true;
                    prevPushedBtn.disabled = false;
                    prevPushedBtn = allPages[pageNumber];
                }
                disableEnableButtons();
                courseTable.innerHTML = "";
                const searchFor = document.querySelector("#search").value;
                getCourses(searchFor);
                // const trimStart = (pageNumber) * coursesPerPage;
                // const trimEnd = trimStart + coursesPerPage;
                // showCourses(coursesSearchedFor.slice(trimStart, trimEnd));
            });
        });
        document.querySelectorAll(".page").forEach((page) => {
            allPages.push(page);
            page.addEventListener("click", function () {
                const btnValue = this.value;
                pageNumber = btnValue - 1;
                disableEnableButtons();
                courseTable.innerHTML = "";
                const searchFor = document.querySelector("#search").value;
                getCourses(searchFor);
                // const trimStart = (pageNumber) * coursesPerPage;
                // const trimEnd = trimStart + coursesPerPage;
                // showCourses(coursesSearchedFor.slice(trimStart, trimEnd));
                this.disabled = true;
                prevPushedBtn.disabled = false;
                prevPushedBtn = this;
            });
        });
    }

    function pagination(numberOfRows, coursesPerPage) {
        const pages = Math.ceil(numberOfRows / coursesPerPage);
        const wrapper = document.querySelector(".my-wrapper");
        wrapper.innerHTML = "";
        wrapper.innerHTML += "<button class='btn btn-secondary previous navigation'>Prev</button>";
            for (let i = 0; i < pages; i++) {
                wrapper.innerHTML += `<button class='btn btn-secondary page' value='${i+1}'>${i+1}</button>`;
            }
        wrapper.innerHTML += "<button class='btn btn-secondary next navigation'>Next</button>";
    }

    document.querySelector("#search").addEventListener('keyup', function () {
        const searchFor = document.querySelector("#search").value;
        if (searchFor.length >= 3) {
            courseTable.innerHTML = "";
            allPages = [];
            liveSearch(searchFor);
        } else if (searchFor.length == 0) {
            allPages = [];
            courseTable.innerHTML = "";
            liveSearch("");
        }

    });
    document.querySelector("#search-btn").addEventListener('click', function () {
        const searchFor = document.querySelector("#search").value;
        allPages = [];
        courseTable.innerHTML = "";
        liveSearch(searchFor);
    });


    function showCourses(allCourses) {
        courseTable.innerHTML = "";
        for (const course of allCourses) {
            const tr_str = "<tr>" +
                "<td align='center'>" + course.course_name + "</td>" +
                "<td align='center'>" + course.course_description + "</td>" +
                "<td align='center'>" + course.department_name + "</td>" +
                "<td align='center'>" + course.professor_name + "</td>" +
                "</tr>";
            courseTable.innerHTML += tr_str;
        }
    }


};
document.addEventListener('DOMContentLoaded', doEveryThing());