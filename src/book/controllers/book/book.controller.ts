import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateBookDto } from 'src/book/dtos/CreateBook.dto';
import { UpdateBookDto } from 'src/book/dtos/UpdateBook.dto';
import { BookService } from 'src/book/services/book/book.service';

@Controller('books')
export class BookController {

    constructor(private bookService: BookService){}

    @Get()
    findBooks(){
        return this.bookService.findBooks();
    }

    @Get(':id')
    findBookById(
        @Param('id',ParseIntPipe) id:number
    ){
        return this.bookService.findBookById(id);
    }

    @Post()
    createBook(
        @Body() createBookDto: CreateBookDto
    ){
        return this.bookService.createBook(createBookDto);
    }

    @Put(':id')
    async updateBook(
        @Param('id',ParseIntPipe) id: number,
        @Body() updateBook: UpdateBookDto
    ){
        await this.bookService.updateBook(id, updateBook);
    }

    @Delete(':id')
    async deleteBook(        
        @Param('id',ParseIntPipe) id: number
    ){
        await this.bookService.deleteBook(id);
    }
}
