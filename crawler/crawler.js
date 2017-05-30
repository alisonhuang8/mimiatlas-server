var Crawler = require("simplecrawler");
var jsonfile = require('jsonfile');

/**
 * Creates a new crawler object that can crawl some website. Once the crawl is
 * started, an event will be fired each time a new image is added to the queue.
 *
 * @param domain a domain name in the form www.example.com (http is inferred)
 * @param addBroadCaster the event emmitter to ping when a url is added to the
 * queue.
 *
 * @return a new crawler object for the passed in domain.
 */
var crawler = function(domain, addBroadCaster) {

    var files = 'also_urls.json';

    var imageItems = [];

    var imageRegex = /\.(png|bmp|tiff|jpg|jpeg)$/i

    var simplecrawler = Crawler("http://ultimatesoftware.com/")
    .on("queueadd", function (queueItem) {
        var url = queueItem.url;
        if (url.match(imageRegex)) {
            imageItems.push(queueItem);
            jsonfile.writeFileSync(files, imageItems);
            addBroadCaster.emit('added');
        }
    })

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

    simplecrawler.start();

    return {
        start: simplecrawler.start
    };
};
