document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("form");
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let pointsUW = 0;
        let pointsW = 0;
        let calcUW = "( ";
        let calcW = "( ";
        for (let i = 1; i <= 7; i++) {
            let letterGrade = document.getElementById(`grade${i}`).value.toUpperCase();
            let weightedNot = document.getElementById(`w${i}`).checked;

            let points;
            if (["A+", "A", "A-"].includes(letterGrade)) {
                points = 4.0;
            } else if (["B+", "B", "B-"].includes(letterGrade)) {
                points = 3.0;
            } else if (["C+", "C", "C-"].includes(letterGrade)) {
                points = 2.0;
            } else if (["D+", "D", "D-"].includes(letterGrade)) {
                points = 1.0;
            } else if (["F+", "F", "F-"].includes(letterGrade)) {
                points = 0.0;
            }

            pointsUW += points;
            calcUW += points.toString();
            if (i < 7) { calcUW += " + "; };
            if (weightedNot) { points += 1.0 };
            pointsW += points;
            calcW += points.toString()
            if (i < 7) { calcW += " + "; };
        }
        let uw = (pointsUW /= 7).toFixed(2);
        let w = (pointsW /= 7).toFixed(2);
        calcUW += ") ÷ 7 = ";
        calcW += ") ÷ 7 = ";
        document.getElementById("wgpa").innerHTML = w;
        document.getElementById("uwgpa").innerHTML = uw;
        document.getElementById("calcUW").innerHTML = calcUW;
        document.getElementById("calcW").innerHTML = calcW;
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