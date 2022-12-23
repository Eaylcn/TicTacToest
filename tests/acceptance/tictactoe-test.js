import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | tictactoe', function (hooks) {
  setupApplicationTest(hooks);


  test('The user can access other pages from the homepage', async function (assert) {
    await visit('/');
    assert.strictEqual(currentURL(), '/', "it doesn't redirect");
    assert.dom('[data-test-button-start]').exists('it renders a start button');
    await click('[data-test-button-start]');
    assert.strictEqual(currentURL(), '/game', 'the button links to /game');
  });

  test('The user can access instructions', async function (assert) {
    await visit('/how-to-play');
    assert.strictEqual(currentURL(), '/how-to-play', "it doesn't redirect");
    assert.dom('ol li').exists('it renders instructions');
    assert.dom('[data-test-button]').exists('it renders a start button');
    await click('[data-test-button]');
    assert.strictEqual(currentURL(), '/game', 'the button links to /game');
    await visit('/how-to-play');
    await click('[data-test-menu-center] a');
    assert.strictEqual(currentURL(), '/', 'the logo links to homepage');
  });

  test('The user can play a game', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    assert.dom('[data-test-cell-id="0"]').exists('it renders cells');
    await click('[data-test-cell-id="0"]');
    assert.dom('[data-test-cell-status="x"]').exists('game has started');
  });

  test('The user clicks how to play button while the game is running', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-menu-right] a');
    assert.strictEqual(currentURL(), '/how-to-play', "its instructions page");
    assert.dom('ol li').exists('it renders instructions');
  });

  test('The user clicks TicTacToe logo while the game is running', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-menu-center] a');
    assert.strictEqual(currentURL(), '/', "its homepage");
  });

  test('The user clicks restart button while the game is running', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
  });

  test('The O won the game from first column - The user clicks TicTacToe logo - The user goes to mainpage', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="6"]');
    assert.dom('[data-test-game--status="o"]').exists('first column o win');
    await click('[data-test-menu-center] a');
    assert.strictEqual(currentURL(), '/', "its homepage");
  });

  test('The X won the game from first column - The user clicks TicTacToe logo - The user goes to mainpage', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="6"]');
    assert.dom('[data-test-game--status="x"]').exists('first column x win');
    await click('[data-test-menu-center] a');
    assert.strictEqual(currentURL(), '/', "its homepage");
  });

  test('Result of the game is a draw  - The user clicks TicTacToe logo - The user goes to mainpage', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="8"]');
    await click('[data-test-cell-id="7"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
    await click('[data-test-menu-center] a');
    assert.strictEqual(currentURL(), '/', "its homepage");
  });

  test('The O won the game from second column - The user clicks how to play button - The user goes to mainpage', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="7"]');
    assert.dom('[data-test-game--status="o"]').exists('second column o win');
    await click('[data-test-menu-right] a');
    assert.strictEqual(currentURL(), '/how-to-play', "its instructions page");
  });

  test('The X won the game from second column - The user clicks how to play button - The user goes to mainpage', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="7"]');
    assert.dom('[data-test-game--status="x"]').exists('second column x win');
    await click('[data-test-menu-right] a');
    assert.strictEqual(currentURL(), '/how-to-play', "its instructions page");
  });

  test('Result of the game is a draw - The user clicks how to play button - The user goes to mainpage', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
    await click('[data-test-menu-right] a');
    assert.strictEqual(currentURL(), '/how-to-play', "its instructions page");
  });

  test('The O won the game from third column - The user clicks restart button - The X won the game from third column', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--status="o"]').exists('third column o win');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--status="x"]').exists('third column x win');
  });

  test('The X won the game from 0-8 diagonal way - The user clicks restart button - The X won the game from 2-6 diagonal way', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--status="x"]').exists('0-8 diagonal x win');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="6"]');
    assert.dom('[data-test-game--status="x"]').exists('2 - 6 diagonal x win');
  });

  test('Result of the game is a draw - The user clicks restart button - The X won the game from first row', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="8"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="0"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="2"]');
    assert.dom('[data-test-game--status="x"]').exists('first row x win');
  });

  test('The X won the game from second row - The user clicks restart button - The O won the game from first row', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="5"]');
    assert.dom('[data-test-game--status="x"]').exists('second row x win');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="8"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="2"]');
    assert.dom('[data-test-game--status="o"]').exists('first row o win');
  });

  test('The O won the game from 0-8 diagonal way - The user clicks restart button - The O won the game from 2-6 diagonal way', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--status="o"]').exists('0-8 diagonal o win');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="6"]');
    assert.dom('[data-test-game--status="o"]').exists('2 - 6 diagonal o win');
  });

  test('Result of the game is a draw - The user clicks restart button - The O won the game from second row', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="8"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="5"]');
    assert.dom('[data-test-game--status="o"]').exists('second row o win');
  });

  test('Result of the game is a draw - The user clicks restart button - Result of the game is a draw', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="8"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="6"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
  });

  test('The O won the game from third row - The user clicks restart button - Result of the game is a draw', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--status="o"]').exists('third row o win');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="8"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="3"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
  });

  test('The X won the game from third row - The user clicks restart button - Result of the game is a draw', async function (assert) {
    await visit('/game');
    assert.strictEqual(currentURL(), '/game', "it doesn't redirect");
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--status="x"]').exists('third row x win');
    await click('[data-test-button-restart]');
    assert.dom('[data-test-cell-status="x"]').doesNotExist('x isnt on screen');
    assert.dom('[data-test-cell-status="o"]').doesNotExist('o isnt on screen');
    assert.strictEqual(currentURL(), '/game', "game restarted");
    await click('[data-test-cell-id="2"]');
    await click('[data-test-cell-id="0"]');
    await click('[data-test-cell-id="4"]');
    await click('[data-test-cell-id="1"]');
    await click('[data-test-cell-id="3"]');
    await click('[data-test-cell-id="5"]');
    await click('[data-test-cell-id="7"]');
    await click('[data-test-cell-id="6"]');
    await click('[data-test-cell-id="8"]');
    assert.dom('[data-test-game--grid-active="inactive"]').exists('game is draw and inactive');
  });
});
