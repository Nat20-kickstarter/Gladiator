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

function startGame() {
    const randomEnemyIndex = Math.floor(Math.random() * enemies.length);
    currentEnemy = { ...enemies[randomEnemyIndex] };
    enemyAttack = currentEnemy.attack;
    updateStatus();
}

function updateStatus() {
    document.getElementById("status").innerText = `
        Player Health: ${playerHealth}
        Enemy: ${currentEnemy.name} (Health: ${currentEnemy.health})
    `;
}

function attack() {
    currentEnemy.health -= Math.floor(Math.random() * 20 + 10);
    if (currentEnemy.health <= 0) {
        alert(`You defeated the ${currentEnemy.name}!`);
        startGame();
    } else {
        playerHealth -= enemyAttack;
        if (playerHealth <= 0) {
            alert("You have been defeated!");
            resetGame();
        }
    }
    updateStatus();
}

function defend() {
    playerHealth -= Math.floor(enemyAttack / 2);
    updateStatus();
}

function throwWeapon() {
    currentEnemy.health -= Math.floor(Math.random() * 15 + 5);
    if (currentEnemy.health <= 0) {
        alert(`You defeated the ${currentEnemy.name}!`);
        startGame();
    } else {
        playerHealth -= enemyAttack;
        if (playerHealth <= 0) {
            alert("You have been defeated!");
            resetGame();
        }
    }
    updateStatus();
}

function useMagic() {
    document.getElementById("magic-buttons").style.display = "block";
}

function fireball() {
    currentEnemy.health -= Math.floor(Math.random() * 30 + 15);
    if (currentEnemy.health <= 0) {
        alert(`You defeated the ${currentEnemy.name}!`);
        startGame();
    } else {
        playerHealth -= enemyAttack;
        if (playerHealth <= 0) {
            alert("You have been defeated!");
            resetGame();
        }
    }
    updateStatus();
    hideMagicButtons();
}

function thunderbolt() {
    currentEnemy.health -= Math.floor(Math.random() * 40 + 20);
    if (currentEnemy.health <= 0) {
        alert(`You defeated the ${currentEnemy.name}!`);
        startGame();
    } else {
        playerHealth -= enemyAttack;
        if (playerHealth <= 0) {
            alert("You have been defeated!");
            resetGame();
        }
    }
    updateStatus();
    hideMagicButtons();
}

function hideMagicButtons() {
    document.getElementById("magic-buttons").style.display = "none";
}

function resetGame() {
    playerHealth = 100;
    startGame();
}

document.getElementById("attack").addEventListener("click", attack);
document.getElementById("defend").addEventListener("click", defend);
document.getElementById("throw").addEventListener("click", throwWeapon);
document.getElementById("magic").addEventListener("click", useMagic);
document.getElementById("fireball").addEventListener("click", fireball);
document.getElementById("thunderbolt").addEventListener("click", thunderbolt);

// Start the game when the page loads
startGame();
