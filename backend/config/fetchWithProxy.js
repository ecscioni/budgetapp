import fetch from 'node-fetch';
import { ProxyAgent } from 'proxy-agent';

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
const agent = proxyUrl ? new ProxyAgent(proxyUrl) : undefined;

export async function fetchWithProxy(url, options = {}) {
  return fetch(url, { agent, ...options });
}
