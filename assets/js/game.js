
//Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
//"LOSE" - Player robot's health is zero or less


// function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();
   
    //fight each enemy robot by looping over them and fighting them one at a time
    for(var i =0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i+ 1) );
            

            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before startin new fight
            pickedEnemyObj.health = randomNumber(40,60);

            console.log (pickedEnemyObj);

            //pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
                //if player is still alive after the fight and we're not at the last enemy in the array
                if (playerInfo.health > 0 && i <enemyInfo.length -1) {
                    //ask if player wants to use the store before the next round
                    var storeConfirm = window.confirm ("The fight is over, visit the store before the next round?");
                    //if yes, take them to the store() function
                    if (storeConfirm) {
                        shop();
                   }
                }
        }
        //if player is not alive, break out of the loop and let the endGame function run
        else {
            break;
        } 
    }
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended.  Let's see how you did!");

    //check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    //if player have more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setIntem ("name", playerInfo.name);

        alert(playerInfo.name + " now had the high score of " +playerInfo.money + "!");
    }
    else { 
        alert(playerInfo.name + " did not beat the high score of " + highscore + "Maybe next time!");
    }
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm ("Would you like to play again?");

        if (playAgainConfirm) {
            startGame();
        }
        else { 
            window.alert ("Thank you for playing Robot Gladiators! Come back soon!")
        }
};

//fight function (now with parameters for enemy's object holding name, health and attack values)
var fight = function(enemy) {
    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    
    while(playerInfo.health > 0 && enemy.health >0) {
        if (isPlayerTurn) { 
            //ask if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }
        
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    
            //remove enemy health by subtracting the amount set in the playerInfo.attack variable

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining." );
            
            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");                
                //award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemy is dead
                break;
                } 
            else {
                    window.alert(enemy.name + " still has " + enemy.health + " health left. ");    
                }
                //player gets attaced first
        }
        else {
            var damage =randomNumber(enemy.attack - 3, enemy.attack);
        

        //remove player's health by subtracting the amount set in the enemy.attack variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
        enemy.name + " attacked " + playerInfo.name + " ." + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
        );

        //check player's heatlh
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died! ");
            //leave while() loop if player is dead
            break;
        } 
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. ");
        }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;

    }
};
 
 

//go to shop between battle functions
var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt= window.prompt ("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for'UPGRADE',  or 3 for 'LEAVE'.");
    
    
    //check if prompt was left blank, player hit "cancel" or provided a number instead
    if (shopOptionPrompt === null || shopOptionPrompt === ""  || isNaN(shopOptionPrompt)) {
        window.alert ("You need to provide a valid answer! Please try again.");
    return shop();
    }

    //convert answer from prompt to an actual number
    shopOptionPrompt = parseInt(shopOptionPrompt);
    
    //use switch to carry out action
    switch (shopOptionPrompt) { 
        case 1: 
            playerInfo.refillHealth();
            break;
            
        case 2: //new case
           playerInfo.upgradeAttack();
            break;

        case 3: //new case
            window.alert("Leaving the store");
            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

//function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name= prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};


//function to generate a random numeric value
var randomNumber = function(min,max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

//function to check if player want to fight or skip

var fightOrSkip= function() {
    //ask player if they'd like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    // conditional recursive function call 
    if (promptFight === "" || promptFight === null || !isNaN(promptFight)) {
        window.alert ("You need to provide a valid answer! Please try again.");
       // return fightOrSkip();
       return fightOrSkip();
    }
    
    //convert promptFight to all lowercase so we can check with less options
    promtFight = promptFight.toLowerCase();
    
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
    
        //subtract money from playerMoney for skipping, but don't let them go into the negativ
        playerInfo.money = Math.max (0, playerInfo.money - 10);
        //stop while() loop using break; and enter next fight

        //return true if player wants to leave
        return true;
        }
    }
      return false;
};

//GAME INFORMATION/VARIABLES

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money>=7) {
            window.alert("Refilling player's health by 20 for 7 dollars");
            this.health +=20;;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }       
    },
    upgradeAttack: function() {
        if (this.money >=7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;;
            this.money -=7;
        }
        else {
            window.alert("You don't ahve enough money!");
        }    
    }
};

var enemyInfo = [
    { 
        name: "Roborto",
        attack: randomNumber(10, 14)    
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];


startGame();



