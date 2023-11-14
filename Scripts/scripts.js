document.addEventListener('DOMContentLoaded', function () {
loadPrograms();
});

function addProgram() {
    var title = document.getElementById('programTitle').value;
    var description = document.getElementById('programDescription').value;
    var ageLimit = document.getElementById('ageLimit').value;

    if (title.trim() === '' || description.trim() === '' || ageLimit.trim() === '') {
        alert("Fyll i alla fält innan du lägger till ett program.");
        return;
    }

    if (!(/^\d+$/.test(ageLimit)) || parseInt(ageLimit) < 0) {
        alert("Apapapp! Åldersgränsen måste vara positivt tal, toker.");
        return;
    }

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
    var savedProgramsContainer = document.getElementById("savedProgramsContainer");
    savedProgramsContainer.innerHTML = '';

    var programs = JSON.parse(localStorage.getItem("programs")) || [];

    programs.forEach(function (program) {
        var div = document.createElement("div");
        div.className = "saved-program";
        div.innerHTML = `<strong>${program.title}</strong> (${program.ageLimit}+) - ${program.description}`;
        savedProgramsContainer.appendChild(div);
    });
}

function searchPrograms() {
    const searchQuery = document.getElementById('searchBox').value.toLowerCase();
    const programs = JSON.parse(localStorage.getItem("programs")) || [];

    var savedProgramsContainer = document.getElementById("savedProgramsContainer");
    savedProgramsContainer.innerHTML = '';

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
    var div = document.createElement("div");
    div.innerHTML = `<strong>${program.title}</strong> (${program.ageLimit}+) - ${program.description}`;
    div.className = "saved-program";
    savedProgramsContainer.appendChild(div); 
});
}

function clearPrograms() {
    localStorage.removeItem('programs');
    alert ("All data är rensad!");

    loadPrograms();
}
