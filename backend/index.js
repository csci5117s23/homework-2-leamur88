import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string } from 'yup';
import jwtDecode from 'jwt-decode';




const userAuth = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
        const token_parsed = jwtDecode(token);
        req.user_token = token_parsed;
		
      }
      next();
    } catch (error) {
      next(error);
    } 
  }
app.use(userAuth)

app.use('/todoItem', (req, res, next) => {
    if (req.method === "POST") {
        req.body.userId = req.user_token.sub
    } else if (req.method === "GET") {
        req.query.userId = req.user_token.sub
    }
    next();
})

app.use('/todoItem/:id', async (req, res, next) => {
    const id = req.params.ID;
    const userId = req.user_token.sub
    // let's check access rights for the document being read/updated/replaced/deleted
    const conn = await Datastore.open();
    try {
        const doc = await conn.getOne('todoItem', id)
        if (doc.userId != userId) {
            // authenticate duser doesn't own this document.
            res.status(403).end(); // end is like "quit this request"
            return
        }
    } catch (e) {
        // the document doesn't exist.
        res.status(404).end(e);
        return;
    }
    // if we don't crash out -- call next and let crudlify deal with the details...
    next();
})

const todoItem = object({
    todo: string().required(),
    checked: string().required(),
	userId: string().required(),
    createdOn: date().default(() => new Date()),
})
crudlify(app, {todoItem: todoItem})

// bind to serverless runtime
export default app.init();
