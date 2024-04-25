import FastifyRequest from "fastify";

declare module 'fastify' {
  interface FastifyRequest<B = any> {
    _context?: any,
    body: B
  }
}
