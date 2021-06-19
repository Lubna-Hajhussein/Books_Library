const fs = require("fs").promises;
const path = require("path");

const rootDir = require("../utilities/path");

const p = path.join(rootDir, "data", "book.json");

const getBooksFromFile = async () => {
	try {
		const data = await fs.readFile(p, "binary");
		return JSON.parse(data);
	} catch (err) {
		if (err.code === "ENOENT") {
			return [];
		}
		return err;
	}
};

module.exports = class Book {
    constructor(id, title, genre, img, previewLink){
          this.id = id;
          this.title = title;
          this.genre = genre;
          this.img = img;
          this.previewLink = previewLink;
    }

   static async findById(bookId){
    const books = await getBooksFromFile();
    return books.find((book)=>book.id===bookId)
   }
    
    async addBook() {
        try {
            const books = await getBooksFromFile();
            books.push(this);
            await fs.writeFile(p, JSON.stringify(books));
            return books;
        }
        catch (err) {
            console.log({ err });
        }
    }
    static async getBooks(){
        return await getBooksFromFile();
    }
}