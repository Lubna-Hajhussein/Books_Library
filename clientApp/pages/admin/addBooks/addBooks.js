const form = document.querySelector(".container");

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

const fetchApiBooks = () => {};

form.addEventListener("submit", async (e) => {
	const query = document.querySelector("#box").value;
	const container = document.querySelector(".cards-container");

	e.preventDefault();
	removeAllChildNodes(container);

	const { closeBtn, acceptBtn, selectContainer, modalImg, modalContainer } =
		createModalDom();

	try {
		const data = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`
		);
		const books = await data.json();

		books.items.forEach((book) => {
			let genre = "history";
			const bookId = book.id;
			const bookTitle = book.volumeInfo.title;
			const bookImg = book.volumeInfo.imageLinks.thumbnail;
			const previewLink = book.volumeInfo.previewLink;

			if (!bookTitle || !bookImg || !previewLink) {
				return;
			}
			const { card, addButton } = createCardsDom(
				bookTitle,
				bookImg,
				previewLink
			);

			container.appendChild(card);

			selectContainer.onchange = function (e) {
				genre = e.target.value;
			};

			addButton.onclick = function () {
				modalContainer.style.display = "block";
				acceptBtn.id = bookId;
				modalImg.src = bookImg;
			};

			acceptBtn.onclick = async function (e) {
				const targetedId = e.target.id;
				try {
					const book = books.items.find((book) => book.id === targetedId);
					const id = book.id;
					const title = book.volumeInfo.title;
					const img = book.volumeInfo.imageLinks.thumbnail;
					const previewLink = book.volumeInfo.previewLink;

					const result = await fetch("http://localhost:3000/addBook", {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							id,
							title,
							genre,
							img,
							previewLink,
						}),
					});
					const data = await result.json();
					console.log({ data });
				} catch (err) {
					console.log(err);
				}
			};

			closeBtn.onclick = function () {
				modalContainer.style.display = "none";
			};

			window.onclick = function (event) {
				if (event.target == modalContainer) {
					modalContainer.style.display = "none";
				}
			};
		});
	} catch (err) {
		console.log(err);
	}
});
