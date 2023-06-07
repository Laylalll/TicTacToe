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
function computerMove() {
  const drawingPosition = getMostValuePosition()
  draw(drawingPosition, 'cross')
  positions['cross'].push(drawingPosition)
  clickingThrottle = true

  checkWinningCondition('cross')
}

function getMostValuePosition() {
  const emptyPositions = getEmptyPositions() //還能下的位置陣列
  const defendPositions = [] //能夠防止玩家勝利的位置陣列

  for (const hypothesisPosition of emptyPositions) {
    const copiedCrossPositions = Array.from(positions['cross']) //電腦已下的位置陣列
    const copiedCirclePositions = Array.from(positions['circle']) //玩家已下的位置陣列
    copiedCrossPositions.push(hypothesisPosition)
    copiedCirclePositions.push(hypothesisPosition)

    if (isPlayerWin(copiedCrossPositions)) {
      return hypothesisPosition
    }

    if (isPlayerWin(copiedCirclePositions)) {
      defendPositions.push(hypothesisPosition)
    }
  }

  if (defendPositions.length) {
    return defendPositions[0]
  }

  if (emptyPositions.includes(5)) {
    return 5
  }

  return emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
}

function checkWinningCondition(player) {
  const winningPlayer = isPlayerWin(positions[player])
  if (winningPlayer) {
    return alert(`${player} player won !`)
  }

  if (getEmptyPositions().length === 0) {
    return alert('Tied !')
  }

  clickingThrottle = false // 遊戲繼續，未結束
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
  if (clickingThrottle) return //控制遊戲推進：棋盤無法點擊

  const position = Number(event.target.dataset.index);

  draw(position, 'circle')
  positions['circle'].push(position)
  clickingThrottle = true

  setTimeout(() => {
    checkWinningCondition('circle');

    if (!clickingThrottle) {
      computerMove()
    }
  }, 500)
}

// executing
document.querySelectorAll('#app table tr td').forEach((cell) => {
  cell.addEventListener('click', onCellClicked)
})