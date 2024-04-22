// Get the current HTML of the page

class UrlSniper {
    static extractUrls(htmlString) {
        const urls = [];

        // Regex pattern for matching URLs
        const urlRegex = /(?:https?:\/\/)?(?:www\.)?[\w-]+\.[\w.-]+(?:\/[\w-./?%&=]*)?/g;

        // Search the entire HTML string for matches
        const matches = htmlString.match(urlRegex);
        if (matches) {
            matches.forEach(match => {
                urls.push(match);
            });
        }

        return urls;
    }

    static matchingUrls(extractedUrls, snipingUrls) {
        const filteredUrls = [];

        extractedUrls.forEach(url => {
            if (snipingUrls.some(snipingUrl => url.includes(snipingUrl))) {
                filteredUrls.push(url);
            }
        });

        return filteredUrls;
    }

    static snipeUrls(htmlString, snipingUrls) {
        let extractedUrls = UrlSniper.extractUrls(htmlString);
        let matchingUrls = UrlSniper.matchingUrls(extractedUrls, snipingUrls)
        return matchingUrls
    }
}


// websites to run and links to snipe
const UrlSniperConfig = {
    "wikipedia.org": [
        "facebook.com",
        "twitter.com",
        "google.com"
    ],
}

function getLinksToSnipe() {
    const currentUrl = document.URL
    for (const url in UrlSniperConfig) {
        if (currentUrl.includes(url)) {
            return UrlSniperConfig[url]
        }
    }

    return null;
}

const links = getLinksToSnipe()
console.log(links)
if (links != null) {
    const currentPageHTML = document.documentElement.outerHTML;
    const snipedUrls = UrlSniper.snipeUrls(currentPageHTML, links)
    console.log("snipedUrls", snipedUrls)

    chrome.runtime.sendMessage({ action: "flashPopUpWithSnipedUrls", snipedUrls: snipedUrls });
}






