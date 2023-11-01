import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageDto } from './dto/message.dto';

@ApiTags('Message')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ description: 'Exibe mensagem' })
  @ApiOkResponse({ type: MessageDto })
  getMessage(): MessageDto {
    return this.appService.getMessage();
  }
}
