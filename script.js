var students = [];

var studentForm = document.getElementById("student-form");
var nameInput = document.getElementById("student-name");
var studentList = document.getElementById("student-list");
var message = document.getElementById("message");

// Add a student when the form is submitted.
studentForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var studentName = nameInput.value.trim();

  if (studentName === "") {
    message.textContent = "Please enter a student name.";
    return;
  }

  students.push({ name: studentName, status: "Not marked" });
  nameInput.value = "";
  message.textContent = "";
  showStudents();
});

// Display the students and update the attendance totals.
function showStudents() {
  studentList.innerHTML = "";

  var present = 0;
  var absent = 0;

  for (let i = 0; i < students.length; i++) {
    var student = students[i];
    var listItem = document.createElement("li");

    var studentName = document.createElement("span");
    studentName.className = "student-name";
    studentName.textContent = student.name;

    var studentStatus = document.createElement("span");
    studentStatus.className = "status";
    studentStatus.textContent = student.status;

    var presentButton = document.createElement("button");
    presentButton.textContent = "Present";
    presentButton.addEventListener("click", function() {
      students[i].status = "Present";
      showStudents();
    });

    var absentButton = document.createElement("button");
    absentButton.textContent = "Absent";
    absentButton.addEventListener("click", function() {
      students[i].status = "Absent";
      showStudents();
    });

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
      students.splice(i, 1);
      showStudents();
    });

    listItem.appendChild(studentName);
    listItem.appendChild(studentStatus);
    listItem.appendChild(presentButton);
    listItem.appendChild(absentButton);
    listItem.appendChild(removeButton);
    studentList.appendChild(listItem);

    if (student.status === "Present") {
      present++;
    } else if (student.status === "Absent") {
      absent++;
    }
  }

  document.getElementById("total-count").textContent = students.length;
  document.getElementById("present-count").textContent = present;
  document.getElementById("absent-count").textContent = absent;
}