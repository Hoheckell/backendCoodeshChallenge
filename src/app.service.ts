import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class AppService {
  getMessage(): MessageDto {
    const response: MessageDto = {
      message: 'Fullstack Challenge 🏅 - Space X API',
    };
    return response;
  }
}
