'use strict';

(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 430; // Размеры увеличены по сравнению с ТЗ из-за вогнутой формы облака
  var CLOUD_HEIGHT = 280; // Размеры увеличены по сравнению с ТЗ из-за вогнутой формы облака
  var CLOUD_DENT = 20;
  var CLOUD_COLOR = '#ffffff';
  var SHADOW_X = CLOUD_X + 10;
  var SHADOW_Y = CLOUD_Y + 10;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var GRAPH_LEFT_MARGIN = 150;
  var GRAPH_TOP_MARGIN = 100;
  var GRAPH_HEIGHT = 140; // Размеры уменьшены по сравнению с ТЗ из-за вогнутой формы облака
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
  var BAR_HUE = 240;
  var BAR_LIGHTNESS = 50;
  var TEXT_COLOR = '#000000';
  var TEXT_FONT = '16px PT Mono';
  var TEXT_MARGIN = 5;

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

  // Отрисовка текста

  var renderText = function (ctx, baseline, text, x, y) {
    ctx.font = TEXT_FONT;
    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseline = baseline;
    ctx.fillText(text, x, y);
  };

  // Настройка цвета столбцов диаграммы

  var setBarColor = function (playerName, playerColor, competitorHue) {
    var newColor;
    var saturation;

    if (playerName === 'Вы') {
      newColor = playerColor;
    } else {
      saturation = Math.floor(Math.random() * 100 + 1);
      newColor = 'hsl(' + String(competitorHue) + ', ' + String(saturation) + '%, ' + String(BAR_LIGHTNESS) + '%)';
    }
    return newColor;
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
    var barHeight;
    var barTopMargin;
    var barLeftMargin;

    for (var i = 0; i < times.length; i++) {
      // Настройка размеров и положения столбцов диаграммы
      barLeftMargin = GRAPH_LEFT_MARGIN + (BAR_WIDTH + BAR_GAP) * i;
      barHeight = times[i] / maxTime * GRAPH_HEIGHT;
      barTopMargin = GRAPH_TOP_MARGIN + (GRAPH_HEIGHT - barHeight);
      // Отрисовка столбцов диаграммы
      ctx.fillStyle = setBarColor(names[i], PLAYER_BAR_COLOR, BAR_HUE);
      ctx.fillRect(barLeftMargin, barTopMargin, BAR_WIDTH, barHeight);
      // Вывод подписей к столбцам диаграммы (результатов в миллисекундах и имен игроков)
      renderText(ctx, 'alphabetic', String(Math.round(times[i])), barLeftMargin, barTopMargin - TEXT_MARGIN);
      renderText(ctx, 'hanging', names[i], barLeftMargin, GRAPH_TOP_MARGIN + GRAPH_HEIGHT + TEXT_MARGIN);
    }
  };

  // Отрисовка окна статистики

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, SHADOW_X, SHADOW_Y, SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
    renderText(ctx, 'alphabetic', 'Ура, вы победили!', GRAPH_LEFT_MARGIN, 50);
    renderText(ctx, 'alphabetic', 'Список результатов:', GRAPH_LEFT_MARGIN, 65);
    renderGraph(ctx, names, times);
  };
})();
