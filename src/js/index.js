const Grid=require("./ui/grid");
const PopupNumbers = require('./ui/popupnumbers');

//九宫格的显示
const grid = new Grid($("#container"));
grid.build();
grid.layout();

//创建一个popupNumbers对象，绑定弹出窗口
const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);
