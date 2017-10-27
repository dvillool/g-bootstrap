'use strict';

function init () {
  console.log('here we go');

  var parentElement = document.getElementById('game-container');
  var game = new Game(parentElement);
  game.init();

  document.getElementById('btn-reset').addEventListener('click', function () {
    game.reset();
  });

  // window.addEventListener('resize', function () {
  //   app.resize();
  // });
}

document.addEventListener('DOMContentLoaded', init);
