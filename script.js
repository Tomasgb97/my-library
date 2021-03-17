const myLibrary   =[];
const titleInput  = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput  = document.getElementById('pages');
const readInput   = document.getElementById('read');
const form        = document.getElementById('form');
const newBook     = document.getElementById('newbook')
const submitBook  = document.getElementById('submit');
const iconclose   = document.getElementById('iconclose');
const container   = document.getElementById('container');



newBook.addEventListener('click', function(){  //button that opens input form, and hiddes container elements

    let bookshow = document.querySelectorAll('.bookInfo');
    bookshow.forEach(element => element.hidden = true)

    form.style.display = 'inline';
    newBook.hidden= true;
})

iconclose.addEventListener('click', function(){   //closing form icon. shows hidden elements of container

    form.style.display = 'none';
    newBook.hidden = false;
})



submitBook.addEventListener('click',addBook);   //submits the book for showing and display on container




function addBook(){                           //if title and author are there adds book to the library array and calls display func.

    if(titleInput.value == 0 || authorInput.value == 0){

        alert('Please, introduce at least Title and Author of the book')
        
    }else{
            
    let newObject = nuevo();


    form.style.display = 'none';
    newBook.hidden = false;
    alert('YOUR BOOK WAS ADDED TO YOUR LIBRARY !')


    myLibrary.push(newObject);

     return forDisplay();
    }
    

    
}

function nuevo(){        //object creator for books.
    
        return {
             
            title: titleInput.value,
            author: authorInput.value,
            pages: pagesInput.value,
            read: readInput.value
        }
        
};

function forDisplay(){     //on every run, deletes displayed elements and generate the newones.

    let elements = document.querySelectorAll('.onDisplay');
    elements.forEach(element => element.remove());



    myLibrary.forEach(function(element){

        let book = document.createElement('div');
        book.classList.add('onDisplay');
        let bookinfo = document.createElement('div');
        bookinfo.classList.add('bookInfo');
        bookinfo.innerHTML =`<p class= "ondisplaytext" >Title: ${element.title}<br> Author: ${element.author}<br> Pages ${element.pages}<br>
        Finished ? : ${element.read} <p>`;



        book.setAttribute('data-index', `${myLibrary.indexOf(element)}`);
        book.appendChild(bookinfo);
        
        book.addEventListener('dblclick', function(){
            
            let index = this.getAttribute('data-index');
            myLibrary.splice(index, 1);
            
            this.remove();
            return forDisplay();

        })
        
        titleInput.value = "";
        author.value = "";
        pages.value = "";
        readInput.value = false;
        return container.appendChild(book);
    })
    }

