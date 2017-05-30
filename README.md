# Server side stuff for Mimi Atlas
* Server side web crawling and image processing for the mimi atlas app.

## Deployment
```bash
git add remote deploy dokku@ultilabs.xyz:mimi-server
git push deploy master
```

## API

### Adding a website to be scanned
* Send a post request to /scan with parameters:
    * **domain** in the form of www.example.com
    * **username** as a string with alphanumeric characters and _
```bash
curl --data "domain=jh456.github.io&username=jim" localhost:5000/scan
```

### Getting the status of a website that is being scanned
* TODO

### Get the results for a website that is done being scanned
* TODO
