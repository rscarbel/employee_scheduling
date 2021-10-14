const scheduleCells = document.querySelectorAll('.schedule-cell');
const availableCells = document.querySelectorAll('.available-cell');
const allPersonNodes = document.querySelectorAll('.schedule-unit')

for (let i = 0; i < allPersonNodes.length; i++) {
  allPersonNodes[i].addEventListener('click', function(){moveNode(allPersonNodes[i])})
}


function moveNode (node) {
  const isScheduled = !!parseInt(node.dataset.scheduled);
  const dayIndex = parseInt(node.dataset.index);
  if (isScheduled) {
    availableCells[dayIndex].prepend(node);
    node.dataset.scheduled = 0;
  } else {
    scheduleCells[dayIndex].append(node);
    node.dataset.scheduled = 1;
  }
}