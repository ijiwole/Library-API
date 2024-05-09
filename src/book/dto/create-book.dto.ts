import { Category } from "../book.schema"


export class CreateBookDto {
    readonly title: string
    readonly description: string
    readonly price: number
    readonly author: string
    readonly category: Category 
}