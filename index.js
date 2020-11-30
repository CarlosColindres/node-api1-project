const e = require('express')
const express = require('express')
const shortid = require('shortid')

const app = express()

app.use(express.json())

let users = [
{
    id: 'jdncijw30d34',
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane",
}
]

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params

    const user = users.find(userId => userId.id ===id)

    if(user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({message: 'user not found'})
    }
})

app.post('/users' , (req, res) => {

const user = req.body

const newUser = {id: shortid.generate(), ...user}

if(!user.name || !user.bio) {
    res.status(400).json({message: 'name and bio is required'})
} else {
    users.push(newUser)
    res.status(201).json(users)
}

})

app.delete('/users/:id', (req, res) => {
    const {id} = req.params
    const userExist = users.find(user => user.id === id)

    if(userExist) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(users)
    } else {
        res.status(400).json({message: 'user with that id doesnt exist'})
    }

})

app.put('/users/:id', (req,res) => {
    const {id} = req.params
    const newInfo = req.body

    const userExist = users.find(user => user.id === id)

    if(userExist) {
        users = users.map(user => {
            if (user.id === id) {
                return {...user, id: id, name: newInfo.name, bio: newInfo.bio}
            }
            return user
        })
        res.status(200).json(users)
    } else {
        res.status(404).json({message: 'user not found'})
    }
})

app.use('*', (req, res) => {
    res.status(404).json({message: 'Not found'})
})

app.listen(5000, () => console.log('server is up'))