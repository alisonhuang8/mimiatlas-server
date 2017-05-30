var Crawler = require('../crawler/crawler');
var ImageProcessor = require('../imageProcessor/imageProcessor');

/**
 * Processes the request sent in by the user.
 *
 * @param request the request object.
 *
 * @return true or false, if the request could be processed.
 */
exports.processRequest = function(request) {
    let domain = request.body.domain;
    let username = request.body.username;

    let maybeDone = false;

    /**
     * Called each time the crawler finds a new image. Updates the database, and
     * will pass the url to the image processor. Also sets maybeDone to false.
     * ImageItem.url will give the url of the image.
     *
     * @param imageItem an object representing the image that was found.
     */
    let crawlerImageCallback = function(imageItem) {
        // TODO update the database and pass stuff to image processor.
        maybeDone = false;
        console.log(imageItem);
    }

    /**
     * Called when the crawler finds all of the urls on the site, and also when
     * the image processor has finished all of its jobs. If maybeDone is true,
     * this means that the website has been fully scanned. Otherwise, maybeDone
     * will be set to be true.
     */
    let completionCallback = function() {
        if (maybeDone) {
            // TODO some code in here
        } else {
            maybeDone = true;
        }
    }

    let crawler = Crawler(domain, crawlerImageCallback, completionCallback);

    if (requestIsGood(domain, username)) {
        // TODO Add to database and start the crawling.
        crawler.start();
        return true;
    } else {
        return false;
    }
}

/**
 * Validates if a request is good based on its params.
 *
 * @param domain the domain name sent in the request.
 * @param username the username sent in the request.
 */
var requestIsGood = function(domain, username) {
    let domainRegex =
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/i;
    let usernameRegex = /^[a-zA-Z0-9_]+$/i
    return domain && domainRegex.test(domain)
        && username && usernameRegex.test(username);
}
