# This is NOT the NestJS you know

This version has breaking changes — decorators, module APIs, lifecycle hooks, and CLI conventions may all differ from your training data. Before writing any code:

Run ls `node_modules/@nestjs/core/` and cat `node_modules/@nestjs/common/package.json` to check the actual installed version.
Read `node_modules/@nestjs/common/README.md` and any changelogs in `node_modules/@nestjs/core/CHANGELOG.md` if present.
Check nest --version and cross-reference with the migration guides in the installed packages.

Heed deprecation warnings in the console. Do not assume decorator signatures, provider scopes, exception filter APIs, or interceptor interfaces match your training data. Verify before use.