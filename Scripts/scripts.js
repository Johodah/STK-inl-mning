document.addEventListener('DOMContentLoaded', function () {
loadPrograms();
});

function addProgram() {
    var title = document.getElementById('programTitle').value;
    var description = document.getElementById('programDescription').value;
    var ageLimit = document.getElementById('ageLimit').value;

    var newProgram = {
        title: title,
        description: description,
        ageLimit: ageLimit,
    };


var programs = JSON.parse(localStorage.getItem("programs")) || [];


programs.push(newProgram); //lägger till data med push.

localStorage.setItem("programs", JSON.stringify(programs)); //Gör om datan till en sträng och sparar.
loadPrograms();
document.getElementById("programForm").reset();
}


function loadPrograms() {
    var programList = document.getElementById("programList");
    programList.innerHTML = '';

    var programs = JSON.parse(localStorage.getItem("programs")) || [];

    programs.forEach(function (program) {
        var li = document.createElement("li");
        li.innerHTML = `<strong>${program.title}</strong> (${program.ageLimit}+) - ${program.description}`;
        programList.appendChild(li);
    });
}

function searchPrograms() {
    const searchQuery = document.getElementById('searchBox').value.toLowerCase();
    const programs = JSON.parse(localStorage.getItem("programs")) || [];

    var programList = document.getElementById("programList");
    programList.innerHTML = '';

    if (searchQuery.trim() === '') {
        loadPrograms();
        return;
    }

    const filteredPrograms = programs.filter(program => {
        return program.title.toLowerCase().includes(searchQuery) || 
               program.description.toLowerCase().includes(searchQuery) ||
               program.ageLimit.toString().includes(searchQuery);  
    });

filteredPrograms.forEach(program => {
    var li = document.createElement("li");
    li.innerHTML = `<strong>${program.title}</strong> (${program.ageLimit}+) - ${program.description}`;
        programList.appendChild(li);
});
}

function clearPrograms() {
    localStorage.removeItem('programs');
    alert ("All data är rensad!");

    loadPrograms();
}
