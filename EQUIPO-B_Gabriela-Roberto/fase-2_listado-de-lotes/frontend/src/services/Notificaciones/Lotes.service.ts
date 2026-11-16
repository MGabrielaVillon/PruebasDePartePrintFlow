import type {
  CreateLoteData,
  AprobarRechazarLoteData,
  LoteActionResponse} from '@app/Notificaciones/types/notificaciones';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const RESOURCE_URL = `${API_BASE}/api/lotes`;

const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};

export async function fetchAllLotes() {
  try {
    const res = await fetch(`${RESOURCE_URL}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error fetchAllLotes:", err);
    throw err;
  }
}

export async function getLoteById(id: number) {
  try {
    const res = await fetch(`${RESOURCE_URL}/${id}`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Error getLoteById:", err);
    throw err;
  }
}

export async function getLoteByCodigo(codigoLote: string) {
  try {
    const res = await fetch(`${RESOURCE_URL}/codigo/${encodeURIComponent(codigoLote)}`, { 
      headers: getAuthHeaders() 
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Error getLoteByCodigo:", err);
    throw err;
  }
}

export async function getLotesPendientes() {
  try {
    const res = await fetch(`${RESOURCE_URL}/pendientes`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getLotesPendientes:", err);
    throw err;
  }
}

export async function getLotesByEstado(estadoCodigo: string) {
  try {
    const res = await fetch(`${RESOURCE_URL}/estado/${estadoCodigo}`, { 
      headers: getAuthHeaders() 
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getLotesByEstado:", err);
    throw err;
  }
}

export async function getLotesByCliente(clienteId: number) {
  try {
    const res = await fetch(`${RESOURCE_URL}/cliente/${clienteId}`, { 
      headers: getAuthHeaders() 
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getLotesByCliente:", err);
    throw err;
  }
}

export async function getLotesByPeriodo(periodo: string) {
  try {
    const res = await fetch(`${RESOURCE_URL}/periodo/${encodeURIComponent(periodo)}`, { 
      headers: getAuthHeaders() 
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getLotesByPeriodo:", err);
    throw err;
  }
}

export async function getPreviewLote(codigoLote: string) {
  try {
    const res = await fetch(`${RESOURCE_URL}/preview/${encodeURIComponent(codigoLote)}`, { 
      headers: getAuthHeaders() 
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getPreviewLote:", err);
    throw err;
  }
}

export async function getEstadisticasLotes() {
  try {
    const res = await fetch(`${RESOURCE_URL}/estadisticas`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error getEstadisticasLotes:", err);
    throw err;
  }
}

export async function createLote(lote: CreateLoteData) {
  try {
    const res = await fetch(`${RESOURCE_URL}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(lote),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response [POST]:', errorText);
      throw new Error(`Error create: ${res.status} - ${errorText}`);
    }
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Error createLote:", err);
    throw err;
  }
}

export async function aprobarLote(
  codigoLote: string, 
  aprobarData: AprobarRechazarLoteData
): Promise<LoteActionResponse> {
  try {
    const res = await fetch(`${RESOURCE_URL}/${encodeURIComponent(codigoLote)}/aprobar`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(aprobarData),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response [POST]:', errorText);
      throw new Error(`Error aprobar lote: ${res.status} - ${errorText}`);
    }
    const data = await res.json();
    return data.success 
      ? { success: true, message: data.message || 'Lote aprobado exitosamente' }
      : { success: false, message: data.message || 'Error al aprobar lote' };
  } catch (err) {
    console.error("Error aprobarLote:", err);
    throw err;
  }
}

export async function rechazarLote(
  codigoLote: string, 
  rechazarData: AprobarRechazarLoteData
): Promise<LoteActionResponse> {
  try {
    const res = await fetch(`${RESOURCE_URL}/${encodeURIComponent(codigoLote)}/rechazar`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(rechazarData),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error Response [POST]:', errorText);
      throw new Error(`Error rechazar lote: ${res.status} - ${errorText}`);
    }
    const data = await res.json();
    return data.success 
      ? { success: true, message: data.message || 'Lote rechazado exitosamente' }
      : { success: false, message: data.message || 'Error al rechazar lote' };
  } catch (err) {
    console.error("Error rechazarLote:", err);
    throw err;
  }
}

export async function deleteLote(codigoLote: string) {
  try {
    const res = await fetch(`${RESOURCE_URL}/${encodeURIComponent(codigoLote)}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error(`Error delete: ${res.status}`);
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Error deleteLote:", err);
    throw err;
  }
}