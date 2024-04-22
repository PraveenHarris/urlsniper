// Function to dynamically generate list items for sniped URLs
function populateUrlList(snipedUrls) {
    const urlList = document.getElementById('urlList');

    // Clear the existing list
    urlList.innerHTML = '';

    // Populate the list with sniped URLs
    snipedUrls.forEach(url => {
        const listItem = document.createElement('li');
        listItem.textContent = url;

        // Add click event listener to open the URL in a new tab when clicked
        listItem.addEventListener('click', function() {
            chrome.tabs.create({ url: url });
        });

        urlList.appendChild(listItem);
    });
}

// Extract sniped URLs from query parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const snipedUrls = JSON.parse(decodeURIComponent(urlParams.get('snipedUrls')));

// Update the popup with sniped URLs
populateUrlList(snipedUrls);
