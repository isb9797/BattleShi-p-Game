//Sergey Ilin for example of BattleShip Game

//First Part of Game


const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');

//Button
const again = document.getElementById('again');


//Play object
const play = {
    record: 0,
    shot: 0,
    hit: 0,
    dead: 0,
    //Reactive update
    set updateData(data){
        this[data] += 1;
        this.render();
    },
    render(){
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
};


const show = {
    hit(){

    },
    miss(elem){
        this.changeClass(elem, 'miss');
    },
    dead(){

    },
    changeClass(elem, value){
        elem.className = value;
    }
};


//Fire
const fire = (event) =>{
    const target = event.target;
    show.miss(target);
    play.updateData = 'shot';
  

    
    
}

//Init Game
const init = () =>{
    //onClick Watching
    enemy.addEventListener('click', fire);

}

init();

