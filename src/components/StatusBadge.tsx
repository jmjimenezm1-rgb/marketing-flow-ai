import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  // estados de campaña / mensaje
  borrador: "bg-muted text-muted-foreground",
  pendiente_revision: "bg-warning/15 text-warning-foreground border-warning/40",
  aprobada: "bg-success/15 text-success border-success/40",
  aprobado: "bg-success/15 text-success border-success/40",
  programada: "bg-info/15 text-info border-info/40",
  programado: "bg-info/15 text-info border-info/40",
  activa: "bg-success/15 text-success border-success/40",
  pausada: "bg-muted text-muted-foreground",
  finalizada: "bg-secondary text-secondary-foreground",
  cancelada: "bg-destructive/10 text-destructive border-destructive/30",
  rechazado: "bg-destructive/10 text-destructive border-destructive/30",
  revision_legal: "bg-destructive/10 text-destructive border-destructive/30",
  revision_comercial: "bg-info/15 text-info border-info/40",
  enviado: "bg-primary/10 text-primary border-primary/30",
  excluido: "bg-muted text-muted-foreground line-through",
  // consentimiento
  valido: "bg-success/15 text-success border-success/40",
  ausente: "bg-warning/20 text-warning-foreground border-warning/40",
  revocado: "bg-destructive/10 text-destructive border-destructive/30",
  interes_legitimo: "bg-info/15 text-info border-info/40",
  // riesgo
  bajo: "bg-success/15 text-success border-success/40",
  medio: "bg-warning/20 text-warning-foreground border-warning/40",
  alto: "bg-destructive/10 text-destructive border-destructive/30",
  bloqueante: "bg-destructive text-destructive-foreground border-destructive",
  pendiente: "bg-warning/20 text-warning-foreground border-warning/40",
};

export const etiquetas: Record<string, string> = {
  borrador: "Borrador",
  pendiente_revision: "Pendiente de revisión",
  aprobada: "Aprobada",
  aprobado: "Aprobado",
  programada: "Programada",
  programado: "Programado",
  activa: "Activa",
  pausada: "Pausada",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
  rechazado: "Rechazado",
  revision_legal: "Revisión legal",
  revision_comercial: "Revisión comercial",
  enviado: "Enviado",
  excluido: "Excluido",
  valido: "Consentimiento válido",
  ausente: "Sin consentimiento",
  revocado: "Baja / oposición",
  interes_legitimo: "Interés legítimo",
  bajo: "Riesgo bajo",
  medio: "Riesgo medio",
  alto: "Riesgo alto",
  bloqueante: "Bloqueado",
  pendiente: "Pendiente",
  email: "Email",
  whatsapp: "WhatsApp",
  mixto: "Mixto",
};

export function StatusBadge({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium",
        map[value] ?? "bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {label ?? etiquetas[value] ?? value}
    </span>
  );
}
