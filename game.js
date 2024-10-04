const enemies = [
    { name: "Orc", health: 100, attack: 15, position: {} },
    { name: "Goblin", health: 50, attack: 10, position: {} },
    { name: "Troll", health: 120, attack: 20, position: {} },
    { name: "Knight", health: 80, attack: 18, position: {} },
    { name: "Mage", health: 60, attack: 12, position: {} },
    { name: "Beast", health: 90, attack: 16, position: {} },
    { name: "Dragon", health: 200, attack: 30, position: {} },
    { name: "Vampire", health: 70, attack: 14, position: {} },
    { name: "Zombie", health: 40, attack: 8, position: {} },
    { name: "Assassin", health: 75, attack: 19, position: {} }
];

let playerHealth = 100;
let playerPosition = { x: 0, y: 0 };

// Initialize enemies' positions
function initializeEnemyPositions() {
    enemies.forEach((enemy) => {
        enemy.position.x = Math.floor(Math.random() * 5);
        enemy.position.y = Math.floor(Math.random() * 5);
    });
}

function startGame() {
    initializeEnemyPositions();
    updateStatus();
    drawGrid();
}

function drawGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = ''; // Clear the grid
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (x === playerPosition.x && y === playerPosition.y) {
                cell.classList.add("player");
                cell.innerText = "P"; // Player marker
            }
            // Draw each enemy in the grid
            enemies.forEach((enemy) => {
                if (x === enemy.position.x && y === enemy.position.y) {
                    cell.classList.add("enemy");
                    cell.innerText = "E"; // Enemy marker
                }
            });
            grid.appendChild(cell);
        }
    }
}

function updateStatus() {
    document.getElementById("status").innerText = `Player Health: ${playerHealth}`;
}

// Move enemy towards the player
function moveEnemies() {
    enemies.forEach((enemy) => {
        if (enemy.health > 0) { // Only move alive enemies
            if (enemy.position.x < playerPosition.x) {
                enemy.position.x++;
            } else if (enemy.position.x > playerPosition.x) {
                enemy.position.x--;
            }
            if (enemy.position.y < playerPosition.y) {
                enemy.position.y++;
            } else if (enemy.position.y > playerPosition.y) {
                enemy.position.y--;
            }
        }
    });
}

// Attack logic
function attack() {
    enemies.forEach((enemy) => {
        if (isAdjacent(playerPosition, enemy.position)) {
            enemy.health -= Math.floor(Math.random() * 20 + 10);
            if (enemy.health <= 0) {
                alert(`You defeated the ${enemy.name}!`);
            } else {
                playerHealth -= enemy.attack;
                if (playerHealth <= 0) {
                    alert("You have been defeated!");
                    resetGame();
                }
            }
        }
    });
    moveEnemies(); // Move enemies after player action
    updateStatus();
    drawGrid();
}

// Movement logic for player (up, down, left, right)
function move(direction) {
    if (direction === 'up' && playerPosition.y > 0) playerPosition.y--;
    if (direction === 'down' && playerPosition.y < 4) playerPosition.y++;
    if (direction === 'left' && playerPosition.x > 0) playerPosition.x--;
    if (direction === 'right' && playerPosition.x < 4) playerPosition.x++;
    moveEnemies(); // Move enemies after player movement
    updateStatus();
    drawGrid();
}

// Magic logic
function fireball() {
    enemies.forEach((enemy) => {
        if (withinTwoSquares(playerPosition, enemy.position)) {
            enemy.health -= Math.floor(Math.random() * 30 + 15);
            if (enemy.health <= 0) {
                alert(`You defeated the ${enemy.name} with Fireball!`);
            }
        }
    });
    hideMagicButtons();
    updateStatus();
    drawGrid();
}

function thunderbolt() {
    enemies.forEach((enemy) => {
        enemy.health -= Math.floor(Math.random() * 40 + 20);
        if (enemy.health <= 0) {
            alert(`You defeated the ${enemy.name} with Thunderbolt!`);
        }
    });
    hideMagicButtons();
    updateStatus();
    drawGrid();
}

function hideMagicButtons() {
    document.getElementById("magic-buttons").style.display = "none";
}

// Initialize the game
startGame();

// Event listeners for buttons
document.getElementById("attack").addEventListener("click", attack);
document.getElementById("defend").addEventListener("click", defend);

// Move event listeners for directions
document.getElementById("move-up").addEventListener("click", () => move('up'));
document.getElementById("move-down").addEventListener("click", () => move('down'));
document.getElementById("move-left").addEventListener("click", () => move('left'));
document.getElementById("move-right").addEventListener("click", () => move('right'));

document.getElementById("magic").addEventListener("click", () => {
    document.getElementById("magic-buttons").style.display = "block";
});
document.getElementById("fireball").

