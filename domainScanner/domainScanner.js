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

    if (requestIsGood(domain, username)) {
        // TODO Add to database and start the crawling.
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
