# Cajas de implementación · PrintFlow

Cada carpeta de fase es una **caja**: el código existente de Contadores que un equipo sube a los repos oficiales, con su `TAREA.md` paso a paso. El plan completo está en `SE2-4-Printflow/PLAN.md`.

**Antes de tocar cualquier caja, cada integrante hace una vez [`00-ANTES-DE-EMPEZAR.md`](00-ANTES-DE-EMPEZAR.md)** (programas, Git, repos, Docker y cómo funcionan las líneas etiquetadas).

> **Contexto importante: trabajamos con datos simulados.** El script que hace que las impresoras de DOX manden sus reportes de contadores por correo lo hizo y lo mantiene el **técnico de DOX, nuestro Product Owner y entrenador técnico**; no es parte de PrintFlow. Su requisito para nosotros: *«van a recibir estos reportes por montones y el sistema los debe registrar»*. El buzón y el flujo reales ya están en producción en el servidor de DOX y **no** podemos usarlos, así que todo el desarrollo y las pruebas se hacen con la **información de prueba que nos entregó el PO** (buzón de prueba, correos simulados, máquinas y series ficticias). Nunca uses datos reales de clientes. Detalle: `PLAN.md`, sección 1.1.

## Orden: siempre A → B → C. El Equipo C cierra cada fase

| # | Caja | Equipo | Fase | Fecha | Estado |
|---|---|---|---|---|---|
| 1 | `EQUIPO-A_Kiara-Marlo/fase-0_base-repos` | A | 0 | 15 nov | **Aplicada** en los repos locales (`feature/f0-base`); falta push y PR |
| 2 | `EQUIPO-B_Gabriela-Roberto/fase-0_estructura-web` | B | 0 | 17 nov | Lista para enviar |
| 3 | `EQUIPO-C_Samuel-Christian/fase-0_bd-y-auth` | C | 0 | 17 nov | Lista para enviar |
| 4 | `EQUIPO-A_Kiara-Marlo/fase-1_maquinas-y-cambios` | A | 1 | 19 nov | Lista |
| 5 | `EQUIPO-B_Gabriela-Roberto/fase-1_clientes-contratos-areas` | B | 1 | 19 nov | Lista |
| 6 | `EQUIPO-C_Samuel-Christian/fase-1_asignaciones` | C | 1 | 20 nov | Lista |
| 7 | `EQUIPO-A_Kiara-Marlo/fase-2_notificaciones-y-n8n` | A | 2 | 21 nov | Lista |
| 8 | `EQUIPO-B_Gabriela-Roberto/fase-2_listado-de-lotes` | B | 2 | 21 nov | Lista |
| 9 | `EQUIPO-C_Samuel-Christian/fase-2_ingesta-y-seguridad` | C | 2 | 22 nov | Lista · **cierra la puesta al día** |
| 10 | `EQUIPO-A_Kiara-Marlo/fase-3_smtp-y-robustez-n8n` | A | 3 | Sprint 3 | Trabajo nuevo |
| 11 | `EQUIPO-B_Gabriela-Roberto/fase-3_informe-frontend` | B | 3 | Sprint 3 | Lista + trabajo nuevo |
| 12 | `EQUIPO-C_Samuel-Christian/fase-3_informe-backend` | C | 3 | 13 dic | Lista + trabajo nuevo · cierra Sprint 3 |
| 13 | `EQUIPO-A_Kiara-Marlo/fase-4_excel-y-despliegue` | A | 4 | Sprint 4 | Trabajo nuevo |
| 14 | `EQUIPO-B_Gabriela-Roberto/fase-4_pdf-y-usuarios` | B | 4 | Sprint 4 | Trabajo nuevo |
| 15 | `EQUIPO-C_Samuel-Christian/fase-4_rendimiento-y-e2e` | C | 4 | 8 ene | Trabajo nuevo · **cierra el proyecto** |

Una caja empieza **solo** cuando la anterior está mergeada en `develop`. Cada `TAREA.md` tiene, en su sección 0, los comandos para comprobarlo.

## Qué trae cada `TAREA.md`

0. Qué comprobar antes (con comandos y resultado esperado)
1. Qué trae la caja y **cuántas líneas etiquetadas** activar en cada archivo
2. Paso a paso: rama, copiar, activar, compilar y probar
3. Mejoras obligatorias (lo que el código heredado no cumple del plan), quién hace cada una
4. Commit, push y PR (título, revisor)
5. Mensaje para avisar al siguiente equipo
6. Problemas comunes

## Comprobado (13 nov)

- Todos los archivos del código original tienen caja, salvo `knexfile.js`, `scripts/run_migration.js` y `react.svg` (descartados).
- **Simulación completa:** se clonaron los repos oficiales, se aplicaron las 11 cajas con código **en el orden de esta tabla**, copiando y activando las líneas etiquetadas como dicen las tareas. Después de **cada** caja el backend carga sin errores y el frontend compila sin errores. Al final quedan activas las 27 líneas de `app.js`, 15 de `App.tsx`, 12 de `modulos.data.ts` y 2 de `Sidebar.tsx`.
- **Caja 1 en Docker real:** levantan db, api, web y n8n; `/health` OK; la web carga; `/api/ingesta` responde 403 desde fuera; Socket.IO conecta.
- **Esquema de la caja 3 en PostgreSQL 17 vacío:** 25 tablas, 77 índices, 6 triggers, 3 roles y 7 tipos de notificación, sin errores.
- **Sistema completo en Docker (cajas 1 a 12 aplicadas):** web, rutas de la SPA y `/api-docs` → 200; sin token → 401; token falso → 401; login malo → 401; login de admin, operador y auditor → OK; con token, clientes, contratos, áreas, máquinas, notificaciones, staging y reportes → 200; `/api/ingesta` desde fuera → 403; la ingesta desde dentro de Docker con `ejemplo-ingesta.json` crea el lote, el staging y la notificación; Socket.IO conecta.
- **Encontrado:** `/api/lotes` da 500 (código MySQL heredado que nadie usa). Queda como mejora 3.6 de la caja 9.

Ninguna caja trae `.env`, credenciales ni datos de clientes. La carpeta `CAJAS` **no se sube a ningún repo**: se comparte por fuera (zip, Drive).
