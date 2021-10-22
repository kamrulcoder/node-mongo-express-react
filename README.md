## NOde-Mongo-Express-Crud Project 

### Setup Project 
- Crate folder 
- nppm init
- install express, cors, mongodb ,  nodemon
- express imoport 
- express app  initialize 
- port create app listen  server create
- mongodb atlas setup 
- mongdb connect 
  

  ## Connect to Cloud Database
  > #### We can write code in two ways
  - async await 
  - Promise 

> ## async await
> > Step by step 
> - client connect  function  call 
> - async function  call 
>  - try keyword  use 
>  - variable database  call 
>  - variable collectin call 
>  - data base query 
>  - data operation and await use 
>  - finally  keyword use 

```javascript
async function run() {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const userCollection = database.collection('users');
        // Query for a movie that has the title 'Back to the Future'
        const query = {
            name: 'kamrul hasan ',
            email: "kamrul@gmail.com"
        };

        const result = await userCollection.insertOne(query);
        console.log(` user inserted success `);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

```


  ## Post Api in Database 

  >  ## Server code 

```javascript

        app.post("/users",async (req,res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            console.log("got new user ", newUser);
            console.log("added new User  ", result.insertedId);
            res.json(result);
            console.log("you are success fully post route hitted ");
        })
```

  >  ## Client  code 

  ```javascript 

    const handleAddUser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = { name, email };

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added the user.')
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

```

  ## Get  Api in Database

> ###  Server Code 
  
 ```javascript 
     app.get("/users", async (req,res) => {
        const cursor = userCollection.find({})
        const users = await cursor.toArray();
        res.send(users)
    })

 ```

> ###  Client  Code 

 ```javascript 
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setUsers(data))

    }, [])

 ```

  ## Delete   Api in Database

  > ###  Server   Code 
  ```javascript
        app.delete("/users/:id", async(req,res) => {
            const id = req.params.id;
            const query = {_id :ObjectId(id)}
            const result = await userCollection.deleteOne(query)
            console.log("you are successfully delete ");
            res.json(result)

        })
  ```

  > ###  Client    Code 
  ```javascript
      // DELETE AN USER
    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                });
        }
    }
  ```

  ## Single Data  get   Api in Database

  > ### Server Code 

  ```javascript 
      app.get("/users/:id", async(req,res) => {
        const id = req.params.id;
        const query = {_id :ObjectId(id)}
        const result = await userCollection.findOne(query)
        res.json(result)
    })
        
  ```

  > ### Client  Code 

```javascript 
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

```








  