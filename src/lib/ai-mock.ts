import type { Campana, Canal, Cliente, MensajeGenerado, Producto } from "./mock-data";

/**
 * Motor de generación SIMULADO (mock service).
 * No hay proveedor de IA real conectado en esta versión.
 * Reglas de IA responsable aplicadas: no inventar datos, degradar a mensaje
 * genérico si falta información, sin promesas absolutas, siempre con opción de baja.
 */

export type OpcionesGeneracion = {
  campanaId: string;
  productoId: string;
  canal: Canal;
  tipoMensaje: string;
  tono: string;
  idioma: string;
  nivelPersonalizacion: "generico" | "medio" | "alto";
  objetivo: string;
  cta: string;
  longitud: "breve" | "media" | "extensa";
  propuestaValor: string;
  objeciones: string;
  palabrasProhibidas: string;
  restriccionesLegales: string;
  variantesAB: boolean;
  clienteIds: string[];
};

const PROMESAS_ABSOLUTAS = ["garantizado", "garantizamos", "sin riesgo", "100%", "siempre", "el mejor", "único"];

export function evaluarCumplimiento(cliente: Cliente, canal: Canal, campana: Campana) {
  const cons = cliente.consentimiento[canal];
  const riesgos: string[] = [];
  let riesgoLegal: MensajeGenerado["riesgoLegal"] = "bajo";

  if (cliente.bajaCanal.includes(canal) || cons === "revocado") {
    riesgos.push("Baja u oposición registrada en el canal: no apto para campaña comercial directa.");
    riesgoLegal = "bloqueante";
  } else if (cons === "ausente") {
    riesgos.push(
      canal === "whatsapp"
        ? "WhatsApp marketing sin opt-in específico trazable: envío no permitido."
        : "Sin consentimiento expreso registrado para email marketing.",
    );
    riesgoLegal = canal === "whatsapp" ? "bloqueante" : "alto";
  } else if (cons === "interes_legitimo") {
    riesgos.push("Base jurídica de interés legítimo pendiente de validación legal.");
    riesgoLegal = "medio";
  }

  if (campana.requisitoConsentimiento === "cliente_existente_similar" && cliente.esLead) {
    riesgos.push("La excepción de cliente existente no aplica a un lead sin relación contractual previa.");
    riesgoLegal = riesgoLegal === "bloqueante" ? "bloqueante" : "alto";
  }
  if (campana.validacionLegal === "pendiente") {
    riesgos.push("Campaña con validación legal pendiente.");
    if (riesgoLegal === "bajo") riesgoLegal = "medio";
  }
  return { riesgos, riesgoLegal, consentimiento: cons };
}

export function puedeEnviar(cliente: Cliente, canal: Canal, campana: Campana, mensaje: MensajeGenerado) {
  const { riesgoLegal } = evaluarCumplimiento(cliente, canal, campana);
  const motivos: string[] = [];
  if (riesgoLegal === "bloqueante") motivos.push("Consentimiento no válido o baja registrada en el canal.");
  if (campana.validacionLegal !== "aprobada") motivos.push("La campaña no tiene validación legal aprobada.");
  if (!["aprobado", "programado"].includes(mensaje.estado)) motivos.push("El mensaje no está aprobado por revisión humana.");
  if (!/baja/i.test(mensaje.cuerpo)) motivos.push("El mensaje no incluye mecanismo de baja.");
  return { permitido: motivos.length === 0, motivos };
}

function saludo(cliente: Cliente, nivel: string) {
  if (nivel === "generico" || cliente.persona === "—") return "Hola,";
  return `Hola ${cliente.persona.split(" ")[0]},`;
}

export function generarMensaje(
  opts: OpcionesGeneracion,
  cliente: Cliente,
  producto: Producto,
  campana: Campana,
  variante: "A" | "B" | null,
): MensajeGenerado {
  const datosSuficientes = cliente.persona !== "—" && !!cliente.sector;
  const nivel = datosSuficientes ? opts.nivelPersonalizacion : "generico";
  const { riesgos, riesgoLegal } = evaluarCumplimiento(cliente, opts.canal, campana);

  const gancho =
    variante === "B"
      ? `Le escribo porque otras empresas de ${cliente.sector.toLowerCase()} están abordando el mismo reto.`
      : `${opts.propuestaValor || campana.mensajePrincipal}`;

  const beneficios = producto.beneficios
    .slice(0, opts.longitud === "breve" ? 1 : opts.longitud === "media" ? 2 : 3)
    .map((b) => `· ${b}`)
    .join("\n");

  const objecion = opts.objeciones
    ? `\nSobre ${opts.objeciones.toLowerCase()}: podemos empezar con un alcance reducido y revisarlo antes de ampliar.\n`
    : "";

  let cuerpo: string;
  if (opts.canal === "whatsapp") {
    cuerpo = `${saludo(cliente, nivel)} soy ${campana.responsable}, del equipo comercial. ${gancho} ${producto.descripcionCorta} ${opts.cta || "¿Le envío un resumen de una página?"} Si no desea recibir más mensajes, responda BAJA.`;
  } else {
    cuerpo = `${saludo(cliente, nivel)}

${gancho}

${beneficios}
${objecion}
${opts.cta || "¿Le encaja una llamada de 20 minutos la próxima semana?"}

Un saludo,
${campana.responsable} · ${campana.nombre}

Puede darse de baja respondiendo BAJA a este correo.`;
  }

  const prohibidas = opts.palabrasProhibidas
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  const encontradas = [...prohibidas, ...PROMESAS_ABSOLUTAS].filter((p) =>
    cuerpo.toLowerCase().includes(p),
  );
  const riesgosFinal = [...riesgos];
  if (encontradas.length) riesgosFinal.push(`Expresiones a revisar: ${encontradas.join(", ")}`);
  if (!datosSuficientes)
    riesgosFinal.push("Datos de contacto insuficientes: se ha generado un mensaje genérico sin inventar información.");

  const ahora = new Date().toISOString();
  return {
    id: `m-${Math.random().toString(36).slice(2, 9)}`,
    campanaId: campana.id,
    productoId: producto.id,
    clienteId: cliente.id,
    canal: opts.canal,
    tipoMensaje: opts.tipoMensaje,
    tono: opts.tono,
    idioma: opts.idioma,
    asunto: opts.canal === "email" ? `${producto.nombre}: ${opts.objetivo || producto.descripcionCorta}` : null,
    preheader: opts.canal === "email" ? producto.descripcionCorta : null,
    cuerpo,
    cuerpoOriginal: cuerpo,
    nivelPersonalizacion: nivel,
    variables: nivel === "generico" ? [] : ["nombre_contacto", "razon_social", "sector", "producto"],
    riesgos: riesgosFinal,
    riesgoLegal,
    estado: "pendiente_revision",
    fechaGeneracion: ahora,
    fechaPrevistaEnvio: null,
    autor: "IA · marketinghub-gen-1 (simulado)",
    version: 1,
    historial: [{ fecha: ahora, usuario: "IA", accion: "Generación inicial" }],
    motivoPersonalizacion:
      nivel === "generico"
        ? "Sin datos verificados de la persona de contacto: mensaje genérico, sin inferencias."
        : `Personalización basada en datos registrados: sector ${cliente.sector}, cargo ${cliente.cargo}, ciudad ${cliente.ciudad}. Sin uso de datos sensibles ni atributos protegidos.`,
    variante,
  };
}
