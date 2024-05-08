// document.addEventListener("DOMContentLoaded", function () {
//     // setTimeout(() => { alert("External JS called!") }, 2000);

//     document.getElementById("clickButton").addEventListener("click", AddNewCustomer);
// });

async function fetchData() {
    try {
        const response = await fetch("/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }); 
        const data = await response.json();     // Parse the JSON response

        populateTable(data); // Call a function to populate the table with fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function populateTable(data) {
    const table = document.createElement("table");
    table.className = "table table-striped";

    // Create table header
    const headerRow = document.createElement("tr");
    for (const key in data[0]) {
        const th = document.createElement("th");
        th.textContent = key.toUpperCase();
        headerRow.appendChild(th);
    }

     // Add a column for the delete button
     const deleteHeader = document.createElement("th");
     deleteHeader.textContent = "ACTION";
     headerRow.appendChild(deleteHeader);
    table.appendChild(headerRow);

    // Create table rows with data
    data.forEach(item => {
        const row = document.createElement("tr");
        for (const key in item) {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            row.appendChild(cell);
        }


        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", (event) => {

            const row = event.target.closest("tr");
            const customerId = row.dataset; // Adjust this based on your data structure


            console.log(customerId);
            // deleteCustomer(item.customerId);
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        table.appendChild(row);
    });

    const FetchButton = document.getElementById("clickButton");
    FetchButton.style.display = 'none';

    const DataButton = document.getElementById("addBtn");
    DataButton.style.display = 'flex';
    DataButton.style.backgroundColor = 'darkkhaki';

    const CustomerName = document.getElementById('cstNm');
    CustomerName.style.display = 'flex';

    const dynamicDiv = document.getElementById("dynamicDiv");
    dynamicDiv.innerHTML = "";
    dynamicDiv.appendChild(table);
}

async function AddNewCustomer() {
    let NewCstmr = document.getElementById('cstNm').value;

    if (!NewCstmr) {
        alert(`Please enter Customer Name.`);
        return;
    }

    try {
        const response = await fetch("/newUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ NewCustomer: NewCstmr })
        });

        if (response.ok) {
            alert("New customer added successfully!");
            document.getElementById('cstNm').value = "";
            fetchData(); // Refresh data after adding new customer
        } else {
            alert("Failed to add a new customer.");
        }
    } catch (error) {
        console.error("Error adding new customer:", error);
    }
}

// Add function to handle editing user

async function deleteCustomer(customerId) {
    alert(customerId)
    // try {
    //     const response = await fetch("/deleteUser", {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ CustomerID: customerId })
    //     });

    //     // if (response.ok) {
    //     //     alert("Customer deleted successfully!");
    //     //     fetchData(); // Refresh data after deleting customer
    //     // } else {
    //     //     const errorMessage = await response.text();
    //     //     console.error("Failed to delete customer:", errorMessage);
    //     //     alert("Failed to delete customer. See console for details.");
    //     // }
    // } catch (error) {
    //     console.error("Error deleting customer:", error);
    //     alert("Failed to delete customer. See console for details.");
    // }
}

// // Example usage of deleteCustomer function
// const customerIdToDelete = 2; // Replace 123 with the actual customerId
// deleteCustomer(customerIdToDelete);































