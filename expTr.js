function saveToLocalStorage(event) {
  event.preventDefault();
  const amount = event.target.expense_amount.value;
  const description = event.target.expense_description.value;
  const category = event.target.expense_category.value;

  let expense_Details = {
    amount,
    description,
    category
  };

  axios
    .post(
      "https://crudcrud.com/api/aafe572e251842e5bb30a67e620f7a33/expenseData",
      expense_Details
    )
    .then((response) => {
      showExpenseOnScreen(response.data);
    })
    .catch(() => {
      document.body.innerHTML += "<h4>Something went wrong!!</h4>";
    });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/aafe572e251842e5bb30a67e620f7a33/expenseData"
    )
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        showExpenseOnScreen(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function showExpenseOnScreen(user) {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("items").value = "";

  const parentNode = document.getElementById("users");
  const childHTML = `<li id='${user._id}' style="background-color:lightcyan; font-size:20px; font-family:sans-serif">₹${user.amount} - ${user.description} - ${user.category} 
  <button onclick=editUser('${user.amount}','${user.description}','${user.category}','${user._id}') style="background-color:lightgreen; border-radius:5px;">Edit Expense</button> 
<button onclick=deleteUser('${user._id}') style="background-color:lightsalmon; border-radius:5px;">Delete Expense</button></li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(userId) {
  axios.delete(`https://crudcrud.com/api/aafe572e251842e5bb30a67e620f7a33/expenseData/${userId}`)
   .then(() => {
    removeUserFromScreen(userId)
   })
   .catch((err) => {
    console.log(err);
   });
}

function removeUserFromScreen(userId) {
  const parentNode = document.getElementById("users");
  const childNodeToBeDeleted = document.getElementById(userId);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function editUser(amount, description, category, userId) {
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  document.getElementById("items").value = category;
  deleteUser(userId);
}
