import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { comment } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Post()
  create(@Body() comment:comment){
    return this.commentService.createComment(comment)
  }

  @Get(':id')
  getCommentByImageId(@Param('id') id: string) {
    return this.commentService.getCommentByImageId(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
