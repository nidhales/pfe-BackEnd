import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  pusher: Pusher;
  constructor() {
    this.pusher = new Pusher({
      appId: '1619669',
      key: '96292b410eff59663717',
      secret: 'f5c639d8798678ab981e',
      cluster: 'eu',
      useTLS: true,
    });
  }
  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }
}
