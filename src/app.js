const feathers = require('@feathersjs/feathers')
const { BadRequest } = require('@feathersjs/errors')

const app = feathers()

app.use('todos', {
  async get(name) {
    return {
      name,
      text: `You have to do ${name}.`
    }
  }
})

async function getTodo(name) {
  const service = app.service('todos')
  const todo = await service.get(name)

  console.log(todo)
}

getTodo('Peachy!')

class Messages {
  constructor() {
    this.messages = []
    this.currentId = 0
  }

  async find(params) {
    return this.messages
  }

  async get(id, params) {
    const message = this.messages.find(message => message.id = parseInt(id, 10))

    if(!message) {
      throw new Error(`Message with id ${id} not found`)
    }

    return message
  }

  async create(data, params) {
    const message = Object.assign({
      id: ++ this.currentId
    }, data)

    this.messages.push(message)

    return message
  }

  async patch(id, data, params) {
    const message = await this.get(id)

    return Object.assign(message, data)
  }

  async remove(id, params) {
    const message = await this.get(id)
    const index = this.messages.indexOf(message)

    this.messages.splice(index, 1)

    return message
  }
}

app.use('messages', new Messages())

async function processMessages() {
  app.service('messages').on('created', message => {
    console.log('Created message', message)
  })

  app.service('messages').on('removed', message => {
    console.log('Removed message', message)
  })

  await app.service('messages').create({
    text: 'First message'
  })

  await app.service('messages').create({
    text: 3
  })

  await app.service('messages').create({
    number: 4
  })

  const lastMessage = await app.service('messages').create({
    text: 'Second messaage'
  })

  await app.service('messages').remove(lastMessage.id)

  const messageList = await app.service('messages').find()

  console.log('Available messages', messageList)
}

const setTimestamp = name => {
  return async context => {
    context.data[name] = new Date()

    return context
  }
}

const validate = async context => {
  const { data } = context

  if (!data.text) {
    throw new BadRequest('Message text must exist')
  }

  context.data = {
    text: data.text.toString()
  }
}

app.service('messages').hooks({
  before: {
    create: [validate, setTimestamp('createdAt')],
    update: [validate, setTimestamp('updatedAt')],
    patch: [validate, setTimestamp('updatedAt')]
  }
})

app.hooks({
  error: async context => {
    console.error(`Error in ${context.path} service method ${service.method}`, context.erro.stack)
  }
})

processMessages()
