# Caja 8 de 15 · Fase 2 · Equipo B (Gabriela + Roberto) · Listado de lotes y reportes

| | |
|---|---|
| **Orden** | Caja **8**. Va después de la caja 7 (A · notificaciones) y antes de la 9 (C · ingesta) |
| **Repo** | Solo **frontend** |
| **Rama** | `feature/f2-listado-lotes` |
| **Historia** | S2-05 · Listado de reportes con estado y filtros (HU-02a) · 3 pts (**Gabriela**; Roberto prueba) |
| **Fecha** | Viernes 21 de noviembre |
| **Desbloquea** | Caja 9 (C · ingesta y seguridad) |

---

## 0. Antes de empezar

- [ ] Caja 7 (A · notificaciones) mergeada:

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend; git checkout develop; git pull
Test-Path .\src\app\Notificaciones\components\DetalleLoteModal.tsx, .\src\context\NotificationContext.tsx
```

Esperado: dos `True`. **Sin la caja 7 esta caja no compila** (se comprobó: 6 errores).

---

## 1. Qué trae la caja

| Ruta | Qué es |
|---|---|
| `src/app/Notificaciones/pages/NotificacionesPage.tsx` | Listado de lotes y notificaciones: estado, aprobar, rechazar y ver detalle |
| `src/services/Notificaciones/Notificaciones.service.ts`, `Lotes.service.ts` | Llamadas a `/api/notificaciones` y `/api/lotes` |

### Líneas etiquetadas: `[B-F2]`

| Archivo | Líneas |
|---|---|
| `src/App.tsx` | **2** (import de `NotificacionesPage` y su ruta) |
| `src/data/modulos.data.ts` | **2** (icono y entrada «Notificaciones») |

---

## 2. Paso a paso

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend
git checkout develop; git pull; git checkout -b feature/f2-listado-lotes
$CAJA = "C:\printflow\CAJAS\EQUIPO-B_Gabriela-Roberto\fase-2_listado-de-lotes"
Copy-Item -Path "$CAJA\frontend\*" -Destination "C:\printflow\SE2-4-Printflow-Frontend" -Recurse -Force
```

Activa `[B-F2]` en los 2 archivos. Luego:

```powershell
npm install; npm run build
cd ..\SE2-4-Printflow; docker compose up -d --build
```

En http://localhost:8080:

- [ ] Aparece «Notificaciones» en el menú y la página carga
- [ ] Los lotes salen vacíos o con error 404 de `/api/lotes`. **Es lo esperado**: esa ruta la activa el Equipo C en la caja 9. Las notificaciones sí deben cargar

---

## 3. Mejoras obligatorias (S2-05)

- [ ] Columnas visibles: **estado**, **fecha de recepción** y **fecha de procesamiento**
- [ ] Filtros por **estado**, **cliente** (con `BusquedaInteligenteClientes`) y **rango de fechas** (desde/hasta)
- [ ] Orden por fecha de recepción, **de la más reciente a la más antigua**
- [ ] Estados mostrados con las palabras del plan: «Pendiente», «Procesado», «Descartado», «Error» (la equivalencia con los estados actuales está en `PLAN.md`, sección 7)
- [ ] Cuando el Equipo C termine la caja 9, **volver a probar** con un usuario de cada rol (`admin@`, `operador@`, `auditor@printflow.local`) que no aparezcan errores 401 o 403 inesperados

---

## 4. Commit, push y PR

```powershell
git add -A; git commit -m "feat(lotes): listado de lotes con estado y filtros"
git push -u origin feature/f2-listado-lotes
```

PR a **`develop`** · título `F2 · B · Listado de lotes (S2-05)` · revisor del Equipo **C**.

## 5. Al terminar

> «Caja 8 (B · listado de lotes) mergeada. **Equipo C: pueden empezar la caja 9 (ingesta y seguridad).**»
