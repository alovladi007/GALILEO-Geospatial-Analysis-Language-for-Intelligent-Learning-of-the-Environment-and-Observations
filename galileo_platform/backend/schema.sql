-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Environmental sensor table
CREATE TABLE IF NOT EXISTS sensors (
    id SERIAL PRIMARY KEY,
    sensor_id VARCHAR(20) NOT NULL,
    type VARCHAR(50) NOT NULL,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    value FLOAT NOT NULL,
    unit VARCHAR(10) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
);

-- Telemetry events table
CREATE TABLE IF NOT EXISTS telemetry (
    id SERIAL PRIMARY KEY,
    source VARCHAR(20) NOT NULL,
    entity_id VARCHAR(20) NOT NULL,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    altitude FLOAT,
    velocity FLOAT,
    timestamp TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sensors_location ON sensors USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_telemetry_location ON telemetry USING GIST(location);