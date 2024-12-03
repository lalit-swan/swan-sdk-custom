## Swan SDK Custom sample

Pre-requisites:
* Node.js > 18.x installed on your machine

* Install the dependencies
    ```bash
    $ npm install
    ```

* Patch the swan-sdk dependency -
    1. Locate the file :node_modules/@swan-admin/swan-sdk/package.json 
    1. add the `"type": "module"` field.

    NOTE: **This is a temporary workaround until the swan-sdk package is updated to fully support ESM**

    ```json
    {
    "name": "@swan-admin/swan-ai-measurements",
    "version": "1.1.51",
    ...
    "type": "module",
    ...
    }
    ```

* Update the .env file with your SWAN_API_KEY

* Run the sample
    ```bash
    $ npm start
    ```