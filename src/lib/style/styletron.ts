import { Client, Server } from 'styletron-engine-atomic';

export const STYLETRON_CLASSNAME = '_styletron_hydrate_';

export const styletron =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: document.getElementsByClassName(
          STYLETRON_CLASSNAME,
        ) as HTMLCollectionOf<HTMLStyleElement>,
      });

export const isServerStyletron = (props: Client | Server): props is Server =>
  'getStylesheets' in styletron;
