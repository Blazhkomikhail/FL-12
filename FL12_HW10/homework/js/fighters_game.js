function Fighter (obj) {
	const OWN_OBJ = obj;
	let currentHp = OWN_OBJ.hp;
	let combatHistory = {
		wins: 0, 
		losses: 0
	};

	function getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.getName = function() {
		return OWN_OBJ.name;
	}
	this.getDamage = function() {
		return OWN_OBJ.damage;
	}
	this.getStrength = function() {
		return OWN_OBJ.strength;
	}
	this.getAgility = function() {
		return OWN_OBJ.agility;
	}
	this.getHealth = function() {
		return currentHp;
	}
	this.attack = function(defender) {
		const MAX_ABILITY = 100;
		let randomNum = getRandomNumber(0, MAX_ABILITY);
		let successAttackAbility = MAX_ABILITY - ( defender.getStrength() + defender.getAgility() );
		if (randomNum > successAttackAbility) {
			defender.dealDamage(this.getDamage());
			console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`);
			
		} else {
			console.log(`${defender.getName()} attack missed`);
		}
	}
	this.dealDamage = function(amount) {
		currentHp -= amount;
		currentHp = currentHp <= 0 ? 0 : currentHp;
		return currentHp;
	}
	this.heal = function(healthAmount) {
		let totalHeal = currentHp + healthAmount;
		currentHp = totalHeal > OWN_OBJ.hp ? OWN_OBJ.hp : totalHeal;
	}
	this.logCombatHistory = function() {
		console.log(`Name: ${this.getName()}, Wins: ${combatHistory.wins}, Losses: ${combatHistory.losses}`); 
	}
	this.addWin = function() {
		combatHistory.wins++;
	}
	this.addLoss = function() {
		combatHistory.losses++;
	}

} 
function battle( battler1, battler2 ) { 
	let attackButtler = battler1;
	let defendingButtler = battler2;
	function isFighterFell() {
		if (defendingButtler.getHealth() === 0) {
			battler1.addWin();
			battler2.addLoss();
			console.log(`${attackButtler.getName()} has won!`);
		} 
	}
	if ( battler1.getHealth() && battler2.getHealth() ) {

		for (let i = 0; defendingButtler.getHealth() > 0; i++) {
			if (i % 2 === 0) {
				attackButtler = battler1;
				defendingButtler = battler2;
				attackButtler.attack(defendingButtler);
				isFighterFell();
			} else {
				attackButtler = battler2;
				defendingButtler = battler1;
				attackButtler.attack(defendingButtler);
				isFighterFell();
			}
		}
	} else {
		if (battler1.getHealth() === 0) {
			console.log(`${battler1.getName()} is dead and can't fight.`);
		} else {
			console.log(`${battler2.getName()} is dead and can't fight.`);
		}
	}
}

const fighter1 = new Fighter({name: 'Maximus', damage: 20, hp: 100, strength: 20, agility: 15});
const fighter2 = new Fighter({name: 'Commodus', damage: 25, hp: 90, strength: 25, agility: 20});

battle(fighter1,fighter2);