// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration. Can be found in the Project Settings > General > Your Apps
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create an li element for the task
function loadElement(doc) {
  var li = document.createElement("li");
  li.setAttribute("data-id", doc.id);
  var inputValue = doc.data().task;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  document.getElementById("myUL").appendChild(li);
}

//get the list of tasks and render it
const querySnapshot = await getDocs(collection(db, "tasks"));
querySnapshot.forEach((doc) => {
  loadElement(doc);
});

//pass the task that the user entered in the form to the database
const newTaskForm = document.getElementById("addingTask");
newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addData(newTaskForm.newTask.value);
});

//add the user's new task to their todo list
async function addData(newTask) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      task: newTask,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to delete it from the database
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = async function () {
    var taskId = this.parentElement.getAttribute("data-id");
    await deleteDoc(doc(db, "tasks", taskId));
  };
}
