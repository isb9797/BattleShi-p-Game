//Sergey Ilin for example of BattleShip Game

//Init vars of Application

const record = document.getElementById("record");
const shot = document.getElementById("shot");
const hit = document.getElementById("hit");
const dead = document.getElementById("dead");
const enemy = document.getElementById("enemy");
const header = document.querySelector(".header");
//Button
const again = document.getElementById("again");

//Play object
const play = {
  record: localStorage.getItem("seaBattleRecord") || 0,
  shot: 0,
  hit: 0,
  dead: 0,
  //Reactive update
  set updateData(data) {
    this[data] += 1;
    this.render();
  },
  render() {
    record.textContent = this.record;
    shot.textContent = this.shot;
    hit.textContent = this.hit;
    dead.textContent = this.dead;
  }
};

//Ships
const game = {
  ships: [],
  shipCount: 0,
  optionShip: {
    count: [1, 2, 3, 4],
    size: [4, 3, 2, 1]
  },
  //collision: [],
  collision: new Set(),
  generateShip() {
    for (let i = 0; i < this.optionShip.count.length; i++) {
      //console.log('count ' + this.optionShip.count[i]);
      for (let j = 0; j < this.optionShip.count[i]; j++) {
        //console.log('sizes ' + this.optionShip.size[i]);
        const size = this.optionShip.size[i];
        const ship = this.generateOptionShip(size);
        this.ships.push(ship);
        this.shipCount++;
      }
    }
  },
  generateOptionShip(shipSize) {
    const ship = {
      hit: [],
      location: []
    };

    const direction = Math.random() < 0.5;

    let x, y;
    // [0 to 0,9999999]
    //[0 -0.499999] / [0.5 - 0.999999]

    if (direction) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * (10 - shipSize));
    } else {
      x = Math.floor(Math.random() * (10 - shipSize));
      y = Math.floor(Math.random() * 10);
    }

    for (let i = 0; i < shipSize; i++) {
      if (direction) {
        ship.location.push(x + "" + (y + i));
      } else {
        ship.location.push(x + i + "" + y);
      }
      ship.hit.push("");
    }

    if (this.checkCollision(ship.location)) {
      return this.generateOptionShip(shipSize);
    }

    this.addCollision(ship.location);

    return ship;
  },
  checkCollision(location) {
    for (const coord of location) {
      if (this.collision.has(coord)) {
        return true;
      }
    }
  },
  addCollision(location) {
    for (let i = 0; i < location.length; i++) {
      const startCoorX = location[i][0] - 1;

      for (let j = startCoorX; j < startCoorX + 3; j++) {
        const startCoorY = location[i][1] - 1;

        for (let z = startCoorY; z < startCoorY + 3; z++) {
          if (j >= 0 && j < 10 && z >= 0 && z < 10) {
            const coord = j + "" + z;
            this.collision.add(coord);
          }
        }
      }
    }
  }
};

const show = {
  hit(elem) {
    this.changeClass(elem, "hit");
  },
  miss(elem) {
    this.changeClass(elem, "miss");
  },
  dead(elem) {
    this.changeClass(elem, "dead");
  },
  debug(elem) {
    this.changeClass(elem, "debug");
  },
  endGame(elem) {
    this.changeClass(elem, "end-game");
  },
  changeClass(elem, value) {
    elem.className = value;
  }
};

//Fire
const fire = event => {
  const target = event.target;
  if (target.classList.length !== 0 || target.tagName !== "TD") return;
  show.miss(target);
  play.updateData = "shot";

  //Find ship
  for (let i = 0; i < game.ships.length; i++) {
    const ship = game.ships[i];
    const index = ship.location.indexOf(target.id); //id ship
    if (index >= 0) {
      show.hit(target);
      play.updateData = "hit";
      ship.hit[index] = "X";

      const life = ship.hit.indexOf("");

      if (life < 0) {
        play.updateData = "dead";
        for (const id of ship.location) {
          show.dead(document.getElementById(id));
        }

        game.shipCount -= 1;
        if (game.shipCount < 1) {
          header.textContent = "Игра окончена";
          header.style.color = "red";

          //Disable click
          show.endGame(enemy);

          //Save record in to Browser
          if (play.shot < play.record || play.record === 0) {
            localStorage.setItem("seaBattleRecord", play.shot);
            play.record = play.shot;
            play.render();
          }
        }
      }
    }
  }
};



//Init Game
const init = () => {
  //onClick Watching
  enemy.addEventListener("click", fire);
  play.render();
  game.generateShip();
  

  again.addEventListener("click", () => {
    location.reload();
  });

  record.addEventListener("dblclick", () => {
    localStorage.clear();
    play.record = 0;
    play.render();
  });

  console.log(game.ships);
};

init();
