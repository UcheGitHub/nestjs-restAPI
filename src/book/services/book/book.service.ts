import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/book/dtos/CreateBook.dto';
import { UpdateBookDto } from 'src/book/dtos/UpdateBook.dto';
import { Book } from 'src/typeorm/entities/book';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) private bookRepository:Repository<Book>
    ){}

    findBooks(){
        return this.bookRepository.find();
    }

    async findBookById(
        id:number
    ){
        const book = await this.bookRepository.findOneBy({id});
        if(!book)
            throw new HttpException(
                'Book not found',
                HttpStatus.BAD_REQUEST
            );
        return book
    }

    createBook(bookDetails:CreateBookDto){
        const newBook = this.bookRepository.create(
            bookDetails,
        );
        return this.bookRepository.save(newBook);
    }

    updateBook(
        id:number,
        updateBookDetails:UpdateBookDto
    ){
        return this.bookRepository.update({id}, {...updateBookDetails});
    }

    deleteBook(
        id:number,
    ){
        return this.bookRepository.delete({id});
    }

}
