require("dotenv").config()

export const StorageConfig = {
    
    /**
     * Path de acceso public del storage
     * @type {string}
     */
    public_path: process.env["STORAGE_PUBLIC"] || 'storage/public',

    /**
     * Link
     */
    link_public: process.env["APP_URL"] || ''
}