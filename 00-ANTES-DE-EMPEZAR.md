# 00 · Antes de empezar (para TODOS, una sola vez)

Lee esto completo antes de abrir tu primera caja. Toma unos 30 minutos.
Si un comando no da el resultado esperado, **para y avisa en el grupo**: no sigas con la caja.

> **Contexto importante: trabajamos con datos simulados.** El script que hace que las impresoras de DOX manden sus reportes de contadores por correo lo hizo y lo mantiene el **técnico de DOX, nuestro Product Owner y entrenador técnico**; no es parte de PrintFlow. Su requisito para nosotros: *«van a recibir estos reportes por montones y el sistema los debe registrar»*. El buzón y el flujo reales ya están en producción en el servidor de DOX y **no** podemos usarlos, así que todo el desarrollo y las pruebas se hacen con la **información de prueba que nos entregó el PO** (buzón de prueba, correos simulados, máquinas y series ficticias). Nunca uses datos reales de clientes. Detalle: `PLAN.md`, sección 1.1.

---

## 1. Programas que debes tener instalados

| Programa | Versión | Cómo instalar (Windows, PowerShell) | Cómo comprobar | Resultado esperado |
|---|---|---|---|---|
| **Git** | 2.40 o más | `winget install Git.Git` | `git --version` | `git version 2.4x...` |
| **Node.js** | **22** (no 18, no 20) | `winget install OpenJS.NodeJS.LTS` | `node -v` | `v22.x.x` |
| **npm** | viene con Node | — | `npm -v` | `10.x` o más |
| **Docker Desktop** | 4.x | `winget install Docker.DockerDesktop` (reiniciar la PC) | `docker compose version` | `Docker Compose version v2.x` |
| **VS Code** | cualquiera | `winget install Microsoft.VisualStudioCode` | abrirlo | — |

Después de instalar, **cierra y vuelve a abrir** la terminal.

> Docker Desktop debe estar **abierto** (ícono de la ballena en la barra de tareas) cada vez que uses `docker compose`.

Extensiones recomendadas de VS Code: *ESLint*, *Docker*, *GitLens*.

## 2. Configurar Git con TU cuenta

Cada commit tiene que salir con tu nombre: así se ve tu aporte en el historial.

```powershell
git config --global user.name  "TuUsuarioDeGitHub"
git config --global user.email "el-correo-de-tu-cuenta-de-github@ejemplo.com"
git config --global core.autocrlf true
git config --global init.defaultBranch main
```

Comprobar: `git config --global user.name` debe mostrar **tu** usuario.

## 3. Acceso a GitHub

1. Acepta las **dos invitaciones de colaborador** (llegan al correo de tu cuenta de GitHub, o en https://github.com/notifications):
   - Backend: https://github.com/MGabrielaVillon/SE2-4-Printflow (invita Gabriela)
   - Frontend: https://github.com/MarSalvatore28/SE2-4-Printflow-Frontend (invita Marlo)
2. Comprueba que en los dos repos ves la rama `develop` y que no te sale «Read-only». Sin las invitaciones puedes clonar (son públicos), pero **no** podrás hacer `git push`.
3. La primera vez que hagas `git push`, Windows abre una ventana para iniciar sesión en GitHub: acéptala.

## 4. Clonar los dos repos LADO A LADO

Los dos repos tienen que quedar en la **misma carpeta** (Docker los busca así).

```powershell
mkdir C:\printflow
cd C:\printflow
git clone https://github.com/MGabrielaVillon/SE2-4-Printflow.git
git clone https://github.com/MarSalvatore28/SE2-4-Printflow-Frontend.git
```

Debe quedar:

```text
C:\printflow\
├── SE2-4-Printflow\            (backend)
└── SE2-4-Printflow-Frontend\   (frontend)
```

Copia también la carpeta `CAJAS` (te la pasa Marlo) donde quieras, por ejemplo `C:\printflow\CAJAS`. **La carpeta CAJAS no se sube a ningún repo.**

## 5. Primer arranque (comprueba que tu PC está lista)

```powershell
cd C:\printflow\SE2-4-Printflow
git checkout develop
git pull
copy .env.example .env
```

Abre `.env` en VS Code y completa:

- `DB_PASSWORD=` una clave cualquiera para tu base local (ej. `printflow_local`)
- `SECRET_KEY=` una cadena larga. Genérala con:
  `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- Si ya tienes PostgreSQL instalado en Windows o el puerto 8080 ocupado, cambia `DB_HOST_PORT` (ej. `5440`) y `WEB_PORT` (ej. `8090`)

Luego:

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend
git checkout develop
git pull
cd ..\SE2-4-Printflow
docker compose up -d --build
docker compose ps
```

Resultado esperado: 4 servicios (`db`, `api`, `web`, `n8n`) en estado `Up` (`db` dice `healthy`).

Abre http://localhost:8080 (o el `WEB_PORT` que pusiste): debe salir PrintFlow.

Para apagar: `docker compose down`. Para borrar la base y empezar de cero: `docker compose down -v`.

## 6. Trabajar sin Docker (más rápido para programar)

Con la base corriendo en Docker (`docker compose up -d db`), puedes levantar la API y la web en modo desarrollo:

```powershell
# Terminal 1 · backend
cd C:\printflow\SE2-4-Printflow
npm install
# en .env: DB_HOST=localhost y DB_PORT= el mismo valor que DB_HOST_PORT (5433 por defecto)
npm start                          # http://localhost:9000

# Terminal 2 · frontend
cd C:\printflow\SE2-4-Printflow-Frontend
copy .env.example .env             # VITE_API_BASE_URL=http://localhost:9000
npm install
npm run dev                        # http://localhost:5173
```

## 7. Cómo funcionan las "líneas etiquetadas"

En 4 archivos ya están escritas, **comentadas**, las líneas de todos los equipos:

| Repo | Archivo |
|---|---|
| backend | `src/app.js` |
| frontend | `src/App.tsx` |
| frontend | `src/data/modulos.data.ts` |
| frontend | `src/components/layout/Sidebar.tsx` |

Cada línea termina con una etiqueta: `// [B-F1]` = Equipo B, Fase 1.

**Tu único trabajo en esos archivos:** buscar tu etiqueta con `Ctrl+F` y quitar el `// ` del **inicio** de esas líneas. La etiqueta del final se queda. No escribas líneas nuevas ni toques las de otro equipo.

Ejemplo, Equipo B en la Fase 1:

```js
// const clienteRoutes = require('@routes/cliente/cliente.routes'); // [B-F1]     ← antes
const clienteRoutes = require('@routes/cliente/cliente.routes'); // [B-F1]        ← después
```

Si tu tarea dice `[BORRAR en X-FN]`, esa línea se **borra completa**.

## 8. Flujo de cada caja (siempre igual)

```powershell
# 1. Partir de develop actualizado
git checkout develop
git pull

# 2. Crear tu rama (el nombre exacto está en tu TAREA.md)
git checkout -b feature/f1-clientes

# 3. Copiar el contenido de la caja (ver tu TAREA.md)
# 4. Activar tus líneas etiquetadas
# 5. Comprobar (los comandos están en tu TAREA.md)

# 6. Commit y push
git add -A
git status          # revisa que NO aparezca .env ni node_modules
git commit -m "feat(clientes): migra clientes, contratos y áreas"
git push -u origin feature/f1-clientes
```

7. En GitHub: botón **Compare & pull request** → base: **`develop`** (no `main`) → completa la plantilla → asigna como revisor a alguien de **otro** equipo.
8. Espera el CI en verde y la aprobación. Mergea con **Squash and merge** o **Merge** (no rebase).
9. Avisa en el grupo: «Caja X mergeada, puede seguir el equipo Y».

## 9. Reglas que no se rompen

- Nunca `git push` directo a `main` ni a `develop`: siempre PR.
- Nunca subir `.env`, `node_modules`, `dist`, contraseñas ni datos reales de clientes.
- Nunca editar archivos de otro equipo sin avisar (sobre todo `src/components/Shared/`).
- Si el CI falla, se arregla en la misma rama antes de pedir el merge.

## 10. Problemas comunes

| Síntoma | Causa | Solución |
|---|---|---|
| `ports are not available ... 5432` o `8080` | Ya tienes PostgreSQL u otro proyecto en ese puerto | Cambia `DB_HOST_PORT` / `WEB_PORT` en `.env` |
| `docker: command not found` / `error during connect` | Docker Desktop cerrado | Ábrelo y espera a que diga *Engine running* |
| `npm error ENOSPC` | Disco lleno | Libera espacio (`node_modules` viejos, `docker system prune`) |
| `Cannot find module 'X'` al compilar | Faltan dependencias | `npm install` en ese repo |
| El login dice error de conexión | La API no está arriba o `VITE_API_BASE_URL` está mal | `docker compose ps`; revisar `.env` del frontend |
| Cambié el SQL y la base no cambia | `init.sh` corre solo al crear el volumen | `docker compose down -v` y `up` otra vez |
| `Permission denied (publickey)` al hacer push | Clonaste por SSH sin llave | Clona por HTTPS (paso 4) |
