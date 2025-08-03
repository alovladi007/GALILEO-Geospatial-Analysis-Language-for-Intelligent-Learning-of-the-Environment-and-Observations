import asyncpg
import os
from typing import AsyncGenerator

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/galileo")

_pool: asyncpg.pool.Pool | None = None


async def init_pool() -> None:
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(dsn=DATABASE_URL, min_size=1, max_size=5)


after_event_handlers: list = []


async def get_connection() -> AsyncGenerator[asyncpg.Connection, None]:
    if _pool is None:
        await init_pool()
    async with _pool.acquire() as connection:
        yield connection