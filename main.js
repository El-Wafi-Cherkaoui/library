let library = []
function add_book(event){
    event.preventDefault()
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let finished = document.querySelector('#finished').checked

    let new_book = new Book(title, author, pages, finished)
    library.push(new_book)
    refresh_books()
}

function Book(title, author, pages, finished){
    this.title = title
    this.author = author
    this.pages = pages
    this.finished = finished
}

function refresh_books(){
    let shielf = document.querySelector('.shielf > div')
    shielf.textContent = ""
    library.forEach(book => {
        let book_div = document.createElement('div')
        book_div.className = "book"

        let book_h2 = document.createElement('h2')
        book_h2.textContent = book.title
        if (book.finished){
            book_h2.className = "finished"
        }
        else{
            book_h2.className = "notFinished"
        }
        let book_span = document.createElement('span')
        book_span.textContent = book.author
        let book_p = document.createElement('p')
        book_p.textContent = book.pages

        book_div.append(book_h2)
        book_div.append(book_span)
        book_div.append(book_p)

        let del_btn = document.createElement('button')
        del_btn.textContent = "Delete"
        del_btn.className = "del_btn"
        let new_library = []
        del_btn.addEventListener("click", ()=>{
            library.forEach(book => {
                if (book.title != book_h2.textContent){
                    new_library.push(book)
                }
            });
            library = new_library
            refresh_books()
        })
        book_div.append(del_btn)

        let toggle_read = document.createElement('button')
        toggle_read.className = "toggle_read"
        if (book.finished){
            toggle_read.textContent = "Reading Again"
        }
        else{
            toggle_read.textContent = "Finished Reading"
        }
        toggle_read.addEventListener("click", ()=>{
            if (book.finished){
                book.finished = false
            }
            else {
                book.finished = true
            }
            refresh_books()
        })
        book_div.append(toggle_read)
        shielf.append(book_div)
    });
}
let form = document.querySelector('form')
let add_book_btn = document.querySelector('.add_book_btn')
console.log(form.style.display);
add_book_btn.addEventListener('click', ()=>{
    
    if (form.style.display == "grid"){
        form.style.display = "none"
        add_book_btn.textContent = "Add Book"
    }
    else{
        form.style.display = "grid"
        add_book_btn.textContent = "Hide"
    }
})