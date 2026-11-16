# Caja 5 de 15 · Fase 1 · Equipo B (Gabriela + Roberto) · Clientes, contratos y áreas

| | |
|---|---|
| **Orden** | Caja **5**. Va después de la caja 4 (A · máquinas) y **antes** de la caja 6 (C · asignaciones, que usa el buscador de clientes) |
| **Repos** | **Los dos** |
| **Rama** | `feature/f1-clientes` (en los dos repos) |
| **Historias** | S1-04 · Clientes (HU-04) · 3 pts (**Roberto**) · S2-01 · Contratos con tarifas (HU-05) · 8 pts (**Roberto**) · Áreas por cliente (parte de HU-06; se movieron a este equipo porque su pantalla depende de Clientes) (**Gabriela**) |
| **Fecha** | Miércoles 19 de noviembre |
| **Desbloquea** | Caja 6 (C · asignaciones) |

---

## 0. Antes de empezar

- [ ] `00-ANTES-DE-EMPEZAR.md` hecho.
- [ ] Caja 4 (A · máquinas) mergeada en `develop` en los dos repos:

```powershell
cd C:\printflow\SE2-4-Printflow;          git checkout develop; git pull
Test-Path .\src\routes\maquina\maquina.routes.js
cd ..\SE2-4-Printflow-Frontend;           git checkout develop; git pull
Test-Path .\src\app\Maquinas\pages\Maquinas.page.tsx
```

Esperado: dos `True`.

- [ ] `docker compose down -v; docker compose up -d --build` y login con `admin@printflow.local` / `Printflow2026*`.

---

## 1. Qué trae la caja

| Lado | Rutas | Qué es |
|---|---|---|
| backend | `src/{models,controllers,routes}/cliente/` | Clientes: CRUD, búsqueda, historial y desactivar/activar. **El controller también tiene los contratos** |
| backend | `src/routes/contrato/` | Rutas de contratos (usan el controller de cliente) |
| backend | `src/{models,controllers,routes}/area/` | Áreas por cliente |
| frontend | `src/app/Clientes/` | Listado, formulario de cliente, formulario de contrato, detalle y búsqueda |
| frontend | `src/app/Area/` | Pantalla de áreas |
| frontend | `src/services/Clientes/`, `src/services/Area/` | Llamadas a la API |
| frontend | `src/types/Cliente/cliente.types.ts`, `src/types/Contrato/`, `src/types/Area/` | Tipos |

### Líneas etiquetadas a activar: `[B-F1]`

| Repo | Archivo | Líneas |
|---|---|---|
| backend | `src/app.js` | **6** (3 `require` + 3 `app.use`) |
| frontend | `src/App.tsx` | **4** (2 imports + 2 rutas) |
| frontend | `src/data/modulos.data.ts` | **4** (2 iconos + «Clientes» y «Área») |

---

## 2. Paso a paso

### 2.1 Ramas

```powershell
cd C:\printflow\SE2-4-Printflow;          git checkout develop; git pull; git checkout -b feature/f1-clientes
cd ..\SE2-4-Printflow-Frontend;           git checkout develop; git pull; git checkout -b feature/f1-clientes
```

### 2.2 Copiar la caja

```powershell
$CAJA = "C:\printflow\CAJAS\EQUIPO-B_Gabriela-Roberto\fase-1_clientes-contratos-areas"
Copy-Item -Path "$CAJA\backend\*"  -Destination "C:\printflow\SE2-4-Printflow"          -Recurse -Force
Copy-Item -Path "$CAJA\frontend\*" -Destination "C:\printflow\SE2-4-Printflow-Frontend" -Recurse -Force
```

`git status`: solo archivos **nuevos**.

### 2.3 Activar las líneas `[B-F1]`

`Ctrl+F` → `[B-F1]` en los 3 archivos de la tabla → quita el `// ` del inicio. En `src/app.js` deben quedar:

```js
const clienteRoutes = require('@routes/cliente/cliente.routes'); // [B-F1]
const contratoRoutes = require('@routes/contrato/contrato.routes'); // [B-F1]
const areaRoutes = require('@routes/area/area.routes'); // [B-F1]
app.use('/api/clientes', clienteRoutes); // [B-F1]
app.use('/api/contratos', contratoRoutes); // [B-F1]
app.use('/api/areas', areaRoutes); // [B-F1]
```

### 2.4 Comprobar

```powershell
cd C:\printflow\SE2-4-Printflow;          npm install; npm run verificar
cd ..\SE2-4-Printflow-Frontend;           npm install; npm run build
cd ..\SE2-4-Printflow;                    docker compose up -d --build
```

En http://localhost:8080:

- [ ] Aparecen «Clientes» y «Área» en el menú
- [ ] Crear un cliente de prueba (RUC inventado de 13 dígitos, ej. `0999999999001`)
- [ ] Crear un contrato para ese cliente con fechas y costos B/N y color
- [ ] Crear dos áreas para ese cliente
- [ ] Buscar el cliente por nombre y por RUC
- [ ] Desactivar el cliente y recuperarlo con «Mostrar inactivos»

---

## 3. Mejoras obligatorias

### 3.1 RUC válido y único (Roberto)

La caja 3 dejó `UNIQUE` en `clientes.ruc`. Falta en la API (`cliente.controller.js`, crear y editar):

- [ ] RUC con exactamente 13 dígitos (`/^\d{13}$/`) → si no, **400** «El RUC debe tener 13 dígitos»
- [ ] RUC repetido → **409** «Ya existe un cliente con ese RUC» (captura el error de Postgres `23505`)
- [ ] Lo mismo en el formulario (`ClientDetailsFields.tsx`) para avisar antes de enviar

### 3.2 Desactivar sin borrar (Roberto)

- [ ] Comprueba que `DELETE /api/clientes/:id` hace `UPDATE ... SET activo = false` y **no** borra. Si borra, cámbialo
- [ ] La casilla «Mostrar inactivos» existe en el listado y usa `GET /api/clientes/inactivos`

### 3.3 Reglas del contrato (Roberto)

En el controller de contratos (crear y editar):

- [ ] `fecha_fin` menor que `fecha_inicio` → **400** «La fecha fin no puede ser anterior a la de inicio»
- [ ] Si se superpone con otro contrato **activo** del mismo cliente → responde igual con éxito pero agrega `advertencia: "Se superpone con el contrato #N"`, y el frontend la muestra con `ModalAdvertencia`
- [ ] Al menos un costo (B/N o color) mayor que 0

### 3.4 Áreas solo del cliente (Gabriela)

- [ ] Al crear un área se elige el cliente con `BusquedaInteligenteClientes`
- [ ] El listado de áreas se puede filtrar por cliente
- [ ] Todos los textos de Clientes y Áreas en español

### 3.5 Pendiente para el PO (Gabriela lo anota en el PR)

El plan pide en el contrato **código, tipo de servicio y día de corte**, que hoy no existen. No se implementan sin la decisión del PO: anótalo en la descripción del PR.

---

## 4. Commit, push y PR

```powershell
cd C:\printflow\SE2-4-Printflow
git add -A; git commit -m "feat(clientes): migra clientes, contratos y áreas"
git push -u origin feature/f1-clientes
cd ..\SE2-4-Printflow-Frontend
git add -A; git commit -m "feat(clientes): pantallas de clientes, contratos y áreas"
git push -u origin feature/f1-clientes
```

PR a **`develop`** en cada repo · título `F1 · B · Clientes, contratos y áreas (S1-04, S2-01)` · revisor del Equipo **C** · mergear **primero el backend**.

## 5. Al terminar

> «Caja 5 (B · clientes) mergeada en los dos repos. **Equipo C: pueden empezar la caja 6 (asignaciones).**»

## Si algo falla

| Síntoma | Solución |
|---|---|
| `Cannot find module '@controllers/cliente/cliente.controller'` en contratos | Copiaste solo `routes/contrato`; vuelve a copiar la carpeta `backend` completa |
| 500 al crear cliente | `docker compose logs api`: suele ser un campo obligatorio que no se envió |
