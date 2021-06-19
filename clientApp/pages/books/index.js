const filterBooksToGenre = (genre, books) => {
	return books.filter((book) => book.genre === genre);
};

const fetchBooks = async () => {
	try {
		const result = await fetch("http://localhost:3000/getBooks");
		const {books} = await result.json();
		return {
			history: filterBooksToGenre("history", books),
			literature: filterBooksToGenre("literature", books),
            psychology: filterBooksToGenre("psychology", books),
            religion: filterBooksToGenre("religion", books),
            sociology: filterBooksToGenre("sociology", books)
		};
	} catch (err) {
		console.log(err);
	}
};
