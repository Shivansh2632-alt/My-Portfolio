
// Get HTML elements
let studentForm = document.getElementById("student-form");
let studentName = document.getElementById("student-name");
let studentList = document.getElementById("student-list");
let message = document.getElementById("message");

let totalCount = document.getElementById("total-count");
let presentCount = document.getElementById("present-count");
let absentCount = document.getElementById("absent-count");

// Store students
let students = [];

// Update attendance summary
function updateSummary() {
    let present = 0, absent = 0;

    students.forEach(function(student) {
        if (student.status == "Present")
            present++;
        else
            absent++;
    });

    totalCount.innerText = students.length;
    presentCount.innerText = present;
    absentCount.innerText = absent;
}

// Display students
function displayStudents() {
    studentList.innerHTML = "";

    students.forEach(function(student, index) {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="student-name">${student.name}</span>
            <span class="status">${student.status}</span>
            <button onclick="markPresent(${index})">Present</button>
            <button onclick="markAbsent(${index})">Absent</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;

        studentList.appendChild(li);
    });

    updateSummary();
}

// Add student
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = studentName.value.trim();

    if (name == "") {
        message.innerText = "Please enter student name!";
    } else {
        students.push({name: name, status: "Absent"});
        message.innerText = "Student added successfully!";
        studentName.value = "";
        displayStudents();
    }
});

// Mark attendance
function markPresent(index) {
    students[index].status = "Present";
    displayStudents();
}

function markAbsent(index) {
    students[index].status = "Absent";
    displayStudents();
}

// Delete student
function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}
