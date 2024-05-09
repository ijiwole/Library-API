import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import  * as mongoose from 'mongoose';


@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModoel : mongoose.Model<Book>
    ){}

    async findAll() : Promise<Book[]> {
        const books = await this.bookModoel.find()
        return books;
    }

    async create(book: Book): Promise<Book>{
        const res = await this.bookModoel.create(book)
        return res; 
    }

    async findById(id: string): Promise<Book>{
        const  book = await this.bookModoel.findById(id)

        if(!book){
            throw new NotFoundException('Book Not found!')
        }

        return book
    }

    async updateById(id: string, book: Book): Promise<Book>{
        return await this.bookModoel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        }) 
    }

    async deleteById(id:string): Promise<Book>{
        return await this.bookModoel.findByIdAndDelete(id)
    }
}

