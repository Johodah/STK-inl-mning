document.addEventListener('DOMContentLoaded', function () {
loadPrograms();
});

function addProgram() {
    console.log('Lägger till program');
    var title = document.getElementById('programTitle').value;
    var description = document.getElementById('programDescription').value;
    var ageLimit = document.getElementById('ageLimit').value;

    var newProgram = {
        title: title,
        description: description,
        ageLimit: ageLimit,
    };


var programs = JSON.parse(localStorage.getItem("programs")) || [];


programs.push(newProgram);

localStorage.setItem("programs", JSON.stringify(programs));
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
    var searchInput = document.getElementById("searchProgram").value.toLowerCase();
    var programList = document.getElementById("programList");

    var programs = JSON.parse(localStorage.getItem("programs")) || [];

    var filteredPrograms = programs.filter(function (program) {
        return program.title.toLowerCase(),includes(searchInput) || program.description.toLowerCase(),includes(searchInput);  
    });
}

function listAllPrograms() {
    var programList = document.getElementById("programList");

    var programs = JSON.parse(localStorage.getItem("programs")) || [];

    programList.innerHTML = '';
    programs.forEach(function (program) {
        var li = document.createElement('li');
        li.innerHTML = `<strong>${program.title}</strong> (${program.ageLimit}+) - ${program.description}`;
        programList.appendChild(li);
    });
}

function clearPrograms() {
    localStorage.removeItem('programs');

    loadPrograms();
}