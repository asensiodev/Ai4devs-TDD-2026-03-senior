# Prompts usados — suite tests iniciales (inserción de candidatos)

Contexto: proyecto LTI con backend Express + Prisma; objetivo del ejercicio: tests Jest con **dos familias** (recepción/validación de datos del formulario y guardado en base de datos), usando **mock del cliente Prisma** para no tocar datos reales.

---

## Prompt 1 — Alcance y revertir frontend

> El enunciado del máster pide solo tests en backend (`tests-iniciales.test.ts` en `backend/src/tests`) y entrega en carpeta `prompts`. Antes habíamos cableado `npm test` también en frontend y en la raíz con frontend. ¿Podemos revertir lo del frontend y dejar `npm test` solo para backend? Resume qué pide el enunciado sobre la entrega.

---

## Prompt 2 — Diseño de tests con contexto del proyecto

> Necesito cumplir el ejercicio de tests unitarios en Jest para **insertar candidatos en base de datos**. Familia 1: recepción de datos del formulario (validación). Familia 2: guardado en BD. Revisa el código real: `application/validator.ts`, `application/services/candidateService.ts` (`addCandidate`), modelos `Candidate`/`Education`/… que usan Prisma. Propón tests relevantes con **al menos un test por familia**. Para la parte de BD, quiero **mockear `@prisma/client`** siguiendo la idea del blog de Prisma sobre tests, sin levantar PostgreSQL.

---

## Prompt 3 — Refinamiento manual (buenas prácticas del módulo)

Revisión propia tras la respuesta del asistente:

- Nombres de `describe` / `it` en español alineados con las dos familias del enunciado.
- Un caso negativo (email inválido) y uno positivo (payload mínimo válido) en validación.
- En persistencia: comprobar que `addCandidate` devuelve el registro mockeado y que `prisma.candidate.create` recibe `data` con los campos esperados.
- Sin dependencias de red ni Docker en los tests unitarios.
