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
            console.log(i);
            console.log(grades.length);
            console.log(weights.length);
            console.log(grades[i]);
            console.log(weights[i]);
            let letterGrade = grades[i].value.toUpperCase();
            let weightedNot = weights[i].checked;

            let points;
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
    });
});

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