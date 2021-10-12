const request = new XMLHttpRequest();

function submitRequest(id) {
  //grab employee information from DOM
  let firstName = document.querySelector (`#firstName-${id}`);
  let lastName = document.querySelector (`#lastName-${id}`);
  let emailField = document.querySelector (`#email-${id}`);

  //change elements between editable and non-editable
  changeField(emailField,'email',isEditable_[id]);
  changeField(firstName,'text', isEditable_[id]);
  changeField(lastName,'text', isEditable_[id]);

  //if it was on edit mode, submit update the database
  if (isEditable_[id]) {
    request.open('POST', `/employee/edit/${id}`)
  }
  isEditable_[id] = !isEditable_[id]
}

function changeField (e,type,isEditable) {
  if (isEditable) {
    e.innerHTML = `${e.value}`
  } else {
    e.innerHTML = `<input type="${type}" value="${e.textContent}">`
  }
}