import { BadRequestException, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { BaseUserManagesServerGuard } from '../../../common/guards/BaseUserManagesServer.guard';
import * as qs from 'qs';
import { GetDiscordWebhooksInputDto } from '../dto/get-discord-webhooks.input.dto';

@Injectable()
export class UserManagesWebhookServerGuard extends BaseUserManagesServerGuard {
  getServerId(request: FastifyRequest): string | undefined {
    const query = qs.parse(
      request.query as string,
    ) as unknown as GetDiscordWebhooksInputDto;

    const serverId = query?.filters?.serverId as string | undefined;

    if (!serverId) {
      throw new BadRequestException('Missing serverId in filters query');
    }

    return serverId;
  }
}
