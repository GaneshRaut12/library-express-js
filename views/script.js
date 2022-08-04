fetch(`http://localhost:3000/get-author`)
  .then((data) => data.json())
  .then((data) => displayMessageDetails(data));

function deleteFunction(id) {
  fetch("http://localhost:3000/delete-author/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json()) // or res.json()
    .then((res) => console.log(res));
}

function updateFunction(
  firstNameUpdate,
  lastNameUpdate,
  dobUpdate,
  educationUpdate,
  updateId
) {
  console.log(typeof updateId);
  // let updata = JSON.stringify(id);
  // console.log(updata);
  let modal = document.getElementById("myDialog");
  modal.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = `
  <form method="post" action="/update-author/${updateId}">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="firstName" value="${firstNameUpdate}"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lastName" value="${lastNameUpdate}"><br>
  <label for="lname">DOB:</label><br>
  <input type="text" id="lname" name="dob" value="${dobUpdate}"><br>
  <label for="lname">Eduction:</label><br>
  <input type="text" id="lname" name="education" value="${educationUpdate}"><br>
  <input type="submit" value="PUT">
</form> `;
  modal.appendChild(div);
  document.getElementById("myDialog").showModal();
}
function displayMessageDetails(datas) {
  console.log(datas);
  let list = document.getElementById("author-data");
  list.innerHTML = "";
  for (let i = 0; i < datas.length; i++) {
    deleteId = datas[i]._id;
    updateId = datas[i]._id;
    firstNameUpdate = datas[i].firstName;
    lastNameUpdate = datas[i].lastName;
    dobUpdate = datas[i].dob;
    educationUpdate = datas[i].education;

    ll = datas[i];

    console.log(ll);
    const row = document.createElement("tr");
    row.innerHTML = `
     <td>${datas[i].firstName}</td>
     <td>${datas[i].lastName}</td> 
     <td>${datas[i].dob}</td> 
     <td>${datas[i].education}</td> 
     <td> <button onclick="deleteFunction('${deleteId}')">Delete</button> </td>
     <td> <button onclick="updateFunction( '${firstNameUpdate}', '${lastNameUpdate}' , '${dobUpdate}', '${educationUpdate}', '${updateId}')">Update</button> </td> `;
    list.appendChild(row);
  }
}
