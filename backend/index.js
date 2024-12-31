import connectToMongo from './db.js'
import express from 'express'
const app = express()
const port = 5000
import authRoute from './routes/auth.js'
import notesRoute from './routes/notes.js'
import cors from 'cors';

app.use(cors())

app.use(express.json())

//Availbale Routes
app.use('/api/auth', authRoute);
app.use('/api/notes',notesRoute);

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

connectToMongo();


