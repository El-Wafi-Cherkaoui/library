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
    reset_form()
}
function reset_form(){
    let ids = ["#title", "#author", "#pages"]
    ids.forEach(id => {
        document.querySelector(id).value = ""
    });
    document.querySelector('#finished').checked = false
    toggle_addBook()
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
        del_btn.addEventListener("click", ()=>{
            library = library.filter(book=> book.title != book_h2.textContent)
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
let add_book_btn = document.querySelector('.add_book_btn')
add_book_btn.addEventListener('click', ()=>{
    toggle_addBook()
})
function toggle_addBook(){
    let form = document.querySelector('form')
    if (form.style.display == "grid"){
        form.style.display = "none"
        add_book_btn.textContent = "Add Book"
    }
    else{
        form.style.display = "grid"
        add_book_btn.textContent = "Hide"
    }
}