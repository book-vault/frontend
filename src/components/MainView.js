import React from 'react';
import Books from './Books';
import CreateBook from './CreateBook';
import UpdateBook from './UpdateBook';

const MainView = ({ view, books, setView, setBookToEdit, addBook, updateBook, deleteBook , bookToEdit }) => {
  return (
    <>
      {view === 'list' && (
        <Books
          books={books}
          onCreateClick={() => setView('create')}
          onUpdateClick={(book) => { setBookToEdit(book); setView('update'); }}
          onDeleteClick={deleteBook}
        />
      )}
      {view === 'create' && <CreateBook onSubmit={addBook} />}
      {view === 'update' && <UpdateBook book={bookToEdit} onSubmit={updateBook} />}
    </>
  );
};

export default MainView;
