const fCard = document.createElement('div');
fCard.classList.add("card");
initCard.appendChild(fCard);

const fCardBody = document.createElement('div');
fCardBody.className += ("card-body");
fCard.appendChild(fCardBody);

const fCardTitle = document.createElement('div');
fCardTitle.className += ("card-title");
fCardTitle.document.createTextNode(fDate);
fCardBody.appendChild(fCardTitle);

const fCardSubTitle = document.createElement('div');
fCardSubTitle.className += ("card-subtitle mb-2 text-muted");
fCardBody.appendChild(fCardTitle);

const iconImage = document.createElement('img');
img.src = 'fIcon';
iconImage.insertAdjacentHTML("afterbegin", iconImage);

const fCardText = document.createElement('div');
fCardText.className += ('card-text');
fCardBody.appendChild(fCardText);

const fCardList = document.createElement('ul');
fCardList.className += ('list-group');
fCardText.appendChild(fCardList);

const fCardItem = document.createElement('li');
fCardItem.className += ('list-group-item');
fCardItem = document.createTextNode('Low: ' + ftempMin);
fCardList.appendChild(fCardItem);

fCardItem = document.createElement('li');
fCardItem.className += ('list-group-item');
fCardItem = document.createTextNode('High: ' + f - tempMax);
fCardList.appendChild(fCardItem);

fCardItem = document.createElement('li');
fCardItem.className += ('list-group-item');
fCardItem = document.createTextNode('Humidity: ' + f - humidity);
fCardList.appendChild(fCardItem);