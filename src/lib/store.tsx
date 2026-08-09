import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  campanas as seedCampanas,
  clientes as seedClientes,
  mensajes as seedMensajes,
  productos as seedProductos,
  type Campana,
  type Cliente,
  type MensajeGenerado,
  type Producto,
} from "./mock-data";

type Store = {
  clientes: Cliente[];
  productos: Producto[];
  campanas: Campana[];
  mensajes: MensajeGenerado[];
  usuarioActual: { nombre: string; rol: string };
  addCampana: (c: Campana) => void;
  updateCampana: (id: string, patch: Partial<Campana>) => void;
  addMensajes: (m: MensajeGenerado[]) => void;
  updateMensaje: (id: string, patch: Partial<MensajeGenerado>, accion?: string, texto?: string) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [clientes] = useState<Cliente[]>(() => seedClientes);
  const [productos] = useState<Producto[]>(() => seedProductos);
  const [campanas, setCampanas] = useState<Campana[]>(() => seedCampanas);
  const [mensajes, setMensajes] = useState<MensajeGenerado[]>(() => seedMensajes);
  const usuarioActual = { nombre: "Ana Coloma", rol: "Responsable comercial" };

  const value = useMemo<Store>(
    () => ({
      clientes,
      productos,
      campanas,
      mensajes,
      usuarioActual,
      addCampana: (c) => setCampanas((prev) => [c, ...prev]),
      updateCampana: (id, patch) =>
        setCampanas((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c))),
      addMensajes: (m) => setMensajes((prev) => [...m, ...prev]),
      updateMensaje: (id, patch, accion, texto) =>
        setMensajes((prev) =>
          prev.map((m) =>
            m.id === id
              ? {
                  ...m,
                  ...patch,
                  version: patch.cuerpo && patch.cuerpo !== m.cuerpo ? m.version + 1 : m.version,
                  historial: accion
                    ? [
                        ...m.historial,
                        {
                          fecha: new Date().toISOString(),
                          usuario: usuarioActual.nombre,
                          accion,
                          ...(texto ? { texto } : {}),
                        },
                      ]
                    : m.historial,
                }
              : m,
          ),
        ),
    }),
    [clientes, productos, campanas, mensajes],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}
