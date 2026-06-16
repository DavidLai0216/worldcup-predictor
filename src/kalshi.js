'use strict';

const crypto = require('node:crypto');

function normalizePrivateKey(privateKey) {
  return String(privateKey || '').replace(/\\n/g, '\n').trim();
}

function buildKalshiSignaturePayload(timestampMs, method, pathWithQuery) {
  return `${timestampMs}${String(method || 'GET').toUpperCase()}${pathWithQuery}`;
}

function signKalshiRequest({ timestampMs, method = 'GET', pathWithQuery, privateKey }) {
  const normalizedKey = normalizePrivateKey(privateKey);
  if (!normalizedKey) throw new Error('Kalshi private key is missing');

  const payload = buildKalshiSignaturePayload(timestampMs, method, pathWithQuery);
  return crypto.sign('sha256', Buffer.from(payload), {
    key: normalizedKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
  }).toString('base64');
}

function buildKalshiHeaders({ keyId, privateKey, method = 'GET', pathWithQuery, timestampMs = Date.now() }) {
  if (!keyId || !privateKey) return null;
  return {
    'KALSHI-ACCESS-KEY': keyId,
    'KALSHI-ACCESS-TIMESTAMP': String(timestampMs),
    'KALSHI-ACCESS-SIGNATURE': signKalshiRequest({ timestampMs, method, pathWithQuery, privateKey }),
    'Content-Type': 'application/json',
  };
}

function kalshiEnabled(env = process.env) {
  return Boolean(env.KALSHI_KEY_ID && env.KALSHI_PRIVATE_KEY);
}

function parseKalshiMarkets(payload) {
  const markets = payload?.markets || payload?.data?.markets || [];
  return Array.isArray(markets) ? markets.map((market) => ({
    ticker: market.ticker,
    title: market.title || market.subtitle || market.ticker,
    yesAsk: market.yes_ask ?? market.yesAsk ?? null,
    yesBid: market.yes_bid ?? market.yesBid ?? null,
    noAsk: market.no_ask ?? market.noAsk ?? null,
    noBid: market.no_bid ?? market.noBid ?? null,
    closeTime: market.close_time || market.closeTime || null,
    raw: market,
  })) : [];
}

module.exports = {
  normalizePrivateKey,
  buildKalshiSignaturePayload,
  signKalshiRequest,
  buildKalshiHeaders,
  kalshiEnabled,
  parseKalshiMarkets,
};
