import fastify from 'fastify'
import { knex } from './database.js'
import { randomUUID } from 'node:crypto'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Transaction Test',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.get('/getall', async () => {
  const transactions = await knex('transactions')
    .where('amount', 499)
    .select('*')

  return transactions
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server Running on port 3333')
  })

// interface User {
//     birthyear: number
// }

// function calculateAgeOfUser(user: User) {
//     return new Date().getFullYear() - user.birthyear
// }

// causa erro -  calculateAgeOfUser('rogerio')

// calculateAgeOfUser({
//     birthyear: 2002
// })
