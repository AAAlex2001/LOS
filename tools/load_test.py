#!/usr/bin/env python3
"""Простой асинхронный нагрузочный тестер.

Примеры:
  pip install -r tools/requirements.txt
  python tools/load_test.py --url https://dimention.ru/ --rps 10 --duration 60
  python tools/load_test.py --url https://176.57.67.21:443/ --rps 10 --duration 60 --host-header dimention.ru --insecure
"""
import argparse
import asyncio
import ssl
import time
from statistics import mean, median

import aiohttp


async def fetch(session, url, stats, sem, host_header=None):
    async with sem:
        start = time.perf_counter()
        headers = {}
        if host_header:
            headers["Host"] = host_header
        try:
            async with session.get(url, headers=headers) as resp:
                body = await resp.read()
                elapsed = (time.perf_counter() - start) * 1000
                stats["latencies"].append(elapsed)
                stats["total"] += 1
                stats["success"] += 1 if 200 <= resp.status < 400 else 0
                print(f"[{time.strftime('%H:%M:%S')}] status={resp.status} elapsed={elapsed:.1f}ms size={len(body)}", flush=True)
        except Exception as e:
            elapsed = (time.perf_counter() - start) * 1000
            stats["latencies"].append(elapsed)
            stats["total"] += 1
            stats["errors"] += 1
            print(f"[{time.strftime('%H:%M:%S')}] ERROR {e} elapsed={elapsed:.1f}ms", flush=True)


async def run(url, rps, duration, host_header=None, insecure=False, burst=False):
    stats = {"total": 0, "success": 0, "errors": 0, "latencies": []}
    sem = asyncio.Semaphore(1000)

    ssl_context = None
    if url.startswith("https") and insecure:
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

    timeout = aiohttp.ClientTimeout(total=30)
    connector = aiohttp.TCPConnector(ssl=ssl_context)

    async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
        stop_time = time.time() + duration
        tasks = []
        if burst:
            per_second = max(1, int(rps))
            while time.time() < stop_time:
                # launch per_second requests in parallel
                for _ in range(per_second):
                    tasks.append(asyncio.create_task(fetch(session, url, stats, sem, host_header)))
                # wait exactly one second before next burst
                await asyncio.sleep(1)
        else:
            interval = 1.0 / rps
            next_time = time.time()
            while time.time() < stop_time:
                # schedule request
                tasks.append(asyncio.create_task(fetch(session, url, stats, sem, host_header)))
                next_time += interval
                sleep_for = next_time - time.time()
                if sleep_for > 0:
                    await asyncio.sleep(sleep_for)

        # wait for outstanding tasks
        if tasks:
            await asyncio.gather(*tasks, return_exceptions=True)

    lat = stats["latencies"]
    print("--- Load test summary ---")
    print(f"URL: {url}")
    if host_header:
        print(f"Host header: {host_header}")
    print(f"Duration: {duration}s, Target RPS: {rps}")
    print(f"Total requests: {stats['total']}")
    print(f"Successful (2xx-3xx): {stats['success']}")
    print(f"Errors: {stats['errors']}")
    if lat:
        print(f"Avg latency: {mean(lat):.1f} ms")
        print(f"Median latency: {median(lat):.1f} ms")
        print(f"Min latency: {min(lat):.1f} ms")
        print(f"Max latency: {max(lat):.1f} ms")


def parse_args():
    p = argparse.ArgumentParser(description="Simple asyncio load tester (aiohttp)")
    p.add_argument("--url", required=True, help="Target URL (include scheme)")
    p.add_argument("--rps", type=float, default=10.0, help="Requests per second")
    p.add_argument("--duration", type=int, default=60, help="Duration in seconds")
    p.add_argument("--burst", action="store_true", help="Launch int(rps) parallel requests each second (burst mode)")
    p.add_argument("--host-header", help="Set Host header (useful when hitting IP)")
    p.add_argument("--insecure", action="store_true", help="Disable SSL verification (use when targeting IP with HTTPS)")
    return p.parse_args()


def main():
    args = parse_args()
    try:
        asyncio.run(run(args.url, args.rps, args.duration, args.host_header, args.insecure, getattr(args, 'burst', False)))
    except KeyboardInterrupt:
        print("Interrupted")


if __name__ == "__main__":
    main()
