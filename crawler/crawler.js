var Crawler = require("simplecrawler");
var jsonfile = require('jsonfile');

/**
 * Creates a new crawler object that can crawl some website. Once the crawl is
 * started, an event will be fired each time a new image is added to the queue.
 *
 * @param domain a domain name in the form www.example.com (http is inferred)
 * @param imageCallback a procedure that consumes a queueItem for an image. This
 * will be called each time a new image url is discovered.
 * @param completionCallback a procedure that will be called once all urls have
 * been discovered.
 *
 * @return a new crawler object for the passed in domain.
 */
var crawler = function(domain, imageCallback, completionCallback) {

    var imageRegex = /\.(png|bmp|tiff|jpg|jpeg)$/i

    var simplecrawler = Crawler("http://" + domain)
    .on("queueadd", function (queueItem) {
        var url = queueItem.url;
        if (imageRegex.test(url)) {
            imageCallback(queueItem);
        }
    })
    .on('complete', completionCallback);

    var conditionID = simplecrawler.addDownloadCondition(function(queueItem, response, callback) {
        callback(null,
            !queueItem.path.match(imageRegex)
        );
    });

    simplecrawler.decompressResponses = false;

    simplecrawler.decodeResponses = false;

    simplecrawler.parseHTMLComments = false;

    simplecrawler.downloadUnsupported = false;

    simplecrawler.interval = 0;

    return {
        start: function() {
                   simplecrawler.start();
               }

    };
};

module.exports = crawler;
