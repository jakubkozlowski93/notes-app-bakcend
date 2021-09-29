const jwt = require('jsonwebtoken')

const ACCESS_TOKEN = 'ndkqnj32or23523bj2fu2f23nfi2n1'

const users = [
  { login: 'Kuba', password: 'test123' },
  { login: 'Adam', password: 'test456' },
]

class Actions {
  getAdmin(req, res) {
    res.status(200).send('Witaj w panelu admina')
  }

  authMiddleware(req, res, next) {
    const token = req.headers['Authorization']?.split(' ')[1]
    if (!token) {
      return res.sendStatus(401)
    }
    jwt.verify(token, ACCESS_TOKEN, (err, data) => {
      if (err) {
        return res.sendStatus(403)
      }
      req.user = data
    })
  }

  async getLogin(req, res) {
    const user = await users.find((u) => u.login === req.body.login)
    const password = await users.find((u) => u.password === req.body.password)
    if (!user) {
      return res.sendStatus(401)
    }
    if (req.body.password == user.password) {
      const payload = user
      const token = jwt.sign(payload, ACCESS_TOKEN)
      res.json({ token })
    }
  }
}

module.exports = new Actions()
