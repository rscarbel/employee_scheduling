const modal = document.querySelector('.modal');

function displayForm (id) {
  showModal();
  modal.innerHTML = `<form class="shadow" action="/employee/edit/${id}" method="POST" autocomplete="off">
  <label>First Name:
      <input type="text" name="firstName" value="${employees[id].firstName}" required>
  </label>
  <label>Last Name:
      <input type="text" value="${employees[id].lastName}" name="lastName" required>
  </label>
  <label>Email:
    <input type="email" name="email" value="${employees[id].email}" required>
</label>
<label>Availability:
  <div class="flex-column">
  <label> Monday:
    <input type="checkbox" value="true" name="monday" ${employees[id].availability.monday ? 'checked' : ''}>
  </label>
  <label> Tuesday:
    <input type="checkbox" value="true" name="tuesday" ${employees[id].availability.tuesday ? 'checked' : ''}>
  </label>
  <label> Wednesday:
    <input type="checkbox" value="true" name="wednesday" ${employees[id].availability.wednesday ? 'checked' : ''}>
  </label>
  <label> Thursday:
    <input type="checkbox" value="true" name="thursday" ${employees[id].availability.thursday ? 'checked' : ''}>
  </label>
  <label> Friday:
    <input type="checkbox" value="true" name="friday" ${employees[id].availability.friday ? 'checked' : ''}>
  </label>
  <label> Saturday:
    <input type="checkbox" value="true" name="saturday" ${employees[id].availability.saturday ? 'checked' : ''}>
  </label>
  <label> Sunday:
    <input type="checkbox" value="true" name="sunday" ${employees[id].availability.sunday ? 'checked' : ''}>
  </label>
</div>
</label>
<div class="flex-container">
<button class="shadow">Save Changes</button>
<button type="button" onclick="modal.style.display = 'none';document.querySelector('form').remove()" class="shadow">Cancel</button>
</div>
</form>`
}

function showModal () {
  modal.style.display = 'flex'
}

function hideModal (event) {
  if (event.target === modal) {
    document.querySelector('form').remove();
    modal.style.display = 'none'
  }
}

const request = new XMLHttpRequest();

function deleteItem(id) {
  alert('howdy')
}