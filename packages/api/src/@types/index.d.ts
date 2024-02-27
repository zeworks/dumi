import FastifyRequest from "fastify";
import { Context } from "../engine/context";

declare module 'fastify' {
  interface FastifyRequest<B = any> {
    _context?: Context,
    body: B
  }
}
