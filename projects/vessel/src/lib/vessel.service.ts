import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { combineLatest, map, Observable, switchMap } from 'rxjs';

import { ArteryStatus } from '@vivotech/artery/dist/core';
import { NpmPackage } from '/home/.debi/pulse/src/service/index';

@Injectable({
  providedIn: 'root',
})
export class Vessel {
  client = inject(HttpClient);

  lists = signal<{ [signature: string]: unknown[] }>({});

  status = signal<ArteryStatus | undefined>(undefined);
  message = signal<string>('init');
  socket: WebSocket | null = null;

  pulseDetected: number | undefined;
  package: string | undefined;
  url = '127.0.0.1';

  constructor() {
    this.#init();

    const detector = setInterval(() => {
      if (!this.pulseDetected) {
        this.#init();
      } else {
        clearInterval(detector);
      }
    }, 3000);
  }

  send<Type = unknown>(data: Type) {
    this.socket?.send(JSON.stringify(data));
  }

  use(name: string) {
    if (this.package) {
      return;
    }

    this.package = name;

    this.initLists().subscribe((lists) => {
      const items = lists.reduce(
        (ob, item) => ({ ...ob, [item.signature]: item.list }),
        {}
      );

      this.lists.set(items);
    });

    this.#getArteries().subscribe((arteries) => {
      const art = arteries.find((art) => art.name === name);
      if (!art) {
        console.error(`artery ${name} not found`);
        return;
      }

      if (art.port) {
        this.#connect(art.port);
      } else {
        console.error(`artery ${name} not active`);
      }
    });
  }

  initLists() {
    return this.getLists().pipe(
      switchMap((lists) =>
        combineLatest(
          lists.map((signature) =>
            this.#getList(signature).pipe(
              map((list) => ({
                signature,
                list,
              }))
            )
          )
        )
      )
    );
  }

  #getList(signature: string) {
    return this.client.get(`http://127.0.0.1:3963/list/all`, {
      params: {
        signature,
      },
    });
  }

  getLists() {
    /*
    const npm = this.client.get<NpmPackage[]>(
      'https://registry.npmjs.org/-/v1/search?text=vessel'
    );
    */

    return this.client.get('http://127.0.0.1:3963/lists') as Observable<
      string[]
    >;
  }

  #init() {
    this.#check().subscribe((status) => {
      this.pulseDetected = Date.now();
      this.message.set('detected');
      this.status.set(status);
    });
  }

  #connect(port: number) {
    if (this.socket) {
      return false;
    }

    this.socket = new WebSocket(`ws://${this.url}:${port}`);

    this.socket.addEventListener('open', () => this.message.set('connected'));
    this.socket.addEventListener('close', () => {
      this.message.set('lost');
      this.socket = null;

      setTimeout(() => this.#connect(port), 3000);
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      console.log(message);
    });

    return true;
  }

  #check() {
    return this.client.get(
      `http://${this.url}:3963/status`
    ) as Observable<ArteryStatus>;
  }

  #getArteries() {
    return this.client.get(`http://${this.url}:3963/list/all`, {
      params: { signature: 'arteries' },
    }) as Observable<NpmPackage[]>;
  }
}
