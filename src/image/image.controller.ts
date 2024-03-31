import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageBody } from 'src/api-dto/image.model';
import { ApiBody, ApiConsumes, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileUpload } from 'src/api-dto/file-upload.model';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/api-dto/api-response.model';

const config = {
  storage: diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
  })
}

@UseGuards(AuthGuard('jwt'))
@ApiTags("image")
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Get()
  async getImages(@Query('searchText') name?: string) {
    return await this.imageService.findByName(name)
  }

  @Get(':id')
  async getDetail(@Param('id') id: number) {
    return await this.imageService.getDetail(id);
  }
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.imageService.getDetail(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUpload })
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: process.cwd() + "/public/imgs",
      filename: (req, file, callback) => {
        return callback(null, new Date().getTime() + "_" + file.originalname)
      }
    })

  }))
  @Post()
  async create(@Req() request: Request, @UploadedFile() file: Express.Multer.File): Promise<ApiResponse<any>> {
    return this.imageService.create(file, request)
  }
}
