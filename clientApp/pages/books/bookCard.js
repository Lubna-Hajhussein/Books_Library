const createCardsDom = (bookTitle, bookImg, previewLink) => {
	const card = document.createElement("div");
	card.setAttribute("class", "card");
	const prod = document.createElement("div");
	prod.setAttribute("class", "product");
	card.appendChild(prod);
	const title = document.createElement("h1");
	const img = document.createElement("img");
	img.setAttribute("class", "cup");
	img.src = bookImg;
	const desc = document.createElement("div");
	desc.setAttribute("class", "info");
	// const btnDiv = document.createElement("div");
	// btnDiv.setAttribute("class", "btnDiv");

	const readLink = document.createElement("button");
	readLink.textContent = "read";
	readLink.setAttribute("class", "bn5");
	title.textContent = bookTitle;
	card.appendChild(desc);
	desc.appendChild(title);
	desc.appendChild(readLink);
	// btnDiv.appendChild(readLink);
	// desc.appendChild(btnDiv);
	prod.appendChild(img);
	return card;
};