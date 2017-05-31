var Crawler = require('../crawler/crawler');
var ImageProcessor = require('../imageProcessor/imageProcessor');
var Url = require('../models/url.model')
var Domain = require('../models/domain.model');

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
    let crawler;
    let imageProcessor;

    /**
     * Called each time the crawler finds a new image. Updates the database, and
     * will pass the url to the image processor. Also sets maybeDone to false.
     * ImageItem.url will give the url of the image.
     *
     * @param imageItem an object representing the image that was found.
     */
    let crawlerImageCallback = function(imageItem) {
        Url.create({
            domainUrl: domain,
            user: username,
            data: imageItem,
            stats: {}
        }, function(err, url) {
            if (err) {
                // TODO add better error logging
                console.log("Oh no!", err);
            } else {
                // TODO call Alison's thing instead
                console.log(url);
            }
        });
    }

    /**
     * Called when the crawler finds all of the urls on the site. Will call stop
     * on the image processor so that it finishes up its queue and terminates.
     */
    let completionCallback = function() {
    }

    if (requestIsGood(domain, username)) {
        crawler = Crawler(domain, crawlerImageCallback, completionCallback);
        imageProcessor = ImageProcessor();
        crawler.start();
        imageProcessor.start();
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
        /^http(s?):\/\/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/i;
    let usernameRegex = /^[a-zA-Z0-9_]+$/i
    return domain && domainRegex.test(domain)
        && username && usernameRegex.test(username);
}
