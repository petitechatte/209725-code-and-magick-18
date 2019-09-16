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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHADOW_X, SHADOW_Y, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
};
