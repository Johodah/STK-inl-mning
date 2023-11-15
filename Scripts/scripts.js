document.addEventListener('DOMContentLoaded', function () {
loadPrograms();
});




function addProgram() {
    //Den här funktionen hämtar värden från formuläret som skapats.
    var title = document.getElementById('programTitle').value;
    var description = document.getElementById('programDescription').value;
    var ageLimit = document.getElementById('ageLimit').value;

    //If-satser som ser till att man fyller i alla värden och visar felmeddelande vid felaktig input
    if (title.trim() === '' || description.trim() === '' || ageLimit.trim() === '') {
        alert("Fyll i alla fält innan du lägger till ett program.");
        return;
    }
    // Ser till att det blir ett positivt tal som åldersgräns.
    if (!(/^\d+$/.test(ageLimit)) || parseInt(ageLimit) < 0) {
        alert("Apapapp! Åldersgränsen måste vara positivt tal, toker.");
        return;
    }
    // Här skapas det nya programobjektet.
    var newProgram = {
        title: title,
        description: description,
        ageLimit: ageLimit,
    };

//Här hämtas sparade program eller så skapas det en tom array om det är första inlägget.
var programs = JSON.parse(localStorage.getItem("programs")) || [];
//Lägger till det nya programmet som en sträng och uppdaterar den lokala lagringen.
programs.push(newProgram); 
localStorage.setItem("programs", JSON.stringify(programs));

//Här uppdateras listan och formuläret nollställs för att spara tid och gör det mer tillgängligt.
loadPrograms();
document.getElementById("programForm").reset();
}


function loadPrograms() {
    // Containern hämtas för sparade tv-program
    var savedProgramsContainer = document.getElementById("savedProgramsContainer");
    savedProgramsContainer.innerHTML = '';

    //Hämtar dem sparade programmen ELLER skapar en ny array om inget har fyllts i
    var programs = JSON.parse(localStorage.getItem("programs")) || [];

    // HMTL-element skapas för varje sparat program och läggs till i containern
    programs.forEach(function (program) {
        var div = document.createElement("div");
        div.className = "saved-program";
        div.innerHTML = `<strong>${program.title}</strong> (${program.ageLimit}+) - ${program.description}`;
        savedProgramsContainer.appendChild(div);
    });

    //Knapparna för att scrolla uppdateras för ny "bredd"
    updateScrollButtons();
}

function searchPrograms() {
    //sökord hämtas för att hitta programmet man söker efter.
    const searchQuery = document.getElementById('searchBox').value.toLowerCase();
    const programs = JSON.parse(localStorage.getItem("programs")) || [];

    //Hämta containern för sparade program
    var savedProgramsContainer = document.getElementById("savedProgramsContainer");
    savedProgramsContainer.innerHTML = '';
    
    //if-sats som laddar alla program om sökrutan är tom
    if (searchQuery.trim() === '') {
        loadPrograms();
        return;
    }

    //Filtering av program baserat på sökord och visar alla programmen som matchar.
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
    //uppdatering av knappar. Skriver man "a" kommer alla upp och listan uppdaterar bredden för att scrolla.
    updateScrollButtons();
}

//Rensar alla sparade tv-program och ger en alert om att man gjort det.
function clearPrograms() {
    localStorage.removeItem('programs');
    alert ("All data är rensad!");

    loadPrograms();
}

//La till en scroll-funktion så att man kan dra den åt höger eller vänster och se alla objekt.
function scrollPrograms(direction) {
    const container = document.getElementById('savedProgramsContainer');
    const scrollAmount = 300;

    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else if(direction === 'right') {
        container.scrollLeft += scrollAmount;
    }
}

//funktion som anpassar rullknapparna beroende på storleken av listan.
function updateScrollButtons() {
    var savedProgramsContainer = document.getElementById("savedProgramsContainer");
    var scrollButtonLeft = document.querySelector(".scroll-button.left");
    var scrollButtonRight = document.querySelector(".scroll-button.right");

    if (scrollButtonLeft && scrollButtonRight) {
    scrollButtonLeft.disabled = savedProgramsContainer.scrollLeft === 0;
    scrollButtonRight.disabled = savedProgramsContainer.scrollLeft === (savedProgramsContainer.scrollWidth - savedProgramsContainer.clientWidth);
}
}

document.getElementById("savedProgramsContainer").addEventListener("scroll", function () {
    updateScrollButtons();
});

document.querySelector(".scroll-button.right").addEventListener("click", function () {
    var savedProgramsContainer = document.getElementById("savedProgramsContainer");
    savedProgramsContainer.scrollLeft += savedProgramsContainer.scrollWidth;
});