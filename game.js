const enemies = [
    { name: "Orc", health: 100, attack: 15 },
    { name: "Goblin", health: 50, attack: 10 },
    { name: "Troll", health: 120, attack: 20 },
    { name: "Knight", health: 80, attack: 18 },
    { name: "Mage", health: 60, attack: 12 },
    { name: "Beast", health: 90, attack: 16 },
    { name: "Dragon", health: 200, attack: 30 },
    { name: "Vampire", health: 70, attack: 14 },
    { name: "Zombie", health: 40, attack: 8 },
    { name: "Assassin", health: 75, attack: 19 }
];

let playerHealth = 100;
let currentEnemy = {};
let enemyAttack = 0;
let playerPosition = { x: 0, y: 0 };
let enemyPosition = { x: 0, y: 0 };

function startGame() {
    const randomEnemyIndex = Math.floor(Math.random() * enemies.length);
    currentEnemy = { ...enemies[randomEnemyIndex] };
    enemyAttack = currentEnemy.attack;

    // Set random positions for player and enemy
    playerPosition = { x: 0, y: 0 };
    enemyPosition = { x: Math.floor(Math.random() * 5), y: Math.floor(Math.random() * 5) };

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
            } else if (x === enemyPosition.x && y === enemyPosition.y) {
                cell.classList.add("enemy");
                cell.innerText = "E"; // Enemy marker
            }
            grid.appendChild(cell);
        }
    }
}

function updateStatus() {
    document.getElementById("status").innerText = `
        Player Health: ${playerHealth}
        Enemy: ${currentEnemy.name} (Health: ${currentEnemy.health})
    `;
}

// Calculate distance between player and enemy
function isAdjacent(pos1, pos2) {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return dx + dy === 1; // adjacent if the sum of the deltas is 1
}

// Calculate if enemy is within 2 squares for fireball
function withinTwoSquares(pos1, pos2) {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return dx <= 2 && dy <= 2; 
}

function attack() {
    if (isAdjacent(playerPosition, enemyPosition)) {
        currentEnemy.health -= Math.floor(Math.random() * 20 + 10);
        if (currentEnemy.health <= 0) {
            alert(`You defeated the ${currentEnemy.name}!`);
            startGame();
        } else {
            if (isAdjacent(playerPosition, enemyPosition)) {
                playerHealth -= enemyAttack;
            }
            if (playerHealth <= 0) {
                alert("You have been defeated!");
                resetGame();
            }
        }
        updateStatus();
        drawGrid();
    } else {
        alert("You must be next to the enemy to attack!");
    }
}

function defend() {
    playerHealth -= Math.floor(enemyAttack / 2);
    updateStatus();
    drawGrid();
}

// Movement logic for player (up, down, left, right)
function move(direction) {
    if (direction === 'up' && playerPosition.y > 0) playerPosition.y--;
    if (direction === 'down' && playerPosition.y < 4) playerPosition.y++;
    if (direction === 'left' && playerPosition.x > 0) playerPosition.x--;
    if (direction === 'right' && playerPosition.x < 4) playerPosition.x++;
    if (isAdjacent(playerPosition, enemyPosition)) {
        playerHealth -= enemyAttack;
        if (playerHealth <= 0) {
            alert("You have been defeated!");
            resetGame();
        }
    }
    updateStatus();
    drawGrid();
}

// Magic logic
function fireball() {
    if (withinTwoSquares(playerPosition, enemyPosition)) {
        currentEnemy.health -= Math.floor(Math.random() * 30 + 15);
        if (currentEnemy.health <= 0) {
            alert(`You defeated the ${currentEnemy.name} with Fireball!`);
            startGame();
        }
    } else {
        alert("Fireball can only hit enemies within 2 squares of you!");
    }
    updateStatus();
    drawGrid();
    hideMagicButtons();
}

function thunderbolt() {
    currentEnemy.health -= Math.floor(Math.random() * 40 + 20);
    if (currentEnemy.health <= 0) {
        alert(`You defeated the ${currentEnemy.name} with Thunderbolt!`);
        startGame();
    }
    updateStatus();
    drawGrid();
    hideMagicButtons();
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
document.getElementById("fireball").addEventListener("click", fireball);
document.getElementById("thunderbolt").addEventListener("click", thunderbolt);

