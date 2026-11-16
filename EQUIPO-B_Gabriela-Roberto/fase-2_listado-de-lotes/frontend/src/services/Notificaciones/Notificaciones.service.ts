import type {
  CreateNotificacionData
} from '@app/Notificaciones/types/notificaciones';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const RESOURCE_URL = `${API_BASE}/api/notificaciones`;

const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};


export async function fetchAllNotificaciones() {
  try {
    const res = await fetch(`${RESOURCE_URL}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error fetchAllNotificaciones:", err);
    throw err;
  }
}

export async function getNotificacionById(id: number) {
  try {
    const res = await fetch(`${RESOURCE_URL}/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Error getNotificacionById:", err);
    throw err;
  }
}

export async function getNotificacionesByUsuario(usuarioId: number) {
  try {
    const res = await fetch(`${RESOURCE_URL}/usuario/${usuarioId}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getNotificacionesByUsuario:", err);
    throw err;
  }
}

export async function getNotificacionesNoLeidas(usuarioId?: number) {
  try {
    const url = usuarioId
      ? `${RESOURCE_URL}/no-leidas?usuario_id=${usuarioId}`
      : `${RESOURCE_URL}/no-leidas`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getNotificacionesNoLeidas:", err);
    throw err;
  }
}

export async function getNotificacionesLeidas(usuarioId?: number) {
  try {
    const url = usuarioId
      ? `${RESOURCE_URL}/leidas?usuario_id=${usuarioId}`
      : `${RESOURCE_URL}/leidas`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getNotificacionesLeidas:", err);
    throw err;
  }
}

export async function getNotificacionesByLote(loteId: number) {
  try {
    const res = await fetch(`${RESOURCE_URL}/lote/${loteId}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getNotificacionesByLote:", err);
    throw err;
  }
}

export async function contarNoLeidas(usuarioId?: number) {
  try {
    const url = usuarioId
      ? `${RESOURCE_URL}/contar-no-leidas?usuario_id=${usuarioId}`
      : `${RESOURCE_URL}/contar-no-leidas`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : 0;
  } catch (err) {
    console.error("Error contarNoLeidas:", err);
    throw err;
  }
}

export async function getEstadisticasNotificaciones(usuarioId?: number) {
  try {
    const url = usuarioId
      ? `${RESOURCE_URL}/estadisticas?usuario_id=${usuarioId}`
      : `${RESOURCE_URL}/estadisticas`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getEstadisticasNotificaciones:", err);
    throw err;
  }
}

export async function createNotificacion(notificacion: CreateNotificacionData) {
  try {
    const res = await fetch(`${RESOURCE_URL}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(notificacion),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response [POST]:', errorText);
      throw new Error(`Error create: ${res.status} - ${errorText}`);
    }
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Error createNotificacion:", err);
    throw err;
  }
}

export async function marcarComoLeida(id: number) {
  try {
    const res = await fetch(`${RESOURCE_URL}/${id}/marcar-leida`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`Error marcar como leída: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Error marcarComoLeida:", err);
    throw err;
  }
}

export async function marcarVariasComoLeidas(ids: number[]) {
  try {
    const res = await fetch(`${RESOURCE_URL}/marcar-varias-leidas`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error(`Error marcar varias como leídas: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Error marcarVariasComoLeidas:", err);
    throw err;
  }
}

export async function marcarTodasComoLeidas(usuarioId?: number) {
  try {
    const body = usuarioId ? { usuario_id: usuarioId } : {};
    const res = await fetch(`${RESOURCE_URL}/marcar-todas-leidas`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Error marcar todas como leídas: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Error marcarTodasComoLeidas:", err);
    throw err;
  }
}

export async function deleteNotificacion(id: number) {
  try {
    const res = await fetch(`${RESOURCE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error(`Error delete: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Error deleteNotificacion:", err);
    throw err;
  }
}

export async function aprobarNotificacion(id: number, usuario_id: number, fecha_corte?: string) {
  try {
    const res = await fetch(`${RESOURCE_URL}/${id}/aprobar`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ usuario_id, fecha_corte })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (res.status === 409) {
        throw {
          isValidationError: true,
          message: data.message,
          errores: data.errores || []
        };
      }
      throw new Error(data.message || `Error HTTP: ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("Error aprobarNotificacion:", err);
    throw err;
  }
}

export async function rechazarNotificacion(id: number, usuarioId: number, motivo?: string) {
  try {
    const res = await fetch(`${RESOURCE_URL}/${id}/rechazar`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ usuario_id: usuarioId, motivo })
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error rechazarNotificacion:", err);
    throw err;
  }
}
export async function deleteOldNotificaciones(dias: number = 30) {
  try {
    const res = await fetch(`${RESOURCE_URL}/limpiar-antiguas?dias=${dias}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error(`Error delete old: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Error deleteOldNotificaciones:", err);
    throw err;
  }
}