fetchBooks().then(({ literature }) => {
	if (literature.length > 0) {
		const container = document.querySelector(".cards-container");
		literature.forEach((book) => {
			const { title, img, previewLink } = book;
			const bookCard = createCardsDom(title, img, previewLink);
			container.appendChild(bookCard);
		});
	}
});