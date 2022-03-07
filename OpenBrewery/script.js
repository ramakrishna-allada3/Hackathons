window.onload = function () {
    var container = document.createElement('div');

    // App Header
    var header = document.createElement('h1');
    header.innerText = "Open Brewery Application";
    header.setAttribute('class', 'app-header');

    // Search bar
    var searchbar = document.createElement('div');
    searchbar.setAttribute('class', 'searchbar');

    // Search Input
    var searchInput = document.createElement('input');
    searchInput.setAttribute('placeholder', 'Search Breweries...');
    searchInput.setAttribute('id', 'searchbar');
    searchInput.setAttribute('size', '50');

    // Search Button
    var searchBtn = document.createElement('button');
    searchBtn.innerHTML = 'Search';
    searchBtn.setAttribute('onClick', 'onSearchClick()');

    AppendElementsList([searchInput, searchBtn], searchbar);

    // Container for brewery search list
    var listContainer = document.createElement('div');
    listContainer.setAttribute('id', 'list-container');
    listContainer.setAttribute('class', 'brewery-list-container');

    // Append list to the container
    container.append(header);
    container.append(searchbar);
    // container.append(searchBtn);
    container.append(listContainer);

    // Append list to the body
    document.body.append(container);

    console.log(document.body);
}

function onSearchClick() {
    var searchWord = document.getElementById("searchbar").value;
    fetch("https://api.openbrewerydb.org/breweries/search?query=" + searchWord)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            var breweryContainer = document.getElementById('list-container');
            removeChildElements(breweryContainer);
            data.forEach(brewery => {
                breweryContainer.append(getBreweryItem(brewery.name, brewery.brewery_type, brewery.city, brewery.website_url, brewery.phone));
            });
        });
}

function getBreweryItem(name, type, address, url, phone) {
    var breweryElement = document.createElement('div');
    breweryElement.setAttribute('class', 'brewery-item-container');

    // Name element
    var nameElement = document.createElement('div');
    nameElement.innerText = 'Name: ' + name;

    // Type Element
    var typeElement = document.createElement('div');
    typeElement.innerText = 'Type: ' + type;

    // Address Element
    var addressElement = document.createElement('div');
    addressElement.innerText = 'Address: ' + address;

    // Url Element
    var urlElement = document.createElement('div');
    urlElement.innerText = 'Url: ' + url;

    // Phone Element
    var phoneElement = document.createElement('div');
    phoneElement.innerText = 'Phone: ' + phone;

    AppendElementsList([nameElement, typeElement, addressElement, urlElement, phoneElement], breweryElement);

    return breweryElement;
}

function AppendElementsList(childElementsList, parentElement) {
    childElementsList.forEach(element => {
        parentElement.append(element);
    });
}

function removeChildElements(parent) {
    var child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}