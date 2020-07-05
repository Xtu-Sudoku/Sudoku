const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popupnumbers");
const Count = require("./core/count");

const grid = new Grid($("#container"));
grid.build();
grid.layout();

const count = new Count();
count.onload();

const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);




$("#check").on("click", e => {
    popupNumbers.hide();
    if (grid.check()) {
        alert("Congruations!");
    }
});

$("#reset").on("click", e => {
    popupNumbers.hide();
    grid.reset();
});

$("#clear").on("click", e => {
    popupNumbers.hide();
    grid.clear();
});

$("#rebuild").on("click", e => {
    popupNumbers.hide();
    grid.rebuild();
    count.stop();
    count.onload();
});

// $("#ranking").on("click", e => {
    $(function () {
        $.get('http://localhost:3000/', function (data) {
            for (let list of data) {
                let table = '<tr class="tbd"><td>';
                let s = '</td><td>';
                for (let ele of list) {
                    table += (ele + s);
                }
                table += '</td></tr>';
                $("#tab").append(table);
            }
        });
    });
// });