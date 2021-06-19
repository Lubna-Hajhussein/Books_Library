fetchBooks().then(({ sociology }) => {
	if (sociology.length > 0) {
		const container = document.querySelector(".cards-container");
		sociology.forEach((book) => {
			const { title, img, previewLink } = book;
			const bookCard = createCardsDom(title, img, previewLink);
			container.appendChild(bookCard);
		});
	}
});