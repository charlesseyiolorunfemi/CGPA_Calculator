


const courseName = document.getElementById("courseName");
const grade = document.getElementById("grade");
const unit = document.getElementById("unit");

const addBtn = document.getElementById("addBtn");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const courseList = document.getElementById("courseList");

const cgpaDisplay = document.getElementById("cgpa");
const totalUnitsDisplay = document.getElementById("totalUnits");
const totalPointsDisplay = document.getElementById("totalPoints");
const courseCount = document.getElementById("courseCount");




let courses = [];




function addCourse() {

    const name = courseName.value.trim();
    const selectedGrade = Number(grade.value);
    const creditUnit = Number(unit.value);

  

    if (name === "") {
        alert("Please enter a course name");
        return;
    }

    if (!Number.isInteger(creditUnit) || creditUnit <= 0) {
        alert("Please enter a valid credit unit");
        return;
    }

    const course = {
        name: name,
        grade: selectedGrade,
        unit: creditUnit
    };



    courses.push(course);

   

    displayCourses();

   

    courseName.value = "";
    unit.value = "";
    grade.value = "5";

}




function displayCourses() {

    courseList.innerHTML = "";

    courseCount.textContent =
        courses.length + (courses.length === 1 ? " Course" : " Courses");

    if (courses.length === 0) {

        courseList.innerHTML =
            '<p class="empty-message">No courses added yet.</p>';

        return;
    }

    courses.forEach(function(course, index) {

        const courseItem = document.createElement("div");

        courseItem.className = "course-item";

        const gradeLetter = ["F", "E", "D", "C", "B", "A"][course.grade];

        courseItem.innerHTML = `
            <div class="course-info">
                <h4>${course.name}</h4>
                <p>${course.unit} Credit Unit</p>
            </div>

            <div>
                <span class="course-grade">${gradeLetter}</span>

                <button class="delete-btn" onclick="deleteCourse(${index})">
                    X
                </button>
            </div>
        `;

        courseList.appendChild(courseItem);

    });

}




function deleteCourse(index) {

    courses.splice(index, 1);

    displayCourses();

    calculateCGPA();

}




function calculateCGPA() {

    let totalPoints = 0;
    let totalUnits = 0;

    if (courses.length === 0) {

        alert("Please add some courses first");
        return;
    }

    courses.forEach(function(course) {

        const qualityPoint = course.grade * course.unit;

        totalPoints += qualityPoint;

        totalUnits += course.unit;

    });

    const cgpa = totalPoints / totalUnits;

   

    cgpaDisplay.textContent = cgpa.toFixed(2);

    totalUnitsDisplay.textContent = totalUnits;

    totalPointsDisplay.textContent = totalPoints;

}




function resetCalculator() {

    courses = [];

    cgpaDisplay.textContent = "0.00";

    totalUnitsDisplay.textContent = "0";

    totalPointsDisplay.textContent = "0";

    displayCourses();

}


addBtn.addEventListener("click", addCourse);

calculateBtn.addEventListener("click", calculateCGPA);

resetBtn.addEventListener("click", resetCalculator);




displayCourses();