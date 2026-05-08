# Prompts usados — suite tests iniciales (inserción de candidatos)

---

## Prompt 1 — Enunciado del ejercicio (texto real del máster)

> **2. Realiza el ejercicio**
>
> Tu misión será crear una suite de tests unitarios en Jest para la funcionalidad de insertar candidatos en base de datos. Apóyate en la IA y utiliza el contexto del proyecto para identificar aquellos tests que puedan ser relevantes en este caso.
>
> **Pista 1:** hay 2 familias principales de tests, recepción de los datos del formulario, y guardado en la base de datos. Queremos ver tests que cubran ambos procesos con al menos un test.
>
> Recuerda usar solo plugins como Copilot o IDEs con IA como Cursor, ya no trabajaremos con chatbots.
>
> Aplica las buenas prácticas aprendidas en este módulo siempre que sea posible.
>
> No olvides revisar lo que te devuelve el asistente y retocarlo para adaptarlo a tus necesidades, corrigiendo o incluso borrando lo que consideres adecuado.
>
> **(BONUS)** Aunque para esta sesión no es necesario, si alguno de los tests requiere modificar algo en base de datos, recuerda que lo ideal cuando las pruebas unitarias requieren interacción con base de datos, es mockearla para no alterar los datos. Puedes encontrar más información para este caso concreto en la documentación de prisma (https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o#mock-prisma-client)
>
> **3. Entrega del ejercicio:** esperan la entrega como un pull request en el repositorio que solo incluya `tests-iniciales.test.ts` en `backend/src/tests` y `prompts-iniciales.md` en la carpeta `prompts`; rama `tests-iniciales`, commit, push, y pull request. (Y añadir prompts en `prompts.md` dentro de la carpeta.)

---

## Prompt 2 — Alcance y revertir frontend

> El enunciado del máster pide solo tests en backend (`tests-iniciales.test.ts` en `backend/src/tests`). Antes habíamos cableado `npm test` también en frontend y en la raíz con frontend. ¿Podemos revertir lo del frontend y dejar `npm test` solo para backend?

---

## Prompt 3 — Diseño de tests con contexto del proyecto

> Necesito cumplir el ejercicio de tests unitarios en Jest para **insertar candidatos en base de datos**. Familia 1: recepción de datos del formulario (validación). Familia 2: guardado en BD. Revisa el código real: `application/validator.ts`, `application/services/candidateService.ts` (`addCandidate`), modelos `Candidate`/`Education`/… que usan Prisma. Propón tests relevantes con **al menos un test por familia**. Para la parte de BD, quiero **mockear `@prisma/client`** siguiendo la idea del blog de Prisma sobre tests, sin levantar PostgreSQL.

---

## Prompt 4 — Refinamiento manual (buenas prácticas del módulo)

Revisión propia tras la respuesta del asistente:

- Nombres de `describe` / `it` en español alineados con las dos familias del enunciado.
- Un caso negativo (email inválido) y uno positivo (payload mínimo válido) en validación.
- En persistencia: comprobar que `addCandidate` devuelve el registro mockeado y que `prisma.candidate.create` recibe `data` con los campos esperados.
- Sin dependencias de red ni Docker en los tests unitarios.
