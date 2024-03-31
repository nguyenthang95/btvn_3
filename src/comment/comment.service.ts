import { Injectable } from '@nestjs/common';
import { comment } from '@prisma/client';
import { ApiResponse } from 'src/api-dto/api-response.model';
import { Comment } from 'src/api-dto/comment.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly _prismaService: PrismaService,
  ) { }
  findAll() {
    return `This action returns all comment`;
  }

  async getCommentByImageId(imageId: number): Promise<ApiResponse<any>> {
    const comments = await this._prismaService.comment.findMany({
      where: {
        image_id: +imageId
      }
    })
    return {
      data: comments,
      statusCode: 200
    }
  }

  async createComment(comment: comment): Promise<ApiResponse<comment>> {

    const data: comment = {
      ...comment,
      create_date: new Date()
    }

    const result = await this._prismaService.comment.create({ data: data })

    return {
      data: result,
      statusCode: 200
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
