import express, { Router } from 'express'
import fs, { readFileSync } from 'fs';

export const RouterConfig = {
    /**
     * Prefijo de ruta api
     */
    prefix: "api",

    /**
     * Carpeta que contiene las rutas
     */
    folderRoutes: "routes",

    /**
     * Omitir archivos de la carpeta de rutas
     */
    exceptFiles: [
        "api.routes.ts",
    ],

    /**
     * Correr la configuración de rutas de la carpeta routes
     * 
     * @returns {Router} Router Express
     */
    async run(): Promise<Router> {
        const routerExpress = express.Router()
        const routesFiles   = await this.allRoutesFiles()

        routesFiles.forEach((resFile) => {
            const { prefix, router } = resFile.default
            routerExpress.use(`/${prefix}`, router)
        })

        return routerExpress
    },

    /**
     * Obtener rutas de import dinamicos de la carpeta
     * 
     * @returns Arreglo de rutas
     */
    async allRoutesFiles(): Promise<any[]> {
        return Promise.all(
                fs.readdirSync(`./src/${this.folderRoutes}`)
                    .filter(
                        (routeFile) => !this.exceptFiles.find(excFile => excFile.indexOf(routeFile) !== -1)
                    ).map(routeFile => 
                        import(`../${this.folderRoutes}/${routeFile}`)       
                    )
                )
    }


}
