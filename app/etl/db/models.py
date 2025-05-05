
# Definición del esquema de la base de datos
DB_SCHEMA = """
CREATE TABLE IF NOT EXISTS ventas_mibi (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    client_id INTEGER NOT NULL,
    producto VARCHAR(255) NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mibi_fecha ON ventas_mibi (fecha);
"""