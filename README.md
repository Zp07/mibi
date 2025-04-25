# MIBI - Plataforma Inteligente de Automatización de Datos Comerciales

> Un sistema modular de microservicios para el procesamiento, análisis y visualización de datos de ventas en una carnicería.

---

## 🚀 Propósito del Proyecto

**MIBI** nace como una solución para automatizar y profesionalizar el flujo de datos comerciales en negocios como carnicerías, tiendas de barrio o comercios medianos que con reportes periódicos pueden tomar decisiones basadas en datos.

Automatiza desde la adquisición (API o archivo), limpieza y transformación, hasta el almacenamiento en PostgreSQL y la visualización en Power BI.

Este proyecto tiene doble objetivo:

- Mostrar habilidades profesionales como Backend Developer y Data Engineer de nivel junior avanzado o mid level.
- Servir como MVP funcional para empresas reales.

---

## 📆 Caso de uso: Carnicería

- Productos: carnes por corte, embutidos, combos.
- Reportes diarios: ventas por producto, turno, cliente, forma de pago.
- Reportes mensuales para impuestos y stock.
- Predicción: productos más vendidos, tendencias por temporada.

---

## 🛍️ Tecnologías utilizadas

| Componente | Tecnologías                         |
| ---------- | ----------------------------------- |
| ETL + API  | Python, FastAPI, Pandas, SQLAlchemy |
| Gateway    | Node.js, Express, JWT, Helmet       |
| DB         | PostgreSQL 14+                      |
| Infra      | Docker, Docker Compose              |
| BI         | Power BI Desktop                    |

---

## 🛀 Arquitectura

```
+-------------------+        +-------------------+         +-------------------+
| Microservicio ETL | <-->   | PostgreSQL DB     | <-->    | Power BI Dashboards |
| Python + FastAPI  |        | Datos Normalizados|         | Consultas / CSVs   |
+-------------------+        +-------------------+         +-------------------+
         ^                              |
         |                              |
         v                              v
+-------------------+         +-------------------+
| API Gateway Node  | <-->    | Fuente de datos   |
| Express + JWT     |         | Simulada/API/Excel|
+-------------------+         +-------------------+
```

---

## 📋 Estructura de carpetas

mibi/
├── app/
│ ├── etl/ ⚙️ # Servicios de ETL, procesamiento de datos (FastAPI + Pandas)
│ ├── api/ 🔐 # API Gateway (Express + JWT, Autenticación)
│ ├── db/ 🗄️ # Scripts SQL y estructura de base de datos
│ ├── analytics/ 📄 # Archivos de Power BI y visualización de datos
│ ├── docker-compose.yml 🐳 # Orquestación de contenedores para desarrollo local
├── .gitignore # Archivos y carpetas a ignorar por Git
├── .env # Variables de entorno para configuración local
├── LICENSE # Licencia del proyecto
├── README.md # Documentación principal del proyecto

---

## 🚧 Setup Rápido

```bash
git clone https://github.com/tuusuario/mibi.git
cd mibi
docker-compose up --build
```

- Accede a FastAPI en: `http://localhost:8002/docs`
- Accede a Gateway en: `http://localhost:30022`
- PostgreSQL corre en: `localhost:5432`

---

## 📊 Power BI

Power BI se conecta directamente a PostgreSQL o importa CSVs generados por el ETL.

Se incluye un dashboard con:

- Ventas por tipo de carne.
- Comparativa entre días y meses.
- Margen bruto y stock proyectado.

---

## 🚫 Seguridad

- Capa de autenticación con JWT en el Gateway.
- Variables de entorno para claves y credenciales.

---

## 💡 Valor profesional

Este proyecto demuestra:

- Dominio de microservicios.
- Automatización de procesos de datos.
- Conexión entre Backend + BI real.
- Buenas prácticas con Docker y FastAPI.

---

## 🔄 Roadmap

- [ ] Crear generador de datos por API o IA (Magic Loops).
- [ ] Incluir lectura desde archivos Excel reales.
- [ ] Exponer Power BI Embed via iframe.
- [ ] Crear app frontend visual para no-técnicos.
- [ ] Desplegar en VPS para uso real.

---

## 👤 Autor

**Camilo Zapata**  
Backend Developer | Data Engineer | Automatizador de Procesos  
· [LinkedIn](https://www.linkedin.com/in/xpr07/)
