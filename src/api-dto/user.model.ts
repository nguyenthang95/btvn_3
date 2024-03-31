import { ApiProperty } from "@nestjs/swagger";

export class UserLogin {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class UserBody {
    @ApiProperty()
    full_name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    age: number;
    @ApiProperty()
    avatar: string;
  }