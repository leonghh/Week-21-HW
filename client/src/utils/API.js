import axios from "axios";

var serverUrl =  "http://localhost:3001";
// (change serverUrl on heroku)
if (process.env.NODE_ENV === "production") {
    serverUrl =  "https://bootcamp-google-book-searcher.herokuapp.com";
} 

export const getBooks = (title) => {
    return new Promise(function(resolve, reject){
        var url =  "https://www.googleapis.com/books/v1/volumes?q=" + title;
        axios.get(url)
            .then((res)=>{
                var booksInfo = [];
                booksInfo = res.data.items.map((item)=>{
                    // Format received data
                    const title = (typeof item.volumeInfo.title === "undefined") ? " " : item.volumeInfo.title;
                    const authors = (typeof item.volumeInfo.authors === "undefined") ? [] : item.volumeInfo.authors;
                    const description = (typeof item.volumeInfo.description === "undefined") ? " " : item.volumeInfo.description;
                    // Show replacement gif file if API does not provide imageLinks
                    const smallThumbnail = (typeof item.volumeInfo.imageLinks === "undefined" ? "NoImage" : item.volumeInfo.imageLinks.smallThumbnail);
                    const infoLilnk = (typeof item.volumeInfo.infoLink === "undefined") ? " " : item.volumeInfo.infoLink;
                    const bookInfo = {title, authors, description, smallThumbnail, infoLilnk};
                    return bookInfo;
                });
                resolve(booksInfo);

            })
            .catch((err)=>{
                reject();
            })     
    })
}

export const saveBook = (book) => {
    return new Promise(function(resolve, reject){
        var url = serverUrl + "/api/book";

        axios.post(url, book)
            .then((res)=>{
                resolve();
            })
            .catch((err)=>{
                reject();
            })     
    })
}

export const getSavedBooks = (title) => {
    return new Promise(function(resolve, reject){
        var url =  serverUrl + "/api/book";
        axios.get(url)
            .then((res)=>{
                resolve(res.data);
            })
            .catch((err)=>{
                reject();
            })     
    })
}

export const deleteBook = (id) => {
    return new Promise(function(resolve, reject){
        var url =  serverUrl + "/api/book/" + id;
        axios.delete(url)
            .then((res)=>{
                resolve(res.data);
            })
            .catch((err)=>{
                reject();
            })     
    })
}
