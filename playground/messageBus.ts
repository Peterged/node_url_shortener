import { z } from 'zod';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
type EventsConfigToDiscriminateUnion<T extends Record<string, z.ZodRawShape>> = {
  [K in keyof T]: Prettify<{
    type: K;
  } & z.infer<z.ZodObject<T[K]>>>
}[keyof T];

declare const createMessageProtocol: <
T extends Record<string, z.ZodRawShape>,
EventsAsToDiscriminateUnion = EventsConfigToDiscriminateUnion<T>>(opts: {
  events: T;
}) => {
  createHandler: (sender:
  (event: EventsAsToDiscriminateUnion) => void)
  => (event: EventsAsToDiscriminateUnion) => void;
};

export { EventsConfigToDiscriminateUnion, Prettify, createMessageProtocol };

const a = createMessageProtocol({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
  },
});
