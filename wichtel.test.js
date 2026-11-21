const test = require('node:test');
const assert = require('node:assert/strict');
const { parseNames, draw, encodeHash, decodeHash } = require('./wichtel.js');

test('parseNames trimmt und ignoriert Leerzeilen', () => {
  assert.deepEqual(parseNames(' Erna \n\nKlaus\n  Jürgen  \n'), { names: ['Erna', 'Klaus', 'Jürgen'] });
});
test('parseNames verweigert weniger als 3 Namen', () => {
  assert.deepEqual(parseNames('Erna\nKlaus'), { error: 'Bitte mindestens 3 Namen eingeben.' });
});
test('parseNames verweigert Duplikate ohne Groß/klein', () => {
  assert.deepEqual(parseNames('Oma\nKlaus\noma'), { error: 'Jeder Name darf nur einmal vorkommen.' });
});
test('draw: jeder gibt und bekommt genau einmal, nie sich selbst', () => {
  const names = ['A', 'B', 'C', 'D', 'E'];
  for (let i = 0; i < 200; i++) {
    const pairs = draw(names);
    assert.equal(pairs.length, 5);
    assert.deepEqual(pairs.map(p => p.giver).sort(), names);
    assert.deepEqual(pairs.map(p => p.receiver).sort(), names);
    for (const p of pairs) assert.notEqual(p.giver, p.receiver);
  }
});
test('draw liefert Paare in Eingabe-Reihenfolge (Liste verrät nichts)', () => {
  const names = ['A', 'B', 'C', 'D', 'E'];
  for (let i = 0; i < 50; i++) assert.deepEqual(draw(names).map(p => p.giver), names);
});
test('decodeHash verträgt angehängte Zeichen vom Messenger', () => {
  const h = encodeHash('Erna', 'Klaus');
  assert.deepEqual(decodeHash(h + '.'), { giver: 'Erna', receiver: 'Klaus' });
  assert.deepEqual(decodeHash(h + ')'), { giver: 'Erna', receiver: 'Klaus' });
});
test('encode/decode erhält Umlaute, Bindestrich und Emoji', () => {
  const h = encodeHash('Anne-Marie', 'Jürgen 🎅');
  assert.match(h, /^#[A-Za-z0-9_-]+$/);
  assert.deepEqual(decodeHash(h), { giver: 'Anne-Marie', receiver: 'Jürgen 🎅' });
});
test('decodeHash gibt null bei kaputtem oder leerem Link', () => {
  assert.equal(decodeHash(''), null);
  assert.equal(decodeHash('#'), null);
  assert.equal(decodeHash('#kaputt!!'), null);
  assert.equal(decodeHash(encodeHash('Erna', 'Klaus').slice(0, 8)), null);
});
