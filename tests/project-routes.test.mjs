import test from 'node:test';
import assert from 'node:assert/strict';
import { readLocation, projectHash } from '../public/project-routes.js';

const gearbox = { slug: 'cycloidal-gearbox' };
const hand = { slug: 'robotic-hand-v1' };
const projects = [gearbox, hand];

test('shared project links reopen their project on the requested portfolio page', () => {
  for (const route of ['home', 'experience', 'projects']) {
    assert.deepEqual(readLocation(projectHash(gearbox, route), projects), { route, project: gearbox });
  }
  assert.equal(projectHash(hand), '#projects/robotic-hand-v1');
});

test('unknown routes and projects do not open unrelated details', () => {
  assert.deepEqual(readLocation('#projects/missing', projects), { route: 'projects', project: null });
  assert.deepEqual(readLocation('#missing/cycloidal-gearbox', projects), { route: 'home', project: null });
  assert.deepEqual(readLocation('#contact', projects), { route: 'contact', project: null });
  assert.deepEqual(readLocation('', projects), { route: 'home', project: null });
});
