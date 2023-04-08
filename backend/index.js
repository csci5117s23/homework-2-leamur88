
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'

// Use Crudlify to create a REST API for any collection
app.get("/test", (req, res) => {
    res.json({result: "you did it!"});
});
crudlify(app)

// bind to serverless runtime
export default app.init();