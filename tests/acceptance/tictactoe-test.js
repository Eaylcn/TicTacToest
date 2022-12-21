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

    // Add your tests here!
    assert.strictEqual('Good luck writing tests!', 'Good luck writing tests!');
  });
});
