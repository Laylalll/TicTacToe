// variable
let count = 0
const positions = {
  circle: [],
  cross: [],
}
const checkingLines = [
  // 橫列
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // 直列
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  // 對角
  [1, 5, 9],
  [3, 5, 7],
];
let clickingThrottle = false //初始值，控制遊戲推進

// function
function checkWinningCondition(player) {
  const winningPlayer = isPlayerWin(positions[player])
  if (winningPlayer) {
    return alert(`${player} player won !`)
  }

  if (getEmptyPositions().length === 0) {
    return alert('Tied !')
  }

  clickingThrottle = false
}

function getEmptyPositions() {
  const allOccupiedPositions = positions['circle'].concat(positions['cross'])
  const allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return allPositions.filter((position) => !allOccupiedPositions.includes(position))
}

function isPlayerWin(checkingPositions) {
  // checkingPositions = [1, 4, 3, 2]
  for (const line of checkingLines) {
    // line = [1, 2, 3]
    if (line.every((position) => checkingPositions.includes(position))) {
      return true
    }
  }
  return false
}

function draw(position, shape) {
  const cell = document.querySelector(`#app table tr td[data-index='${position}']`)
  cell.innerHTML = `<div class='${shape}'></div>`;
}

function onCellClicked(event) {
  if (clickingThrottle) { return } //控制遊戲推進：棋盤無法點擊

  const position = Number(event.target.dataset.index);

  if (count % 2 === 0) {
    draw(position, 'circle')
    positions['circle'].push(position)
    clickingThrottle = true

    setTimeout(() => checkWinningCondition('circle'), 500)

  } else {
    draw(position, 'cross')
    positions['cross'].push(position)
    clickingThrottle = true

    setTimeout(() => checkWinningCondition('cross'), 500)
  }

  count++
}

// executing
document.querySelectorAll('#app table tr td').forEach((cell) => {
  cell.addEventListener('click', onCellClicked)
})