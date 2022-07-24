import express from 'express'
const app = express()

const session = {
    get user(){
        return app.locals.user
    },

    set user(value) {
        app.locals.user = value
    }
}

export default session