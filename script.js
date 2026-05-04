let grid_element = document.querySelector(".grid");
// let grid_sizes = ["4", "8", "16"];
let grid_size_chips = document.querySelectorAll(".grid-size");
let control_restart_chip = document.querySelector(".control-restart");
let control_pause_chip = document.querySelector(".control-pause");
let control_save_chip = document.querySelector(".control-save");

if (!localStorage.getItem('game_arr')) {
    let game_arr = [];
}
else {
    let game_arr = localStorage.getItem("game_arr");
}

let game_size = "4";
let game_state = "running";//"paused" if paused

// console.log(grid_size_chips)
grid_size_chips.forEach(thing => {
    // console.log(thing);

    thing.onclick = function () {
        game_size = thing.getAttribute("value");
        console.log(game_size);
    }
});