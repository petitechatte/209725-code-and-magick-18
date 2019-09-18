'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_DENT = 20;
var CLOUD_COLOR = '#ffffff';
var SHADOW_X = CLOUD_X + 10;
var SHADOW_Y = CLOUD_Y + 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var GRAPH_LEFT_MARGIN = 150;
var GRAPH_TOP_MARGIN = 90;
var GRAPH_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

// Отрисовка облака

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_DENT);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_DENT, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - CLOUD_DENT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_DENT, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
};

// Поиск наибольшего значения массива

var getMaxValue = function (array) {
  var maxValue = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

// Построение диаграммы результатов игры

var renderGraph = function (ctx, names, times) {
  var maxTime = getMaxValue(times);
  var saturation = 100;
  var barHeight = GRAPH_HEIGHT;
  var barTopMargin = GRAPH_TOP_MARGIN;
  var barLeftMargin = GRAPH_LEFT_MARGIN;

  for (var i = 0; i < times.length; i++) {
    var newColor = PLAYER_BAR_COLOR;
    if (i > 0) {
      saturation = Math.floor((Math.random() * 100));
      newColor = 'hsl(240, ' + saturation + '%, 50%)';
    }
    barLeftMargin = GRAPH_LEFT_MARGIN + (BAR_WIDTH + BAR_GAP) * i;
    barHeight = times[i] / maxTime * GRAPH_HEIGHT;
    barTopMargin = GRAPH_TOP_MARGIN + (GRAPH_HEIGHT - barHeight);
    ctx.fillStyle = newColor;
    ctx.fillRect(barLeftMargin, barTopMargin, BAR_WIDTH, barHeight);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', GRAPH_LEFT_MARGIN, 50);
  ctx.fillText('Список результатов:', GRAPH_LEFT_MARGIN, 70);
  renderGraph(ctx, names, times);
};
