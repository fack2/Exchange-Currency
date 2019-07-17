const tape = require('tape');
const supertest = require('supertest');
const router = require('./router');

tape('Testing tape', (t) => {
	t.equal('test', 'test', 'its work');
	t.end();
});



tape('check status code is 200', (t) => {
	supertest(router)
		.get('/')
		.expect(200)
		.expect('Content-Type', /html/)
		.end((err, res) => {
			t.error(err);
			t.equal(res.statusCode, 200, 'response should be 200');
			t.deepEqual(res.headers['content-type'], 'text/html', 'response should be htmlFile');
			t.end();
		});
});

tape('check status code is 404', (t) => {
	supertest(router)
		.get('/notfound')
		.expect(404)
		.end((err, res) => {
			t.error(err);
			t.equal(res.statusCode, 404, 'response should be 404');
			t.end();
		});
});



tape('route test - get - header', (t) => {
	supertest(router)
		.post('/cal?c1=USD&c2=ILS&a=10')
		.expect(200)
		// .expect('Content-Type', 'application/json')
		.end((err, res) => {
			t.error(err);
			t.equal(res.text,'35.4651', 'The result must be 35.4651 ');
			t.end();
		});
});