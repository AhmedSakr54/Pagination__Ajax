const doEveryThing = () => {
    const courseTable = document.querySelector("#course-table tbody");
    courseTable.innerHTML = "";
    let numberOfRows;
    let pageNumber;
    let coursesPerPage;
    let allPagesBtns = [];
    let prevPushedBtn;


    const showCourses = (allCourses) => {
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
        if (allCourses.length == 0) {
            courseTable.innerHTML += "<tr><td colspan='4' align='center' class='no-records'>No Courses Found</td></tr>";
        }

    };

    const showCoursesSmooth = (allCourses) => {
        const tdElements = document.querySelectorAll("#course-table tbody tr");
        const numCourses = allCourses.length;
        if (tdElements.length == numCourses) {
            for (let i = 0; i < numCourses; i++) {
                tdElements[i].cells[0].innerHTML = allCourses[i].course_name;
                tdElements[i].cells[1].innerHTML = allCourses[i].course_description;
                tdElements[i].cells[2].innerHTML = allCourses[i].department_name;
                tdElements[i].cells[3].innerHTML = allCourses[i].professor_name;
            }
            for (let i = numCourses; i < coursesPerPage; i++) {
                courseTable.deleteRow(numCourses);
            }
        }
        else {
            showCourses(allCourses);
        }
    };

    const disableEnableButtons = () => {
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

    };
    
    const liveSearch = (whatTosearch = "") => {
        const searchFor = whatTosearch;
        const request = new XMLHttpRequest();
        const theUrl = "server/getRowNum.php";
        request.open("POST", theUrl);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        const searchElement = {
            searchedFor: searchFor
        };
        const searchElementJSON = JSON.stringify(searchElement);
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                courseInfo = JSON.parse(request.responseText);
                numberOfRows = courseInfo.num_courses;
                pageNumber = 0;
                coursesPerPage = courseInfo.courses_per_page;
                getCourses(whatTosearch);
                pagination(numberOfRows, coursesPerPage);
                runAfterEveryThing();
                if (allPagesBtns.length >= 1) {
                    allPagesBtns[0].disabled = true;
                    prevPushedBtn = allPagesBtns[0];
                }
                disableEnableButtons();
            }
        };
        request.send(searchElementJSON);
    };

    
    const getCourses = (whatTosearch) => {
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
                // courseTable.innerHTML = request.responseText;
                if (pageNumber == 0) {
                    showCourses(allCourses);
                } else {
                    showCoursesSmooth(allCourses);
                }
            }
        };
        request.send(whatIsSentJSON);
    };

    const runAfterEveryThing = () => {
        document.querySelectorAll(".navigation").forEach((button) => {
            button.addEventListener('click', function () {
                const btnClass = this.className;
                if (btnClass === "btn btn-secondary next navigation") {
                    pageNumber++;
                    allPagesBtns[pageNumber].disabled = true;
                    prevPushedBtn.disabled = false;
                    prevPushedBtn = allPagesBtns[pageNumber];
                } else if (btnClass === "btn btn-secondary previous navigation") {
                    pageNumber--;
                    allPagesBtns[pageNumber].disabled = true;
                    prevPushedBtn.disabled = false;
                    prevPushedBtn = allPagesBtns[pageNumber];
                }
                disableEnableButtons();
                // courseTable.innerHTML = "";
                const searchFor = document.querySelector("#search").value;
                getCourses(searchFor);
                // const trimStart = (pageNumber) * coursesPerPage;
                // const trimEnd = trimStart + coursesPerPage;
                // showCourses(coursesSearchedFor.slice(trimStart, trimEnd));
            });
        });
        document.querySelectorAll(".page").forEach((page) => {
            allPagesBtns.push(page);
            page.addEventListener("click", function () {
                const btnValue = this.value;
                pageNumber = btnValue - 1;
                disableEnableButtons();
                // courseTable.innerHTML = "";
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
    };

    const pagination = (numberOfRows, coursesPerPage) => {
        const pages = Math.ceil(numberOfRows / coursesPerPage);
        const wrapper = document.querySelector(".my-wrapper");
        wrapper.innerHTML = "";
        wrapper.innerHTML += "<button class='btn btn-secondary previous navigation'>Prev</button>";
        for (let i = 0; i < pages; i++) {
            wrapper.innerHTML += `<button class='btn btn-secondary page' value='${i+1}'>${i+1}</button>`;
        }
        wrapper.innerHTML += "<button class='btn btn-secondary next navigation'>Next</button>";
    };

    liveSearch();

    document.querySelector("#search").addEventListener('keyup', function () {
        const searchFor = document.querySelector("#search").value;
        if (searchFor.length >= 3) {
            // courseTable.innerHTML = "";
            allPagesBtns = [];
            liveSearch(searchFor);
        } else if (searchFor.length == 0) {
            allPagesBtns = [];
            // courseTable.innerHTML = "";
            liveSearch();
        }
    });

    document.querySelector("#search-btn").addEventListener('click', function () {
        const searchFor = document.querySelector("#search").value;
        allPagesBtns = [];
        // courseTable.innerHTML = "";
        liveSearch(searchFor);
    });

};

document.addEventListener('DOMContentLoaded', doEveryThing());