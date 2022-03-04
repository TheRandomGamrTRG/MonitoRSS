import { Controller, Get, UseGuards } from '@nestjs/common';
import { NestedQuery } from '../../common/decorators/NestedQuery';
import { DiscordOAuth2Guard } from '../../common/guards/DiscordOAuth2.guard';
import { TransformValidationPipe } from '../../common/pipes/TransformValidationPipe';
import { DiscordWebhooksService } from './discord-webhooks.service';
import { GetDiscordWebhooksInputDto } from './dto/get-discord-webhooks.input.dto';
import { GetDiscordWebhooksOutputDto } from './dto/get-discord-webhooks.output.dto';
import { UserManagesWebhookServerGuard } from './guards/UserManagesWebhookServer.guard';

@Controller('discord-webhooks')
@UseGuards(DiscordOAuth2Guard)
export class DiscordWebhooksController {
  constructor(
    private readonly discordWebhooksService: DiscordWebhooksService,
  ) {}

  @Get()
  @UseGuards(UserManagesWebhookServerGuard)
  async getWebhooks(
    @NestedQuery(TransformValidationPipe)
    getWebhooksInputDto: GetDiscordWebhooksInputDto,
  ): Promise<GetDiscordWebhooksOutputDto> {
    const serverId = getWebhooksInputDto.filters.serverId;
    const webhooks = await this.discordWebhooksService.getWebhooksOfServer(
      serverId,
    );

    return GetDiscordWebhooksOutputDto.fromEntities(webhooks);
  }
}
