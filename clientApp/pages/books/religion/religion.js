fetchBooks().then(({ religion }) => {
	if (religion.length > 0) {
		const container = document.querySelector(".cards-container");
		religion.forEach((book) => {
			const { title, img, previewLink } = book;
			const bookCard = createCardsDom(title, img, previewLink);
			container.appendChild(bookCard);
		});
	}
});