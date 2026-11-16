# Caja 2 de 15 · Fase 0 · Equipo B (Gabriela + Roberto) · Estructura de la web

| | |
|---|---|
| **Orden** | Caja **2**. Va después de la caja 1 (A · base) y **antes** de la caja 3 (C · BD y login) |
| **Repo** | Solo **frontend**: `SE2-4-Printflow-Frontend` |
| **Rama** | `feature/f0-estructura-web` |
| **Historia** | S1-06 · Layout de la SPA, menú lateral, rutas protegidas y login · 3 pts |
| **Quién** | **Gabriela** copia, compila y abre el PR · **Roberto** revisa la interfaz en español y prueba la navegación |
| **Fecha** | Lunes 17 de noviembre |
| **Desbloquea** | Caja 3 (C · BD y login) y todas las pantallas de la Fase 1 |

---

## 0. Antes de empezar

- [ ] Hiciste **completo** `CAJAS/00-ANTES-DE-EMPEZAR.md` (programas, Git con tu usuario, repos clonados lado a lado, Docker funcionando).
- [ ] La caja 1 (Equipo A · base) está mergeada en `develop`. Compruébalo:

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend
git checkout develop
git pull
Test-Path .\Dockerfile, .\nginx.conf, .\src\main.tsx
```

Resultado esperado: `True True True`. Si sale algún `False`, **no sigas**: avisa a Marlo.

---

## 1. Qué trae la caja

Todo va al repo **frontend**. Copia la carpeta `frontend/` de esta caja **completa**.

| Ruta | Qué es |
|---|---|
| `src/App.tsx` | **Reemplaza** el `App.tsx` mínimo de la base. Login + layout + rutas protegidas, con las líneas de todos los equipos ya escritas y comentadas |
| `src/data/modulos.data.ts` | Menú lateral con las entradas de todos los equipos, comentadas |
| `src/components/layout/Layout.tsx`, `Sidebar.tsx` | Estructura de la página. La campana de notificaciones está apagada hasta la Fase 2 del Equipo A |
| `src/components/auth/ProtectedRoute.tsx` | Si no hay sesión, manda a `/login` |
| `src/components/Shared/` | `DataTable`, `Paginacion`, `BuscadorInteligente`, `ModalConfirmacion`, `ModalAdvertencia`. **Los usan todos los equipos** |
| `src/context/AuthContext.tsx`, `src/services/Auth/auth.service.ts` | Sesión: login, logout y token |
| `src/app/Auth/pages/LoginPage.tsx` | Pantalla de login |
| `src/utils/jwtUtils.ts`, `src/utils/formatUtils.ts` | Utilidades compartidas |
| `src/types/auth.types.ts`, `src/types/API/response.types.ts` | Tipos compartidos |

En esta caja **no hay líneas etiquetadas que activar**: tú dejas preparadas las de los demás.

---

## 2. Paso a paso

### 2.1 Crear la rama

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend
git checkout develop
git pull
git checkout -b feature/f0-estructura-web
```

### 2.2 Copiar la caja

```powershell
$CAJA = "C:\printflow\CAJAS\EQUIPO-B_Gabriela-Roberto\fase-0_estructura-web"
Copy-Item -Path "$CAJA\frontend\*" -Destination "C:\printflow\SE2-4-Printflow-Frontend" -Recurse -Force
git status
```

Resultado esperado de `git status`: `src/App.tsx` aparece como **modified** y unos 16 archivos nuevos (untracked) bajo `src/`. **No** debe aparecer nada de `.env` ni `node_modules`.

### 2.3 Compilar

```powershell
npm install
npm run build
```

Resultado esperado: termina con `✓ built in ...` y **sin** líneas `error TS`.

### 2.4 Probar en el navegador

```powershell
copy .env.example .env      # solo la primera vez; deja VITE_API_BASE_URL=http://localhost:9000
npm run dev
```

Abre http://localhost:5173 y comprueba:

- [ ] Te redirige solo a `/login` (no hay sesión)
- [ ] La pantalla de login está en español
- [ ] Al intentar entrar sale un error de conexión o de credenciales. **Es lo esperado**: el login del backend lo activa el Equipo C en la caja 3
- [ ] Escribiendo a mano http://localhost:5173/clientes también te manda a `/login`

Detén el servidor con `Ctrl+C`.

---

## 3. Mejoras obligatorias de esta caja

- [ ] **Todo en español**: revisa textos, botones, `placeholder` y mensajes de `LoginPage.tsx`, `Sidebar.tsx` y `src/components/Shared/*` (por ejemplo «Cerrar Sesión», «Siguiente», «Anterior»). Corrige lo que esté en inglés
- [ ] **Sesión vencida**: en `src/services/Auth/auth.service.ts`, si una respuesta de la API es **401**, borra el token y manda a `/login`. Puedes hacerlo con un interceptor de `axios` o revisando `response.status`. Pruébalo después de la caja 3 (con un token inválido en `localStorage`)
- [ ] **README**: agrega al `README.md` del frontend la sección «Cómo agregar un módulo» explicando las líneas etiquetadas (puedes copiar la sección 7 de `00-ANTES-DE-EMPEZAR.md`)

Haz cada mejora en un **commit separado** (así se ve quién hizo qué).

---

## 4. Commit, push y PR

```powershell
git add -A
git status                                   # revisa: nada de .env ni node_modules
git commit -m "feat(web): estructura de la SPA, login y rutas protegidas"
# ...commits de las mejoras...
git push -u origin feature/f0-estructura-web
```

En GitHub:

1. **Compare & pull request** → base **`develop`**
2. Título: `F0 · B · Estructura de la web (S1-06)`
3. Completa la plantilla del PR
4. Revisor: alguien del Equipo **A** (Kiara)
5. Espera el CI en verde (`build` y `docker`) y la aprobación → **Merge**

---

## 5. Al terminar

Escribe en el grupo:

> «Caja 2 (B · estructura web) mergeada en develop. **Equipo C: pueden empezar la caja 3 (BD y login).**»

---

## Ojo

- `src/components/Shared/` lo usan las otras 10 cajas. Si cambias las **props** de un componente, rompes a otros equipos. Si hace falta, avisa antes en el grupo.
- No borres ni modifiques las líneas comentadas de `App.tsx`, `modulos.data.ts` y `Sidebar.tsx`: son de los otros equipos.

## Si algo falla

| Síntoma | Solución |
|---|---|
| `error TS2307: Cannot find module 'lucide-react'` | Corre `npm install` otra vez. Si dice `ENOSPC`, libera espacio en disco |
| `git status` muestra cambios en archivos que no son de la caja | `git checkout -- <archivo>` para devolverlos a como estaban |
| El CI falla en `docker` | Revisa que `npm run build` pase en tu PC; el Dockerfile corre lo mismo |
