document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("form");
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let totalGradePoints = 0;
        for (let i = 1; i <= 7; i++){
            
            // get the grade value from textbox
            // get the weighted yes/no from checkbox
            // if weighted (1.0-5.0)
            // if not weighted (0.0-4.0)
            // add to total
            let letterGrade = document.getElementById(`grade${i}`).value.toUpperCase();
            let weightedNot = document.getElementById(`w${i}`).checked;
            console.log(letterGrade);
            console.log(weightedNot);
            
            let points;
            if (weightedNot) {
                if (["A+","A","A-"].includes(letterGrade)) {
                    points = 5.0;
                } else if (["B+", "B", "B-"].includes(letterGrade)) {
                    points = 4.0;
                } else if (["C+", "C", "C-"].includes(letterGrade)) {
                    points = 3.0;
                } else if (["D+", "D", "D-"].includes(letterGrade)) {
                    points = 2.0;
                } else if (["F+", "F", "F-"].includes(letterGrade)) {
                    points = 1.0;
                }
            } else {
                if (["A+","A","A-"].includes(letterGrade)) {
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
            }
            totalGradePoints += points;
        }
        totalGradePoints = (totalGradePoints /= 7).toFixed(2);
        document.getElementById("wgpa").innerHTML = totalGradePoints;
    });
});