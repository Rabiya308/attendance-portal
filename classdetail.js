
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref,set,get,remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCYVTIuLoBEwhG89uOhnlLtgiozwKhKOKk",
  authDomain: "class-details-2f1a3.firebaseapp.com",
  projectId: "class-details-2f1a3",
  storageBucket: "class-details-2f1a3.appspot.com",
  messagingSenderId: "476388234370",
  appId: "1:476388234370:web:0d95d61d57a731316cd09b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



// const form = document.getElementById("attendance-form");
// const attendanceList = document.getElementById("attendance-list");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

  // Get form values
  const classTiming = document.getElementById("class-timing").value;
  const schedule = document.getElementById("schedule").value;
  const teacherName = document.getElementById("teacher-name").value;
  const sectionName = document.getElementById("section-name").value;
  const courseName = document.getElementById("course-name").value;
  const batchNumber = document.getElementById("batch-number").value;

  // Create a new attendance record object
  function insertData(){
  set(ref(database,"Thestudents/"+courseName.value),{
      timing: classTiming.value,
      schedule: schedule.value,
      teacher: teacherName.value,
      section: sectionName.value,
      course: courseName.value,
      batch: batchNumber.value
  })
  .then(()=>{
   alert("data stored successfully")
  })
  .catch((error)=>{
    alert("un successfull"+ error)
   })
 
  }
  insbtn.addEventListener('click',insertData)
  // Add the record to Firebase
  // attendanceRef.push(attendanceRecord);

  // Clear form fields
//   form.reset();
// });

// function displayAttendanceList() {
//   // Clear the existing list
//   attendanceList.innerHTML = "";

//   // Read attendance records from Firebase
//   get(ref(database,'attendance/', (snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//           const record = childSnapshot.val();

//           const listItem = document.createElement("div");
//           listItem.classList.add("attendance-record");

//           listItem.innerHTML = `
//               <p><strong>Class Timing:</strong> ${record.timing}</p>
//               <p><strong>Schedule:</strong> ${record.schedule}</p>
//               <p><strong>Teacher's Name:</strong> ${record.teacher}</p>
//               <p><strong>Section Name:</strong> ${record.section}</p>
//               <p><strong>Course Name:</strong> ${record.course}</p>
//               <p><strong>Batch Number:</strong> ${record.batch}</p>
//               <button onclick="deleteAttendance('${childSnapshot.key}')">Delete</button>
//           `;

//           attendanceList.appendChild(listItem);
//       });
//   })
// }

// function deleteAttendance(key) {
//   // Remove the attendance record from Firebase
//   remove(ref(database,"attendance/" + key))
//   displayAttendanceList();
// }

// // Initial display of attendance list
// displayAttendanceList();
