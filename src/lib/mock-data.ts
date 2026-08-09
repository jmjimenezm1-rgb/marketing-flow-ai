// Datos ficticios de demostración. No corresponden a personas ni empresas reales.

export type Canal = "email" | "whatsapp";
export type EstadoConsentimiento = "valido" | "ausente" | "revocado" | "interes_legitimo";

export type Cliente = {
  id: string;
  razonSocial: string;
  tipo: "empresa" | "autonomo" | "particular" | "administracion";
  sector: string;
  ciudad: string;
  persona: string;
  cargo: string;
  email: string;
  whatsapp: string;
  idioma: string;
  responsable: string;
  segmento: string;
  estadoComercial: "activo" | "inactivo" | "en_oportunidad" | "en_riesgo" | "perdido";
  esLead: boolean;
  consentimiento: Record<Canal, EstadoConsentimiento>;
  fuenteConsentimiento: string;
  fechaConsentimiento: string | null;
  bajaCanal: Canal[];
  baseJuridica: string;
  origenDato: string;
  notas: string;
};

export type EstadoCampana =
  | "borrador"
  | "pendiente_revision"
  | "aprobada"
  | "programada"
  | "activa"
  | "pausada"
  | "finalizada"
  | "cancelada";

export type PasoSecuencia = {
  id: string;
  orden: number;
  nombre: string;
  canal: Canal;
  esperaDias: number;
  condicion: string;
  objetivo: string;
  revisionRequerida: boolean;
};

export type Campana = {
  id: string;
  nombre: string;
  productoId: string;
  objetivo: string;
  tipo:
    | "captacion"
    | "reactivacion"
    | "upselling"
    | "cross-selling"
    | "fidelizacion"
    | "recordatorio"
    | "evento"
    | "lanzamiento"
    | "nutricion";
  publicoObjetivo: string;
  segmentos: string[];
  canalPrincipal: Canal | "mixto";
  canalesSecundarios: Canal[];
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoCampana;
  responsable: string;
  presupuesto: number;
  metricaObjetivo: string;
  mensajePrincipal: string;
  reglasEvolucion: string;
  reglasExclusion: string;
  reglasBaja: string;
  requisitoConsentimiento: "consentimiento_expreso" | "cliente_existente_similar" | "interes_legitimo_b2b";
  validacionLegal: "pendiente" | "aprobada" | "rechazada";
  observaciones: string;
  destinatarios: string[];
  secuencia: PasoSecuencia[];
  createdAt: string;
};

export type Producto = {
  id: string;
  nombre: string;
  descripcionCorta: string;
  publicoObjetivo: string;
  beneficios: string[];
  objeciones: string[];
  landing: string;
  estado: "activo" | "pausado" | "retirado";
};

export type EstadoMensaje =
  | "borrador"
  | "pendiente_revision"
  | "aprobado"
  | "rechazado"
  | "revision_legal"
  | "revision_comercial"
  | "programado"
  | "enviado"
  | "excluido";

export type MensajeGenerado = {
  id: string;
  campanaId: string;
  productoId: string;
  clienteId: string;
  canal: Canal;
  tipoMensaje: string;
  tono: string;
  idioma: string;
  asunto: string | null;
  preheader: string | null;
  cuerpo: string;
  cuerpoOriginal: string;
  nivelPersonalizacion: "generico" | "medio" | "alto";
  variables: string[];
  riesgos: string[];
  riesgoLegal: "bajo" | "medio" | "alto" | "bloqueante";
  estado: EstadoMensaje;
  fechaGeneracion: string;
  fechaPrevistaEnvio: string | null;
  autor: string;
  version: number;
  historial: { fecha: string; usuario: string; accion: string; texto?: string }[];
  motivoPersonalizacion: string;
  variante: "A" | "B" | null;
};

const hoy = new Date();
const iso = (offsetDias: number) =>
  new Date(hoy.getTime() + offsetDias * 86400000).toISOString();

export const productos: Producto[] = [
  {
    id: "p1",
    nombre: "Suite de Facturación Cloud",
    descripcionCorta: "Facturación electrónica y conciliación automática para pymes.",
    publicoObjetivo: "Directores financieros de pymes de 20-200 empleados",
    beneficios: ["Cumple Verifactu", "Conciliación bancaria automática", "Cierre mensual en 2 días"],
    objeciones: ["Ya tenemos ERP", "Coste de migración", "Falta de tiempo del equipo"],
    landing: "https://ejemplo.test/facturacion",
    estado: "activo",
  },
  {
    id: "p2",
    nombre: "Portal de Compras B2B",
    descripcionCorta: "Catálogo y pedidos online para distribuidores.",
    publicoObjetivo: "Responsables de compras en distribución industrial",
    beneficios: ["Pedidos 24/7", "Menos errores de pedido", "Integración con ERP"],
    objeciones: ["Nuestros clientes piden por teléfono", "Integración compleja"],
    landing: "https://ejemplo.test/portal-b2b",
    estado: "activo",
  },
  {
    id: "p3",
    nombre: "Consultoría de Ciberseguridad",
    descripcionCorta: "Auditoría y plan director de seguridad.",
    publicoObjetivo: "Responsables de IT en empresas medianas",
    beneficios: ["Diagnóstico en 3 semanas", "Plan priorizado", "Soporte NIS2"],
    objeciones: ["No es prioritario ahora", "Presupuesto cerrado"],
    landing: "https://ejemplo.test/ciberseguridad",
    estado: "activo",
  },
  {
    id: "p4",
    nombre: "Mantenimiento Industrial Predictivo",
    descripcionCorta: "Sensórica y analítica para reducir paradas.",
    publicoObjetivo: "Jefes de planta y mantenimiento",
    beneficios: ["-30% paradas no planificadas", "Instalación no invasiva", "ROI en 9 meses"],
    objeciones: ["Planta antigua", "Sin personal para el proyecto"],
    landing: "https://ejemplo.test/predictivo",
    estado: "activo",
  },
  {
    id: "p5",
    nombre: "Formación en IA Aplicada",
    descripcionCorta: "Programa práctico de IA generativa para equipos comerciales.",
    publicoObjetivo: "Directores comerciales y de RRHH",
    beneficios: ["Formato in-company", "Casos reales del sector", "Bonificable"],
    objeciones: ["Equipo sin tiempo", "Ya hicimos formación interna"],
    landing: "https://ejemplo.test/formacion-ia",
    estado: "pausado",
  },
];

const nombresClientes: Array<Partial<Cliente> & { razonSocial: string }> = [
  { razonSocial: "Distribuciones Arcedo SL", sector: "Distribución", ciudad: "Zaragoza", persona: "Marta Ibáñez", cargo: "Directora Financiera", segmento: "Clientes clave" },
  { razonSocial: "Metalúrgica Vilorta SA", sector: "Industria", ciudad: "Bilbao", persona: "Óscar Naveda", cargo: "Jefe de Planta", segmento: "Industria norte" },
  { razonSocial: "Clínicas Bermeja", sector: "Salud", ciudad: "Valencia", persona: "Nuria Palenque", cargo: "Gerente", segmento: "Servicios" },
  { razonSocial: "Transportes Quirol", sector: "Logística", ciudad: "Sevilla", persona: "Rubén Casteda", cargo: "Director de Operaciones", segmento: "Logística" },
  { razonSocial: "Bodegas Talamera", sector: "Alimentación", ciudad: "Logroño", persona: "Elena Sarrión", cargo: "Directora Comercial", segmento: "Alimentación" },
  { razonSocial: "Ingeniería Movara", sector: "Ingeniería", ciudad: "Madrid", persona: "Iván Retuerto", cargo: "CIO", segmento: "Clientes clave" },
  { razonSocial: "Textiles Andrenal", sector: "Textil", ciudad: "Barcelona", persona: "Paula Ginés", cargo: "Responsable de Compras", segmento: "Retail" },
  { razonSocial: "Asesoría Coblanz", sector: "Servicios profesionales", ciudad: "Vigo", persona: "Sergio Umbrete", cargo: "Socio director", segmento: "Servicios" },
  { razonSocial: "Hostelería Marnela", sector: "Hostelería", ciudad: "Málaga", persona: "Lidia Fontecha", cargo: "Directora de Expansión", segmento: "Retail" },
  { razonSocial: "Agrícola Serranilla", sector: "Agroalimentario", ciudad: "Murcia", persona: "Tomás Berrueco", cargo: "Gerente", segmento: "Alimentación" },
];

const nombresLeads = [
  "Envases Pradoluz SL", "Química Verdanel", "Tecnoreparto Sur", "Cerámicas Olmedal",
  "Logística Vandeira", "Muebles Arbolet", "Frigoríficos Nastel", "Redes Cantalona",
  "Papelería Industrial Rueco", "Plásticos Merinbal",
];

const responsables = ["Ana Coloma", "Diego Marín", "Sofía Rueda"];

export const clientes: Cliente[] = [
  ...nombresClientes.map((c, i): Cliente => {
    const sinEmail = i === 6;
    const revocado = i === 8;
    const bajaWa = i === 3 || i === 8;
    return {
      id: `c${i + 1}`,
      razonSocial: c.razonSocial,
      tipo: "empresa",
      sector: c.sector!,
      ciudad: c.ciudad!,
      persona: c.persona!,
      cargo: c.cargo!,
      email: `${c.persona!.split(" ")[0]!.toLowerCase()}@${c.razonSocial.split(" ")[0]!.toLowerCase()}.test`,
      whatsapp: `+34 6${(10 + i).toString()} 000 ${100 + i}`,
      idioma: "es",
      responsable: responsables[i % 3]!,
      segmento: c.segmento!,
      estadoComercial: (["activo", "activo", "en_oportunidad", "en_riesgo", "inactivo"] as const)[i % 5]!,
      esLead: false,
      consentimiento: {
        email: revocado ? "revocado" : sinEmail ? "ausente" : "valido",
        whatsapp: bajaWa ? "revocado" : i % 3 === 0 ? "valido" : "ausente",
      },
      fuenteConsentimiento: "Formulario web con doble opt-in (registro propio)",
      fechaConsentimiento: revocado ? iso(-400) : iso(-120 - i * 8),
      bajaCanal: bajaWa ? ["whatsapp"] : [],
      baseJuridica: "Relación contractual previa · productos similares (art. 21.2 LSSI)",
      origenDato: "Alta como cliente en CRM propio",
      notas: "Cliente ficticio de demostración.",
    };
  }),
  ...nombresLeads.map((n, i): Cliente => {
    const conConsent = i < 3;
    return {
      id: `l${i + 1}`,
      razonSocial: n,
      tipo: "empresa",
      sector: ["Industria", "Distribución", "Servicios", "Logística"][i % 4]!,
      ciudad: ["Alicante", "Toledo", "Oviedo", "Girona", "Cáceres"][i % 5]!,
      persona: conConsent ? ["Carla Ondiz", "Marcos Pelayo", "Rosa Villén"][i]! : "—",
      cargo: conConsent ? "Dirección General" : "—",
      email: conConsent ? `contacto@${n.split(" ")[0]!.toLowerCase()}.test` : `info@${n.split(" ")[0]!.toLowerCase()}.test`,
      whatsapp: "—",
      idioma: "es",
      responsable: responsables[i % 3]!,
      segmento: "Prospección",
      estadoComercial: "inactivo",
      esLead: true,
      consentimiento: {
        email: conConsent ? "valido" : i % 2 === 0 ? "ausente" : "interes_legitimo",
        whatsapp: "ausente",
      },
      fuenteConsentimiento: conConsent ? "Descarga de whitepaper con casilla de marketing" : "Sin consentimiento registrado",
      fechaConsentimiento: conConsent ? iso(-30 - i) : null,
      bajaCanal: [],
      baseJuridica: conConsent ? "Consentimiento expreso" : "Pendiente de validación legal",
      origenDato: "Registro mercantil público / web corporativa",
      notas: "Lead ficticio. Dato público no autoriza por sí solo el envío comercial.",
    };
  }),
];

const secuenciaBase = (prefix: string, canal: Canal): PasoSecuencia[] => [
  { id: `${prefix}-s1`, orden: 1, nombre: "Mensaje inicial", canal, esperaDias: 0, condicion: "Al iniciar la campaña", objetivo: "Presentar propuesta de valor", revisionRequerida: true },
  { id: `${prefix}-s2`, orden: 2, nombre: "Primer seguimiento", canal, esperaDias: 4, condicion: "Si el cliente no responde", objetivo: "Recordar y aportar caso de uso", revisionRequerida: true },
  { id: `${prefix}-s3`, orden: 3, nombre: "Caso de uso sectorial", canal, esperaDias: 7, condicion: "Si abre el email pero no responde", objetivo: "Generar credibilidad", revisionRequerida: true },
  { id: `${prefix}-s4`, orden: 4, nombre: "Cierre / última llamada", canal, esperaDias: 10, condicion: "Si el cliente no responde", objetivo: "Solicitar reunión o cierre de secuencia", revisionRequerida: true },
];

export const campanas: Campana[] = [
  {
    id: "cam1",
    nombre: "Captación Q3 · Facturación Cloud",
    productoId: "p1",
    objetivo: "Generar 25 reuniones cualificadas con directores financieros",
    tipo: "captacion",
    publicoObjetivo: "Pymes 20-200 empleados con consentimiento expreso",
    segmentos: ["Prospección", "Servicios"],
    canalPrincipal: "email",
    canalesSecundarios: [],
    fechaInicio: iso(-10),
    fechaFin: iso(35),
    estado: "activa",
    responsable: "Ana Coloma",
    presupuesto: 4500,
    metricaObjetivo: "Tasa de respuesta > 8%",
    mensajePrincipal: "Cierra tu facturación mensual en 2 días y cumple Verifactu sin cambiar de ERP.",
    reglasEvolucion: "Máx. 4 impactos, parada inmediata ante respuesta o baja.",
    reglasExclusion: "Excluir clientes en riesgo y contactos sin consentimiento válido.",
    reglasBaja: "Enlace de baja en todos los emails; baja efectiva en 24h.",
    requisitoConsentimiento: "consentimiento_expreso",
    validacionLegal: "aprobada",
    observaciones: "Revisada por compliance el trimestre actual.",
    destinatarios: ["l1", "l2", "l3", "c3", "c8"],
    secuencia: secuenciaBase("cam1", "email"),
    createdAt: iso(-30),
  },
  {
    id: "cam2",
    nombre: "Reactivación clientes inactivos · Portal B2B",
    productoId: "p2",
    objetivo: "Reactivar 15 cuentas sin actividad en 12 meses",
    tipo: "reactivacion",
    publicoObjetivo: "Clientes existentes inactivos",
    segmentos: ["Retail", "Logística"],
    canalPrincipal: "mixto",
    canalesSecundarios: ["whatsapp"],
    fechaInicio: iso(3),
    fechaFin: iso(45),
    estado: "programada",
    responsable: "Diego Marín",
    presupuesto: 2000,
    metricaObjetivo: "20% de cuentas reactivadas",
    mensajePrincipal: "Tu portal de pedidos ya admite integración directa con tu ERP.",
    reglasEvolucion: "WhatsApp solo si existe opt-in específico registrado.",
    reglasExclusion: "Excluir bajas y oposiciones en cualquier canal.",
    reglasBaja: "Respuesta BAJA registra opt-out automático en el canal.",
    requisitoConsentimiento: "cliente_existente_similar",
    validacionLegal: "pendiente",
    observaciones: "Pendiente de validación legal antes de activar.",
    destinatarios: ["c4", "c7", "c9", "c5"],
    secuencia: secuenciaBase("cam2", "email"),
    createdAt: iso(-14),
  },
  {
    id: "cam3",
    nombre: "Upselling Ciberseguridad · Clientes clave",
    productoId: "p3",
    objetivo: "Vender auditoría NIS2 a la base instalada",
    tipo: "upselling",
    publicoObjetivo: "Clientes clave con IT propio",
    segmentos: ["Clientes clave"],
    canalPrincipal: "email",
    canalesSecundarios: ["whatsapp"],
    fechaInicio: iso(-3),
    fechaFin: iso(25),
    estado: "pendiente_revision",
    responsable: "Sofía Rueda",
    presupuesto: 3200,
    metricaObjetivo: "10 auditorías contratadas",
    mensajePrincipal: "Diagnóstico NIS2 en 3 semanas sin parar la operación.",
    reglasEvolucion: "Adaptar el paso 3 según objeción detectada.",
    reglasExclusion: "Excluir cuentas con incidencia de soporte abierta.",
    reglasBaja: "Opt-out por canal, con confirmación al cliente.",
    requisitoConsentimiento: "cliente_existente_similar",
    validacionLegal: "pendiente",
    observaciones: "Mensajes generados pendientes de revisión humana.",
    destinatarios: ["c1", "c6", "c2"],
    secuencia: secuenciaBase("cam3", "email"),
    createdAt: iso(-8),
  },
  {
    id: "cam4",
    nombre: "Lanzamiento Mantenimiento Predictivo",
    productoId: "p4",
    objetivo: "Presentar el nuevo servicio a industria",
    tipo: "lanzamiento",
    publicoObjetivo: "Jefes de planta industria norte",
    segmentos: ["Industria norte"],
    canalPrincipal: "whatsapp",
    canalesSecundarios: ["email"],
    fechaInicio: iso(-40),
    fechaFin: iso(-5),
    estado: "finalizada",
    responsable: "Ana Coloma",
    presupuesto: 1500,
    metricaObjetivo: "30 conversaciones abiertas",
    mensajePrincipal: "Reduce paradas no planificadas con sensórica no invasiva.",
    reglasEvolucion: "Sin refuerzos tras respuesta negativa.",
    reglasExclusion: "WhatsApp exclusivamente con opt-in específico.",
    reglasBaja: "Palabra clave BAJA procesada automáticamente.",
    requisitoConsentimiento: "consentimiento_expreso",
    validacionLegal: "aprobada",
    observaciones: "Campaña cerrada, disponible para análisis.",
    destinatarios: ["c2", "c10"],
    secuencia: secuenciaBase("cam4", "whatsapp"),
    createdAt: iso(-60),
  },
];

function cuerpoEmail(cliente: Cliente, producto: Producto, campana: Campana) {
  return `Hola ${cliente.persona !== "—" ? cliente.persona.split(" ")[0] : "equipo"},

Trabajamos con empresas de ${cliente.sector.toLowerCase()} en situaciones parecidas a la de ${cliente.razonSocial}. ${campana.mensajePrincipal}

Tres puntos concretos de ${producto.nombre}:
· ${producto.beneficios[0]}
· ${producto.beneficios[1]}
· ${producto.beneficios[2] ?? "Implantación acompañada"}

Si le encaja, ¿le viene bien una llamada de 20 minutos la próxima semana?

Un saludo,
${campana.responsable}

Puede darse de baja de estas comunicaciones respondiendo BAJA a este correo.`;
}

function cuerpoWhatsapp(cliente: Cliente, producto: Producto) {
  return `Hola ${cliente.persona !== "—" ? cliente.persona.split(" ")[0] : ""}, soy del equipo comercial. Le escribo por ${producto.nombre}: ${producto.descripcionCorta} ¿Le interesa que le envíe un resumen de 1 página? Responda BAJA para no recibir más mensajes.`;
}

export const mensajes: MensajeGenerado[] = (() => {
  const out: MensajeGenerado[] = [];
  const byId = (id: string) => clientes.find((c) => c.id === id)!;
  const estados: EstadoMensaje[] = ["pendiente_revision", "aprobado", "borrador", "pendiente_revision", "revision_legal"];
  let n = 0;
  for (const campana of campanas) {
    const producto = productos.find((p) => p.id === campana.productoId)!;
    campana.destinatarios.forEach((cid, i) => {
      const cliente = byId(cid);
      const canal: Canal = campana.canalPrincipal === "mixto" ? (i % 2 === 0 ? "email" : "whatsapp") : campana.canalPrincipal;
      const cons = cliente.consentimiento[canal];
      const bloqueado = cliente.bajaCanal.includes(canal) || cons === "revocado";
      const cuerpo = canal === "email" ? cuerpoEmail(cliente, producto, campana) : cuerpoWhatsapp(cliente, producto);
      n += 1;
      out.push({
        id: `m${n}`,
        campanaId: campana.id,
        productoId: producto.id,
        clienteId: cliente.id,
        canal,
        tipoMensaje: "Mensaje inicial",
        tono: "consultivo",
        idioma: "es",
        asunto: canal === "email" ? `${producto.nombre} para ${cliente.razonSocial}` : null,
        preheader: canal === "email" ? producto.descripcionCorta : null,
        cuerpo,
        cuerpoOriginal: cuerpo,
        nivelPersonalizacion: cliente.persona === "—" ? "generico" : i % 2 === 0 ? "alto" : "medio",
        variables: ["nombre_contacto", "razon_social", "sector", "producto"].filter(
          () => cliente.persona !== "—",
        ),
        riesgos: bloqueado
          ? ["Contacto con baja u oposición registrada en el canal", "Envío bloqueado por cumplimiento"]
          : cons === "ausente"
            ? ["Sin consentimiento registrado para el canal", "Requiere validación de base jurídica"]
            : cons === "interes_legitimo"
              ? ["Base jurídica de interés legítimo pendiente de validación legal"]
              : [],
        riesgoLegal: bloqueado ? "bloqueante" : cons === "ausente" ? "alto" : cons === "interes_legitimo" ? "medio" : "bajo",
        estado: bloqueado ? "revision_legal" : campana.estado === "finalizada" ? "enviado" : estados[n % estados.length]!,
        fechaGeneracion: iso(-2),
        fechaPrevistaEnvio: campana.estado === "finalizada" ? iso(-20) : iso(2 + i),
        autor: "IA · marketinghub-gen-1 (simulado)",
        version: 1,
        historial: [{ fecha: iso(-2), usuario: "IA", accion: "Generación inicial" }],
        variante: null,
        motivoPersonalizacion:
          cliente.persona === "—"
            ? "Sin datos de persona de contacto verificados: se genera mensaje genérico sin inventar información."
            : `Personalizado con sector (${cliente.sector}), cargo (${cliente.cargo}) y producto contratado/relevante.`,
      });
    });
  }
  return out;
})();

export const segmentos = Array.from(new Set(clientes.map((c) => c.segmento)));
export const responsablesLista = responsables;
