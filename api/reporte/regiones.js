import { ANATOMICAL_ORDER, MODALIDADES } from "../_lib/anatomicalOrder.js";

export default function handler() {
  return new Response(
    JSON.stringify({
      regiones: Object.keys(ANATOMICAL_ORDER),
      modalidades: Object.keys(MODALIDADES),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
