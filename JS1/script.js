// Stores all records
let records = [];

// Stores the index of the record being edited
let editIndex = -1;


// Get the values from the input fields
function getInputValues() {

    let firstName =
        document.getElementById("firstName").value.trim();

    let middleName =
        document.getElementById("middleName").value.trim();

    let lastName =
        document.getElementById("lastName").value.trim();

    let age =
        document.getElementById("age").value.trim();

    return {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        age: age
    };
}


// Insert or Update
function insertOrUpdate() {

    let person = getInputValues();


    // Check if all fields are filled
    if (
        person.firstName === "" ||
        person.middleName === "" ||
        person.lastName === "" ||
        person.age === ""
    ) {

        alert("Please complete all fields.");

        return;
    }


    // Check age
    if (Number(person.age) < 0) {

        alert("Age cannot be negative.");

        return;
    }


    // INSERT
    if (editIndex === -1) {

        records.push(person);

    }

    // UPDATE
    else {

        records[editIndex] = person;

        editIndex = -1;

        document.getElementById("mainButton").textContent =
            "Insert";
    }


    // Clear input fields
    clearInputs();

    // Display records
    displayRecords();
}


// Display records
function displayRecords() {

    let table =
        document.getElementById("recordsTable");

    let body =
        document.getElementById("recordsBody");

    let noRecords =
        document.getElementById("noRecords");


    // Clear old table
    body.innerHTML = "";


    // If there are no records
    if (records.length === 0) {

        table.style.display = "none";

        noRecords.style.display = "block";

        return;
    }


    // Show table
    table.style.display = "table";

    noRecords.style.display = "none";


    // Create table rows
    records.forEach(function(person, index) {

        let row = document.createElement("tr");


        row.innerHTML = `
            <td>${escapeHTML(person.firstName)}</td>

            <td>${escapeHTML(person.middleName)}</td>

            <td>${escapeHTML(person.lastName)}</td>

            <td>${escapeHTML(person.age)}</td>

            <td>
                <button
                    class="action-button"
                    onclick="deleteRecord(${index})">
                    Delete
                </button>

                <button
                    class="action-button"
                    onclick="editRecord(${index})">
                    Edit
                </button>
            </td>
        `;


        body.appendChild(row);

    });
}


// Edit record
function editRecord(index) {

    let person = records[index];


    document.getElementById("firstName").value =
        person.firstName;

    document.getElementById("middleName").value =
        person.middleName;

    document.getElementById("lastName").value =
        person.lastName;

    document.getElementById("age").value =
        person.age;


    // Remember which record is being edited
    editIndex = index;


    // Change Insert button to Update
    document.getElementById("mainButton").textContent =
        "Update";


    // Scroll to form
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Delete one record
function deleteRecord(index) {

    if (
        confirm("Are you sure you want to delete this record?")
    ) {

        records.splice(index, 1);

        displayRecords();
    }
}


// Clear input fields
function clearInputs() {

    document.getElementById("firstName").value = "";

    document.getElementById("middleName").value = "";

    document.getElementById("lastName").value = "";

    document.getElementById("age").value = "";


    // Reset edit mode
    editIndex = -1;


    // Change Update back to Insert
    document.getElementById("mainButton").textContent =
        "Insert";
}


// Clear all records
function clearRecords() {

    if (records.length === 0) {

        alert("There are no records.");

        return;
    }


    if (
        confirm("Are you sure you want to clear all records?")
    ) {

        records = [];

        clearInputs();

        displayRecords();
    }
}


// Sort records
function sortRecords() {

    let field =
        document.getElementById("sortField").value;

    let order =
        document.getElementById("sortOrder").value;


    records.sort(function(a, b) {

        let valueA = a[field];

        let valueB = b[field];


        // Sort age as numbers
        if (field === "age") {

            valueA = Number(valueA);

            valueB = Number(valueB);


            if (order === "asc") {

                return valueA - valueB;

            } else {

                return valueB - valueA;
            }
        }


        // Sort names alphabetically
        valueA = valueA.toLowerCase();

        valueB = valueB.toLowerCase();


        if (valueA < valueB) {

            return order === "asc" ? -1 : 1;
        }


        if (valueA > valueB) {

            return order === "asc" ? 1 : -1;
        }


        return 0;
    });


    displayRecords();
}


// Save records to Local Storage
function saveToLocalStorage() {

    if (records.length === 0) {

        alert("There are no records to save.");

        return;
    }


    localStorage.setItem(
        "javascriptRecords",
        JSON.stringify(records)
    );


    alert("Records successfully saved!");
}


// Load records from Local Storage
function loadFromLocalStorage() {

    let savedRecords =
        localStorage.getItem("javascriptRecords");


    if (savedRecords) {

        records = JSON.parse(savedRecords);

        displayRecords();
    }
}


// Prevent HTML injection
function escapeHTML(value) {

    let div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// Load saved records when the page starts
loadFromLocalStorage();