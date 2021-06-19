fetchBooks().then(({ psychology }) => {
	if (psychology.length > 0) {
		const container = document.querySelector(".cards-container");
		psychology.forEach((book) => {
			const { title, img, previewLink } = book;
			const bookCard = createCardsDom(title, img, previewLink);
			container.appendChild(bookCard);
		});
	}
});