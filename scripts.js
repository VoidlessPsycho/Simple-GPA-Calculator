document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("form");
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let pointsUW = 0;
        let pointsW = 0;
        for (let i = 1; i <= 7; i++){
            let letterGrade = document.getElementById(`grade${i}`).value.toUpperCase();
            let weightedNot = document.getElementById(`w${i}`).checked;
            
            let points;
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
            
            pointsUW += points;
            if (weightedNot) { points += 1.0 };
            pointsW += points;
        }
        let uw = (pointsUW /= 7).toFixed(2);
        let w = (pointsW /= 7).toFixed(2);
        document.getElementById("wgpa").innerHTML = w;
        document.getElementById("uwgpa").innerHTML = uw;
    });
});