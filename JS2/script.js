const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
const tableBody = document.getElementById("tableBody");

let dataLoaded = false;

// Load data from API
loadBtn.addEventListener("click", async function () {

    // Prevent loading the data more than once
    if (dataLoaded) {
        return;
    }

    loadBtn.disabled = true;
    loadBtn.textContent = "Loading...";

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/"
        );

        if (!response.ok) {
            throw new Error("Failed to load API data.");
        }

        const data = await response.json();

        // Display the data
        data.forEach(function (todo) {

            const row = document.createElement("tr");

            const userIdCell = document.createElement("td");
            const taskIdCell = document.createElement("td");
            const titleCell = document.createElement("td");
            const statusCell = document.createElement("td");

            userIdCell.textContent = todo.userId;
            taskIdCell.textContent = todo.id;
            titleCell.textContent = todo.title;

            if (todo.completed) {
                statusCell.textContent = "Completed";
                statusCell.classList.add("completed");
            } else {
                statusCell.textContent = "Not yet Completed";
                statusCell.classList.add("not-completed");
            }

            row.appendChild(userIdCell);
            row.appendChild(taskIdCell);
            row.appendChild(titleCell);
            row.appendChild(statusCell);

            tableBody.appendChild(row);
        });

        // Mark data as loaded
        dataLoaded = true;

        loadBtn.textContent = "Data Loaded";

    } catch (error) {

        console.error(error);

        alert("Error loading data from the API.");

        loadBtn.disabled = false;
        loadBtn.textContent = "Load data from the API";
    }
});


// Clear the table
clearBtn.addEventListener("click", function () {

    tableBody.innerHTML = "";

    // The data cannot be loaded again after it has already been loaded.
    if (dataLoaded) {
        loadBtn.disabled = true;
        loadBtn.textContent = "Data Already Loaded";
    }
}); 