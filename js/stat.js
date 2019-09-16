'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_DENT = 20;

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(CLOUD_X, CLOUD_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + CLOUD_DENT);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH - CLOUD_DENT, CLOUD_Y + CLOUD_HEIGHT / 2);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + CLOUD_HEIGHT - CLOUD_DENT);
  ctx.lineTo(CLOUD_X, CLOUD_Y + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_X + CLOUD_DENT, CLOUD_Y + CLOUD_HEIGHT / 2);
  ctx.lineTo(CLOUD_X, CLOUD_Y);
  ctx.closePath();
  ctx.fill();
};
