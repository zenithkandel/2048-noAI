let grid_element = document.querySelector(".grid");
// let grid_sizes = ["4", "8", "16"];
let grid_size_chips = document.querySelectorAll(".grid-size");
let control_restart_chip = document.querySelector(".control-restart");
let control_pause_chip = document.querySelector(".control-pause");
let control_save_chip = document.querySelector(".control-save");
let game_arr = [];
if (!localStorage.getItem('game_arr')) {
    game_arr = [];
}
else {
    game_arr = localStorage.getItem("game_arr");
}

let game_size = "4";
let game_state = "running";//"paused" if paused


grid_size_chips.forEach(thing => {
    // console.log(thing);

    thing.onclick = function () {
        game_size = thing.getAttribute("value");
        // console.log(game_size);
        initializeGrid()
        renderGrid();
    }
});

function initializeGrid() {
    game_arr = [];
    for (let i = 0; i < game_size; i++) {
        tmp = [];
        for (let j = 0; j < game_size; j++) {
            tmp.push("0")
        }
        game_arr.push(tmp);
    }
    game_arr[0][1] = "2";
    game_arr[3][2] = "2";
    console.log(JSON.stringify(game_arr))
}

function renderGrid() {
    tmp = "";
    tmp = "<table>";
    for (let i = 0; i < game_size; i++) {
        // tmp = [];
        tmp += "<tr>"
        for (let j = 0; j < game_size; j++) {
            // tmp.push("0");
            tmp += "<td>" + ((game_arr[i][j] == "0") ? "⠀" : game_arr[i][j]) + "</td>";
        }
        // game_arr.push(tmp);
        tmp += "</tr>"
    }
    // console.log(JSON.stringify(game_arr))
    tmp += "</table>";
    grid_element.innerHTML = tmp;
}
initializeGrid()

renderGrid()

function generateNew() {
    success = false;
    free_pos = [];
    for (let i = 0; i < game_size; i++) {
        for (let j = 0; j < game_size; j++) {
            if (game_arr[i][j] == "0") {
                free_pos.push([i, j]);
            }
        }
    }
    pos = Math.floor(Math.random() * (free_pos.length - 1 - 0 + 1) + 0);
    // console.log(free_pos.length);
    if (free_pos.length > 0) {
        game_arr[free_pos[pos][0]][free_pos[pos][1]] = 2;
    }
    else {
        console.log("No empty place, game over");
        game_state = "ended";
    }
    renderGrid()
}
let status_element = document.querySelector(".status");
function swap([a, b], [c, d]) {
    status_element.innerHTML = `Swapping ${JSON.stringify([a, b])} with ${JSON.stringify([c, d])}`
    temp = game_arr[c][d];
    game_arr[c][d] = game_arr[a][b];
    game_arr[a][b] = temp;
    renderGrid();
}

function keyHandle() {
    document.onkeydown = function (e) {
        // swap(game_arr[0][1], game_arr[0][3]);

        status_element.innerHTML = `Key Press Detected ${e.key}<br>`;
        if (e.key == "ArrowRight") {
            for (let i = 0; i < game_size; i++) {
                for (let j = 0; j < game_size; j++) {
                    if (game_arr[i][j] != "0") {
                        status_element.innerHTML += `<br>nonempty found at ${JSON.stringify([i, j])}`


                        if (j - 1 < game_size) {
                            for (let k = j; k < game_size; k++) {
                                if (game_arr[i][k + 1] == "0") {
                                    swap([i, k], [i, k + 1]);
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        if (game_arr[i][j + 1] != "0" && game_arr[i][j + 1] == game_arr[i][j]) {
                            game_arr[i][j + 1] = JSON.parse(game_arr[i][j + 1]) + JSON.parse(game_arr[i][j]);
                            game_arr[i][j] = "0";
                        }
                    }
                }
            }
        }

        if (e.key == "ArrowLeft") {
            for (let i = 0; i < game_size; i++) {
                for (let j = 0; j < game_size; j++) {
                    if (game_arr[i][j] != "0") {
                        status_element.innerHTML += `<br>nonempty found at ${JSON.stringify([i, j])}`


                        if (j > 0) {
                            for (let k = j; k >= 0; k--) {
                                if (game_arr[i][k - 1] == "0") {
                                    swap([i, k], [i, k - 1]);
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        if (game_arr[i][j - 1] != "0" && game_arr[i][j - 1] == game_arr[i][j]) {
                            game_arr[i][j - 1] = JSON.parse(game_arr[i][j - 1]) + JSON.parse(game_arr[i][j]);
                            game_arr[i][j] = "0";
                        }
                    }
                }
            }
        }
        generateNew();
        renderGrid();
        // else if (e.key == "ArrowLeft") {
        //     for (let i = 0; i < game_size; i++) {
        //         for (let j = 0; j < game_size; j++) {
        //             if (game_arr[i][j] == "0") {
        //                 free_pos.push([i, j]);
        //             }
        //         }
        //     }
        // }
    }
}
keyHandle();
