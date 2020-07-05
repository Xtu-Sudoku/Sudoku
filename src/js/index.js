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

var checktime = 0;
$("#check").on("click", e => {
    popupNumbers.hide();
    checktime++;
    console.log("checktime:", checktime);
    if (grid.check()) {
        count.timer_cease();
        alert("Congruations!");
        
        //获取名字
        var names = null;
        names = prompt("intput your name");
        console.log('names', names);
        $("#upload_name").attr("value", names);
        console.log("input name:", $("#upload_name").attr("value"));
        
        var stringtime = [];
        stringtime += $("#count_h")[0].innerHTML + ":" + $("#count_m")[0].innerHTML + ":" + $("#count_s")[0].innerHTML;
        console.log(typeof stringtime);
        console.log('h:m:s ->', stringtime);
        
        $("#upload_time").attr("value", stringtime);
        console.log("upload_time", $("#upload_time").attr("value"));
        console.log("lenth:", stringtime.length);
        
        $("#upload_checktime").attr("value", checktime);
        console.log("upload_checktime", $("#upload_checktime").attr("value"));
        
        var score = 80 + Math.random() * 20 - Math.random() * 2 - checktime;
        $("#upload_score").attr("value", Math.floor(score));
        console.log("upload_score", $("#upload_score").attr("value"));
        
        $("#s_submit").click();//提交

        checktime = 0;
        stringtime = null;
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


