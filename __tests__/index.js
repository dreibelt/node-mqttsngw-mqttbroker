jest.mock('../fsmMain.js');
const fsmMain = require('../fsmMain.js');

const Core = require('../index.js');

test('convert config object to callback', () => {
	const BROKER = {};
	const CONFIG = { broker: BROKER };
	Core(CONFIG)();
	expect(CONFIG.broker).toBeInstanceOf(Function);
	expect(CONFIG.broker()).toBe(BROKER);
});

test('start main FSM', () => {
	const LOG = {};
	const CONFIG = { log: LOG };
	const BUS = {};
	Core(CONFIG)(BUS)();
	expect(fsmMain.mock.calls[0][0]).toBe(BUS);
	expect(fsmMain.mock.calls[0][1]).toBe(LOG);
	expect(fsmMain._run.mock.calls[0][0]).toBe(CONFIG);
});

test('stop main FSM', () => {
	const CONFIG = {};
	const BUS = {};
	Core(CONFIG)(BUS)()();
	expect(fsmMain._next.mock.calls[0][0]).toBe(null);
});
