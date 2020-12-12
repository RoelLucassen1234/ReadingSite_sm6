import { BaseChapter } from './BaseChapter';
import { Role } from './role';

export class FictionInfo {
    author: string;
    title : String; 
    description : string;
    cover : string;
    chapters : BaseChapter[];
}