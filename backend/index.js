
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'

// Use Crudlify to create a REST API for any collection
import { date, object, string } from 'yup';
const todoItem = object({
    todo: string().required(),
    checked: string().required(),
	userId: string().required(),
    createdOn: date().default(() => new Date()),
})
crudlify(app, {todoItem: todoItem})

// bind to serverless runtime
export default app.init();
