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
    tableContents += `<td class="flex-column">${iterateThroughEmployees(employees,daysOfWeek[i])}</td>`
  }
  return tableContents
}

function iterateThroughEmployees (employees,day) {
  let tdContents = ''
  for (let i = 0; i < employees.length; i++){
      tdContents += addEmployee(employees[i],day)
    }
  return tdContents
}

function addEmployee (employee,day){
  if (employee.availability[day] === true) {
    return `<div class="schedule-unit">${employee.firstName} ${employee.lastName}</div>`
  }
}

module.exports = populateTable;