describe('Task API Routes', function() {
  // This function will run before every test to clear database
  beforeEach(function(done) {
    done();
  });

  // In this test it's expected a task list of two tasks
  describe('GET /', function() {
    it('returns a list of tasks', function(done) {
      request.get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          const body = res.body;
          expect(body.graphQL).to.eql('/graphql');
          done(err);
        });
    });
  });

  /*
  // Testing the save task expecting status 201 of success
  describe('POST /tasks', function() {
    it('saves a new task', function(done) {
      request.post('/tasks')
        .send({
          title: 'run',
          done: false
        })
        .expect(201)
        .end(function(err, res) {
          done(err);
        });
    });
  });

  // Here it'll be tested two behaviors when try to find a task by id
  describe('GET /tasks/:id', function() {
    // Testing how to find a task by id
    it('returns a task by id', function(done) {
      var task = app.db('tasks').first();
      request.get('/tasks/' + task.id)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(task);
          done(err);
        });
    });

    // Testing the status 404 for task not found
    it('returns status 404 when id is not found', function(done) {
      var task = {
        id: 'fakeId'
      }
      request.get('/tasks/' + task.id)
        .expect(404)
        .end(function(err, res) {
          done(err);
        });
    });
  });

  // Testing how to update a task expecting status 201 of success
  describe('PUT /tasks/:id', function() {
    it('updates a task', function(done) {
      var task = app.db('tasks').first();
      request.put('/tasks/' + task.id)
        .send({
          title: 'travel',
          done: false
        })
        .expect(201)
        .end(function(err, res) {
          done(err);
        });
    });
  });

  // Testing how to delete a task expecting status 201 of success
  describe('DELETE /tasks/:id', function() {
    it('removes a task', function(done) {
      var task = app.db('tasks').first();
      request.put('/tasks/' + task.id)
        .expect(201)
        .end(function(err, res) {
          done(err);
        });
    });
  });
  */
});
