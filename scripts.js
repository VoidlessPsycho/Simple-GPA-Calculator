document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("form");
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let courseContainer = document.getElementById("courseContainer");
        let pointsUW = 0;
        let pointsW = 0;
        let calcUW = "\\frac{ ";
        let calcW = "\\frac{ ";
        let grades = document.querySelectorAll(".gradeInput");
        let weights = document.querySelectorAll(".weightedInput");
        let numRows = grades.length;

        for (let i = 0; i < numRows; i++) {
            let weightedNot = weights[i].checked;
            let points;
            if (gradeType == true) {
                let letterGrade = grades[i].value.toUpperCase();

                if (["A+", "A", "A-"].includes(letterGrade)) {
                    points = 4.0;
                } else if (["B+", "B", "B-"].includes(letterGrade)) {
                    points = 3.0;
                } else if (["C+", "C", "C-"].includes(letterGrade)) {
                    points = 2.0;
                } else if (["D+", "D", "D-"].includes(letterGrade)) {
                    points = 1.0;
                } else if (["F"].includes(letterGrade)) {
                    points = 0.0;
                }
            } else if (gradeType == false) {
                let numberGrade = grades[i].value;

                if (numberGrade >= 90.0) {
                    points = 4.0;
                } else if (numberGrade >= 80.0) {
                    points = 3.0;
                } else if (numberGrade >= 70.0) {
                    points = 2.0;
                } else if (numberGrade >= 60.0) {
                    points = 1.0;
                } else if (numberGrade < 60.0) {
                    points = 0.0;
                }
            }

            pointsUW += points;
            calcUW += points.toString();
            if (i < numRows - 1) { calcUW += " + "; };
            if (weightedNot) { points += 1.0 };
            pointsW += points;
            calcW += points.toString()
            if (i < numRows - 1) { calcW += " + "; };
        }
        let uw = (pointsUW /= numRows).toFixed(3);
        let w = (pointsW /= numRows).toFixed(3);
        calcUW += " }{ " + numRows + "} =  ";
        calcW += " }{ " + numRows + "} =  ";
        document.getElementById("wgpa").innerHTML = " " + w;
        document.getElementById("uwgpa").innerHTML = " " + uw;
        document.getElementById("calcUW").innerHTML = "\\(" + calcUW + "\\)";;
        document.getElementById("calcW").innerHTML = "\\(" + calcW + "\\)";;
        MathJax.typeset()

        showFaces(w);
    });
});


// Based on the Weighted GPA, display a different colored face for visual feedback.
function showFaces(grade) {
    let img = document.getElementsByClassName("resultImg");
    if (grade >= 4.0) {
        img[0].setAttribute("src", "img/faces/a.png");
        img[1].setAttribute("src", "img/faces/a.png");
    } else if (grade >= 3.0) {
        img[0].setAttribute("src", "img/faces/b.png");
        img[1].setAttribute("src", "img/faces/b.png");
    } else if (grade >= 2.0) {
        img[0].setAttribute("src", "img/faces/c.png");
        img[1].setAttribute("src", "img/faces/c.png");
    } else if (grade >= 1.0) {
        img[0].setAttribute("src", "img/faces/d.png");
        img[1].setAttribute("src", "img/faces/d.png");
    } else if (grade >= 0.0) {
        img[0].setAttribute("src", "img/faces/f.png");
        img[1].setAttribute("src", "img/faces/f.png");
    }
}

// Results Settings
function toggleShowCalc() {
    const calcUW = document.getElementById("calcUW");
    const calcW = document.getElementById("calcW");

    if (getComputedStyle(calcUW).display === "none") {
        calcUW.style.display = "inline";
        calcW.style.display = "inline";
        document.getElementById("showCalc").innerText = "Hide Calculations";
    } else {
        calcUW.style.display = "none";
        calcW.style.display = "none";
        document.getElementById("showCalc").innerText = "Show Calculations";
    }
};

// Add/Remove Row
function addRow() {
    let courseContainer = document.getElementById("courseContainer");
    let row = courseContainer.lastElementChild.cloneNode(true);
    courseContainer.appendChild(row);
}

function removeRow() {
    if (courseContainer.childElementCount > 3) {
        let courseContainer = document.getElementById("courseContainer");
        courseContainer.removeChild(courseContainer.lastElementChild);
    }
}

// Toggle Letter/Number Grades
let gradeType = true;
// true = Letter
// false = Number
function toggleLetterNumber() {
    let courseContainer = document.getElementById("courseContainer");
    let letterSelect = '<select class="gradeInput" required> \n<option value="">Select Grade</option> \n<option value="A+">A+</option> \n<option value="A">A</option> \n<option value="A-">A-</option> \n<option value="B+">B+</option> \n<option value="B">B</option> \n<option value="B-">B-</option> \n<option value="C+">C+</option> \n<option value="C">C</option> \n<option value="C-">C-</option> \n<option value="D+">D+</option> \n<option value="D">D</option> \n<option value="D-">D-</option> \n<option value="F">F</option> \n</select>';
    let numberSelect = '<input type="number" required class="gradeInput" min="0">';
    let fields = courseContainer.getElementsByClassName("gradeInput");
    if (gradeType) {
        for (let i = 0; i < fields.length; i++) {
            fields[i].replaceWith(createNumLetterSelect(2));
            document.getElementById("gradeTypeHead").innerText = "Number ";
        }
    } else {
        for (let i = 0; i < fields.length; i++) {
            fields[i].replaceWith(createNumLetterSelect(1));
            document.getElementById("gradeTypeHead").innerText = "Letter ";
        }
    }
    gradeType = !gradeType;
};

function createNumLetterSelect(opt) {
    let select;
    // 1 = letter
    // 2 = number
    if (opt == 1) {
        select = document.createElement("select");
        select.required = true;
        select.className = "gradeInput";
        let grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
        let option = document.createElement("option");
        option.value = "";
        option.textContent = "Select Grade";
        select.appendChild(option);
        for (let i = 0; i < grades.length; i++) {
            let option = document.createElement("option");
            option.value = grades[i];
            option.textContent = grades[i];
            select.appendChild(option);
        }
    } else if (opt == 2) {
        select = document.createElement("input");
        select.type = "number";
        select.required = true;
        select.min = "0";
        select.width = 5;
        select.className = "gradeInput";
    }
    return select;
}