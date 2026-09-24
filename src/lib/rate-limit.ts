interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

interface ClientRecord {
  count: number;
  resetTime: number;
}

const clientMap = new Map<string, ClientRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of clientMap.entries()) {
    if (now > record.resetTime) {
      clientMap.delete(key);
    }
  }
}, 60000);

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 60000, maxRequests: 20 }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = clientMap.get(identifier);

  if (!record || now > record.resetTime) {
    const newRecord: ClientRecord = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    clientMap.set(identifier, newRecord);
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetTime: newRecord.resetTime,
    };
  }

  if (record.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
