# Caja 14 de 15 · Fase 4 (Sprint 4) · Equipo B (Gabriela + Roberto) · PDF del informe y gestión de usuarios

| | |
|---|---|
| **Orden** | Caja **14**. Sprint 4 (14 de diciembre – 8 de enero). Va después de la caja 13 (A · Excel y despliegue) |
| **Repos** | Frontend (PDF) · **los dos** (usuarios) |
| **Ramas** | `feature/f4-pdf` · `feature/f4-usuarios` |
| **Historias** | S4-01 · PDF del consolidado (HU-11a) · 3 pts (**Gabriela**) · S4-03 · Gestión de usuarios y roles (RF-20) · 3 pts (**Roberto**) |
| **Ojo** | Vacaciones del 24 de diciembre al 1 de enero: terminar **antes del 23** |

No trae código nuevo: el PDF ya existe en `src/utils/exportUtils.ts` (caja 11) y los usuarios se construyen aquí.

---

## 0. Antes de empezar

```powershell
cd C:\printflow\SE2-4-Printflow-Frontend; git checkout develop; git pull
Test-Path .\src\utils\exportUtils.ts, .\src\app\Informes
```

Esperado: dos `True` (Sprint 3 cerrado).

---

## 1. PDF del consolidado (Gabriela) · `feature/f4-pdf`

La función de PDF está en `exportUtils.ts` y se llama desde `Informes.page.tsx`. Verifica y corrige:

- [ ] Cabecera con razón social y RUC del cliente, período (mes y año) y fecha de generación
- [ ] Detalle por máquina: serie, área, contador inicial, final, páginas B/N, color e importe
- [ ] Totales al final
- [ ] **Valores idénticos a los de pantalla**: prueba con 2 clientes y 2 períodos, compara número por número y deja capturas en el PR
- [ ] Coordina con Kiara (caja 13): el Excel vive en el mismo archivo; no se pisen los cambios

---

## 2. Gestión de usuarios y roles (Roberto) · `feature/f4-usuarios`

### Backend

- [ ] `GET /api/usuarios`, `POST /api/usuarios`, `PUT /api/usuarios/:id`, `PATCH /api/usuarios/:id/activo` en `src/routes/usuario/`
- [ ] **Solo `admin`** (`requireRole('admin')`); los demás → 403
- [ ] La contraseña se guarda con `bcrypt` y **nunca** se devuelve en las respuestas
- [ ] Un usuario desactivado **no puede iniciar sesión** (`protect` ya lo revisa; prueba también el login)
- [ ] Un admin no puede desactivarse a sí mismo

### Frontend

- [ ] Pantalla «Usuarios» (listado, crear, editar rol, activar/desactivar)
- [ ] **Menú filtrado por rol**: agrega `roles: string[]` a cada entrada de `modulos.data.ts` y filtra en `Sidebar.tsx` con el rol del usuario. «Usuarios» solo para `admin`
- [ ] Prueba con los 3 usuarios de prueba (`admin@`, `operador@`, `auditor@printflow.local`)

---

## 3. Al terminar

> «Caja 14 (B) completa. **Equipo C: pueden cerrar el proyecto con la caja 15.**»
