# Caja 11 de 15 · Fase 3 (Sprint 3) · Equipo B (Gabriela + Roberto) · Informes, lectura manual y reprocesar

| | |
|---|---|
| **Orden** | Caja **11**. Sprint 3 (23 de noviembre – 13 de diciembre). Va después de la caja 10 (A · SMTP) |
| **Repos** | Frontend (la pantalla de informes) · **los dos** para lectura manual y reprocesar |
| **Ramas** | `feature/f3-informes` · `feature/f3-lectura-manual` · `feature/f3-reprocesar` |
| **Historias** | S3-07 · Pantalla de informes (HU-10b) · 5 pts (**Gabriela**) · S3-04 · Lectura manual (HU-08) · 3 pts (**Roberto**) · S3-05 · Reprocesar (HU-09) · 3 pts (**Roberto**) |
| **Depende de** | Fase 2 cerrada. La tabla del informe muestra datos cuando el Equipo C active `/api/reportes` (caja 12); mientras tanto la pantalla compila y carga los filtros |

---

## 0. Antes de empezar

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend; git checkout develop; git pull
Test-Path .\src\app\Notificaciones\pages\NotificacionesPage.tsx, .\src\app\Maquinas, .\src\app\Area
```

Esperado: tres `True`.

---

## 1. Qué trae la caja (solo frontend)

| Ruta | Qué es |
|---|---|
| `src/app/Informes/` | Página de informes, filtros, tablas, resumen e historial del cliente |
| `src/app/Clientes/components/TablaDetalleConsolidado.tsx` | Tabla del consolidado (está en la carpeta Clientes pero es del informe) |
| `src/hooks/useInformes.ts` | Lógica de la pantalla |
| `src/services/Reportes/`, `src/types/Reporte/`, `src/types/Cliente/Historialcliente.types.ts`, `src/data/meses.data.ts` | Servicio, tipos y meses |
| `src/utils/exportUtils.ts` | Exportación a **PDF y Excel** (ya funciona; se verifica en la Fase 4) |

### Líneas etiquetadas: `[B-F3]`

| Archivo | Líneas |
|---|---|
| `src/App.tsx` | **2** (import de `InformesPage` y su ruta) |
| `src/data/modulos.data.ts` | **2** (icono y entrada «Informes») |

---

## 2. Parte 1 · Pantalla de informes (Gabriela) · `feature/f3-informes`

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend
git checkout develop; git pull; git checkout -b feature/f3-informes
$CAJA = "C:\printflow\CAJAS\EQUIPO-B_Gabriela-Roberto\fase-3_informe-frontend"
Copy-Item -Path "$CAJA\frontend\*" -Destination "C:\printflow\SE2-4-Printflow-Frontend" -Recurse -Force
```

Activa `[B-F3]` en los 2 archivos. `npm install; npm run build` → sin `error TS`.

Criterios de S3-07, a verificar y corregir:

- [ ] Cliente, mes y año **obligatorios**. Si falta uno, mensaje en español junto al campo
- [ ] Área y máquina **opcionales**
- [ ] El consolidado se carga **solo** al completar los filtros obligatorios (sin botón «Buscar»)
- [ ] Muestra totales del período y la **fecha y hora de generación**
- [ ] Cada máquina muestra: contador inicial, final, páginas B/N, color e importe

PR a `develop` · título `F3 · B · Pantalla de informes (S3-07)` · revisor del Equipo C.

---

## 3. Parte 2 · Lectura manual (Roberto) · `feature/f3-lectura-manual`

Trabajo nuevo, en los dos repos. Coordina con el Equipo C: **usa sus validaciones** (S3-01), no las copies.

- [ ] **Backend:** `POST /api/lecturas/manual` con `id_instalacion`, `fecha_lectura`, contadores B/N y color, y `observacion` (obligatoria). Guarda `origen = 'MANUAL'` y `usuario_id = req.user.id`. Rol: `admin` u `operador`
- [ ] Aplica **las mismas validaciones** que la ingesta automática (función del Equipo C)
- [ ] **Frontend:** formulario con selector de asignación vigente (buscador), fecha y contadores. Cronometra: se debe poder completar en **menos de 3 minutos**
- [ ] Si la validación falla, mostrar el motivo («Retroceso de contador», etc.)
- [ ] Si la tabla de lecturas no tiene columnas `origen` u `observacion`, crea la migración `00N_lectura_manual.sql` (pregunta al Equipo C qué número sigue)

---

## 4. Parte 3 · Reprocesar (Roberto) · `feature/f3-reprocesar`

- [ ] Migración: columna `intentos_reproceso integer NOT NULL DEFAULT 0` en la tabla de reportes de staging
- [ ] **Backend:** `POST /api/staging/:id/reprocesar`: vuelve a correr las validaciones; suma 1 a `intentos_reproceso`; si ya hay 3 → **409** «Máximo de intentos alcanzado: descarte o corrija manualmente»
- [ ] **Frontend:** botón «Reprocesar» **solo** en reportes con ERROR, con el número de intento (`2 de 3`). Al tercer fallo, el botón se reemplaza por «Descartar» y «Lectura manual»

---

## 5. Al terminar cada parte

> «Caja 11 · parte N (B) mergeada.»

Cuando estén las tres: «**Caja 11 completa. Equipo C: pueden cerrar la caja 12.**»
