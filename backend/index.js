
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, number } from 'yup';


// Use Crudlify to create a REST API for any collection
app.get("/test", (req, res) => {
    res.json({result: "you did it!"});
});
const todoItemYup = object({
    text: string().required(),
    id: number().required(),
    createdOn: date().default(() => new Date()),
})
crudlify(app, {todoItem: todoItemYup})

// bind to serverless runtime
export default app.init();
