require("dotenv").config()
import { MongoConfig } from './config/mongo.config';
import express from 'express';
import cors from 'cors'
import { RouterConfig } from './config/router.config';
import { StorageConfig } from './config/storage.config';

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(StorageConfig.public_path))

MongoConfig.run()

RouterConfig.run().then(routes => {
    app.use(`/${RouterConfig.prefix}`, routes)
})

app.listen(process.env["APP_PORT"])