# AGENTS.md

This file applies to the entire repository.

## Project overview

This repository is a standalone Angular 22 application demonstrating signal-based Angular Material CRUD flows
with the JSONPlaceholder API.

- Use Node.js 24 as specified by `.nvmrc`.
- Use Yarn 1.22.22 for dependency management and repository scripts.
- The application uses standalone components, zoneless change detection, and `ChangeDetectionStrategy.OnPush`.
- Routes lazy-load components and bind route and query parameters to signal inputs.
- UI code uses Angular Material, component CSS, a custom Material theme, and Tailwind CSS.
- Translations live in `public/i18n/en.json` and `public/i18n/cs.json`.

Do not modify generated output under `dist/`. The `postinstall` script generates `src/app/version.ts`; do not
maintain that file manually.

## Common commands

```sh
yarn install
yarn start
yarn build
yarn test
yarn lint
```

Run the narrowest relevant checks while developing. Before handing off code changes, run:

```sh
yarn lint
yarn test
yarn build
```

If a full check cannot be run, report exactly which checks were run and which remain. Documentation-only changes
do not require an Angular build.

## Working practices

- Preserve unrelated user changes in the working tree.
- Keep changes focused; do not update dependencies, `yarn.lock`, deployment configuration, or generated files
  unless the task requires it.
- Prefer existing dependencies and patterns over introducing new packages or abstractions.
- Use Angular CLI schematics when scaffolding Angular artifacts so the settings in `angular.json` are applied:

  ```sh
  yarn ng generate component path/to/component
  ```

- Keep tests beside the source as `*.spec.ts`.
- Update `README.md` when a change affects setup, commands, deployment, or other documented user-facing behavior.

## Angular and TypeScript conventions

- Follow the existing standalone architecture; do not introduce NgModules for application features.
- Do not add `standalone: true`; standalone is the default for this Angular version.
- Keep TypeScript and Angular template checking strict. Do not use `any`, non-null assertions, or disabled lint
  rules to bypass type errors.
- Use `inject()` for dependency injection, `input()` and `output()` for component APIs, and signals for local
  reactive state.
- Derive state with `computed()` and reserve `effect()` for genuine side effects or synchronization at an
  imperative boundary.
- Use `httpResource` or `rxResource` for signal-based reads when they fit the existing feature. Keep imperative
  HTTP mutations and shared API behavior in services.
- Keep RxJS subscriptions lifecycle-safe with `takeUntilDestroyed()` or a naturally completing observable.
- Preserve zoneless compatibility. Do not rely on Zone.js to trigger change detection.
- Use `ChangeDetectionStrategy.OnPush` for components.
- Prefer `readonly` for values that are not reassigned and keep explicit public/private visibility consistent
  with nearby code.
- Use modern template control flow (`@if`, `@for`, and `@switch`) for new code and provide a stable `track`
  expression for `@for`.
- Put host bindings and listeners in the decorator's `host` object instead of using `@HostBinding` or
  `@HostListener`.
- Use the configured `app-` prefix for components and `app` prefix for attribute directives.
- Keep templates accessible, preserve the template accessibility lint rules, and use self-closing tags where
  Angular supports them.
- Follow the repository formatting: two spaces, single quotes, semicolons, and a 120-character print width.
- Keep component styles within the configured production budget whenever practical.

## Signals, forms, API, and routing

- Use Angular Signal Forms from `@angular/forms/signals` for create and edit forms, matching the existing post
  flows.
- Keep form models and processing state in signals, derive combined state with `computed()`, and preserve
  unsaved-work guards when changing form flows.
- Keep HTTP access in `src/app/services` and use typed DTOs from `src/app/dto`.
- Keep shared route paths and API URLs in `src/app/constant`.
- Preserve lazy route loading, component input binding, localized route titles and breadcrumbs, and the wildcard
  route as the final route.
- Keep list filtering, pagination, and sorting reflected in router query parameters.
- JSONPlaceholder mutations are simulated and are not persisted by the remote API.
- Guard browser storage access and reuse `StorageUtils` rather than accessing storage directly in reusable code.

## Internationalization

- Put user-visible strings in translation files rather than hard-coding them in templates or TypeScript.
- Keep `public/i18n/en.json` and `public/i18n/cs.json` keys in sync.
- Preserve the existing namespaced and alphabetically sorted translation structure.
- Mark programmatic translation keys with the Transloco keys-manager marker.
- Use the existing extraction workflow when introducing translation keys:

  ```sh
  yarn i18n:extract
  ```

- The extraction command can remove unused keys. Review both locale files and replace generated placeholder
  values before keeping its changes.

## Tests and validation

- Unit tests use Vitest through Angular's unit-test builder.
- Add or update focused `*.spec.ts` coverage when behavior changes.
- Test signal state, resource loading and error states, form validation, router parameter behavior, and storage
  boundaries as applicable to the change.
- Do not weaken lint, accessibility, TypeScript strictness, test settings, or build budgets to make a change pass.
