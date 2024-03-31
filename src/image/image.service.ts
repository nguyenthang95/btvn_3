import { Injectable } from '@nestjs/common';
import { image } from '@prisma/client';
import { ApiResponse } from 'src/api-dto/api-response.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {

  constructor(
    private readonly _prismaService: PrismaService,
  ) { }

  async findAll(): Promise<ApiResponse<image[]>> {
    const images = await this._prismaService.image.findMany();
    return {
      data: images,
      statusCode: 200,
      message: ''
    }
  }

  async findByName(name: string): Promise<ApiResponse<image[]>> {
    const image = await this._prismaService.image.findMany({
      where: {
        image_name: {
          contains: name
        }
      }
    })
    return {
      data: image,
      statusCode: 200,
      message: ''
    };
  }

  async getDetail(id: number): Promise<ApiResponse<any>> {
    const imageInfo = await this._prismaService.image.findFirst({
      where: {
        image_id: +id
      },
      include: {
        users: true
      }
    })
    if (!imageInfo) {
      return {
        statusCode: 400,
        message: "Image is not exist",
        data: null
      }
    }
    return {
      data: imageInfo,
      statusCode: 200,
    }
  }

  async create(file: Express.Multer.File, request: Request): Promise<ApiResponse<image>> {
    const url = `${request.headers['host']}/public/imgs/${file.filename}`
    const data: any = {
      user_id: request['user']?.userId,
      url: url,
      image_name: file.originalname,
      description: '',
    }
    let result = await this._prismaService.image.create({
      data: data
    })

    return {
      data: result,
      statusCode: 200
    }
  }
}
