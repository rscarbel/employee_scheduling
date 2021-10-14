const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

function populateTable (employees) {
  let tableContents = '';
  for (let i = 0; i < 7; i++) {
    tableContents += `<td id="${daysOfWeek[i]}-available" class="available-cell schedule-cell-container">${iterateThroughEmployees(employees,daysOfWeek[i],i)}</td>`
  }
  return tableContents
}

function iterateThroughEmployees (employees,day,dayIndex) {
  let tdContents = ''
  for (let i = 0; i < employees.length; i++){
      tdContents += addEmployee(employees[i],day,dayIndex)
    }
  return tdContents
}

function addEmployee (employee,day,dayIndex){
  if (employee.availability[day] === true) {
    return `<div data-index="${dayIndex}" data-scheduled="0" class="schedule-unit small-shadow ${day}">${employee.firstName} ${employee.lastName}</div>`
  } else {
    return ''
  }
}

module.exports = populateTable;