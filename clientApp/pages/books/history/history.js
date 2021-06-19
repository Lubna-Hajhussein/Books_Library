fetchBooks().then(({ history }) => {
	console.log(history)
	if (history.length > 0) {
		const container = document.querySelector(".cards-container");
		history.forEach((book) => {
			const { title, img, previewLink } = book;
			const bookCard = createCardsDom(title, img, previewLink);
			container.appendChild(bookCard);
		});
	}
});
