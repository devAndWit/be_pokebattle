class Battlemachine {
  constructor(name, hp, attack, defense, specialAttack, specialDefense, speed) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
  }

  isAlive() {
    return this.hp > 0;
  }

  takeDamage(damage) {
    this.hp = Math.max(this.hp - damage, 0);
    console.log(`${this.name} nimmt ${damage} Schaden! HP: ${this.hp}`);
  }

  calculateDamage(attackStat, defenseStat) {
    let baseDamage = (attackStat / defenseStat) * 10;
    let randomFactor = Math.random() * 0.4 + 0.8; // Zufallsfaktor zwischen 0.8 und 1.2
    return Math.floor(baseDamage * randomFactor);
  }
}

function battle(pokemon1, pokemon2) {
  console.log(`Kampf beginnt: ${pokemon1.name} vs. ${pokemon2.name}\n`);

  // Wer beginnt? Falls gleich, zufällig entscheiden
  let attacker, defender;
  if (
    pokemon1.speed > pokemon2.speed ||
    (pokemon1.speed === pokemon2.speed && Math.random() > 0.5)
  ) {
    attacker = pokemon1;
    defender = pokemon2;
  } else {
    attacker = pokemon2;
    defender = pokemon1;
  }

  while (pokemon1.isAlive() && pokemon2.isAlive()) {
    console.log(`\n${attacker.name} greift an!`);

    // Entscheide ob physischer oder spezieller Angriff
    let damage = attacker.calculateDamage(
      attacker.specialAttack,
      defender.specialDefense
    );
    defender.takeDamage(damage);

    // Prüfe ob der Verteidiger besiegt wurde
    if (!defender.isAlive()) {
      console.log(
        `\n${defender.name} wurde besiegt! ${attacker.name} gewinnt! 🏆`
      );
      break;
    }

    // Rollen tauschen für die nächste Runde
    [attacker, defender] = [defender, attacker];
  }
}

// Pokémon erstellen
const fearow = new Battlemachine("Fearow", 65, 90, 65, 61, 61, 100);
const charizard = new Battlemachine("Charizard", 78, 84, 78, 109, 85, 100);

// Kampf starten
battle(fearow, charizard);
