# STATS

### localhost:3000/count/author
- [POST]
### body
[
    {
        "Author": "a36d0ce6-01c7-4050-9d52-ddaa3d28780d"
    },
    {
        "Author": "4d6cd681-ac46-4426-898b-69606cae5313"
    }
]

### localhost:3000/count/publisher
- [POST]
### body
[
    {
        "Publisher": "ee6f918b-72b2-4ef3-85d6-51a21a23da7e"
    },
    {
        "Publisher": "70919124-72c6-4bf5-a4ef-51b4bf07e6ba"
    }
]

### localhost:3000/count/genre
- [POST]
### body
[
    {
        "Genre": "28422f08-d3ce-4a59-bf84-adcafafeb787"
    },
    {
        "Genre": "c5ba3409-824e-4bc3-a58c-3a296073c157"
    }
]

<br>

### localhost:3000/after/:year/:pageNo
- [GET]

### localhost:3000/before/:year/:pageNo
- [GET]

<br>

### localhost:3000/publisherAndGenre
- [POST]
# body
[
    {
        "Publisher": "0951db7a-b83c-4345-a89f-accae6539f92"
    },
    {
        "Publisher": "70919124-72c6-4bf5-a4ef-51b4bf07e6ba"
    }
]

<br>

### localhost:3000/booksOfAuthor?id=a36d0ce6-01c7-4050-9d52-ddaa3d28780d
- [GET]

### localhost:3000/booksOfPublisher?id=3ae17809-2d59-4f0e-9f80-fe274bafb2be
- [GET]

### localhost:3000/booksOfGenre?id=28422f08-d3ce-4a59-bf84-adcafafeb787
- [GET]

### localhost:3000/books/:searchText/:page
### localhost:3000/books/533/1
- [GET]

### localhost:3000/authors/:searchText/:page
### localhost:3000/authors/1532/1
- [GET]

### localhost:3000/publishers/:searchText/:page
### localhost:3000/publishers/1532/1
- [GET]

<br>
<br>
<br>

# CRUD

## Books

### localhost:3000/books/:page
### localhost:3000/books/1
- [GET]

### localhost:3000/admin/addBook
- [POST]

### body
{
    "Title": "Atomic Habits",
    "Author": "33828445-958f-4592-a04b-afbf1aa74a7f",
    "Publisher": "adca7ed9-3b3d-4620-bf8b-1e8fdbed02a3",
    "Genre": "f4b0d026-0fe0-4859-a4bf-dae008a9e0e4",
    "Publication_Year": "2023",
    "ISBN": "ISBN 1507890"
}

### localhost:3000/admin/editBook
- [POST]

### body 
{
    "Title": "Atomic Habits",
    "Author": "33828445-958f-4592-a04b-afbf1aa74a7f",
    "Publisher": "adca7ed9-3b3d-4620-bf8b-1e8fdbed02a3",
    "Genre": "f4b0d026-0fe0-4859-a4bf-dae008a9e0e4",
    "Publication_Year": "2023",
    "ISBN": "ISBN 1507890"
}

### localhost:3000/admin/deleteBook?id
### localhost:3000/admin/deleteBook?id=66048e07-3fd6-46ee-801c-565f583279bf
- [DELETE]

## Authors


### localhost:3000/authors/:page
### localhost:3000/authors/1
- [GET]

### localhost:3000/admin/addAuthor
- [POST]

### body
{
    "Name": "Sumayyah Sayyed",
    "Birth_Date": "1994-09-26 17:00:00.000 -0700",
    "Country": "Country 21",
    "Biography": "Biography 11"
}


### localhost:3000/admin/editAuthor
- [POST]

### body 
{
    "id": "9367a622-8f70-4f87-848a-4c162100d179",
    "Name": "Sumayyah Sayyed",
    "Birth_Date": "1994-09-26 17:00:00.000 -0700",
    "Country": "Country 21",
    "Biography": "Biography 11"
}


### localhost:3000/admin/deleteAuthor?id
### localhost:3000/admin/deleteAuthor?id=9367a622-8f70-4f87-848a-4c162100d179
- [DELETE]


## Genres


### localhost:3000/genres/:page
### localhost:3000/genres/1
- [GET]

### localhost:3000/admin/addGenre
- [POST]

### body
{
    "Name": "Thriller"
}

### localhost:3000/admin/editGenre
- [POST]

### body 
{
    "id": "0a37fd5c-4735-4666-86d0-7f0376dc83ec",
    "Name": "Thriller Genre"
}

### localhost:3000/admin/deleteGenre?id
### localhost:3000/admin/deleteGenre?id=0a37fd5c-4735-4666-86d0-7f0376dc83ec
- [DELETE]

## Publishers

### localhost:3000/publishers/:page
### localhost:3000/publishers/1
- [GET]

### localhost:3000/admin/addPublisher
- [POST]

### body
{
    "Name": "Sumayyah Sayyed",
    "Genre_Speciality": "83c90b7f-2eac-4f31-b1ee-d3161ae81ab3",
    "Founded_Date": "2013-05-19 00:00:00.000 -0700",
    "City": "City 4501",
    "Country": "Pakistan"
}

### localhost:3000/admin/editPublisher
- [POST]

### body 
{
    "id": "0a37fd5c-4735-4666-86d0-7f0376dc83ec",
    "Name": "Thriller Genre"
}

### localhost:3000/admin/deletePublisher?id
### localhost:3000/admin/deletePublisher?id=0a37fd5c-4735-4666-86d0-7f0376dc83ec
- [DELETE]
