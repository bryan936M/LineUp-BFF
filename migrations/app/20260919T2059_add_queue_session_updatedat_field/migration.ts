#!/usr/bin/env -S node
import { sql } from "@prisma/orm-postgres/builder/runtime";
import {
  createSqlExecutionStack,
  createExecutionContext,
} from "@prisma/orm-postgres/family-runtime";
import type { Contract as End } from "../../snapshots/4cf8bdc069346b1902043506c01b56761b706d1f40b111580e423ae2d2e602da/contract";
import endContractJson from "../../snapshots/4cf8bdc069346b1902043506c01b56761b706d1f40b111580e423ae2d2e602da/contract.json" with { type: "json" };
import type { Contract as Start } from "../../snapshots/eb9b11856ee3085ac5a4919ca88f46ba14cd0641d122808123be54149f29136e/contract";
import startContract from "../../snapshots/eb9b11856ee3085ac5a4919ca88f46ba14cd0641d122808123be54149f29136e/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  col,
  placeholder,
} from "@prisma/orm-postgres/migration";
import postgresAdapter from "@prisma/orm-postgres/adapter/runtime";
import postgresTarget, {
  PostgresContractSerializer,
} from "@prisma/orm-postgres/target/runtime";

const endContract = new PostgresContractSerializer().deserializeContract<End>(
  endContractJson,
);
const stack = createSqlExecutionStack({
  target: postgresTarget,
  adapter: postgresAdapter,
});
const db = sql<End>({
  context: createExecutionContext({ contract: endContract, stack }),
  rawCodecInferer: stack.adapter.rawCodecInferer,
});

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: "public",
        table: "queue_sessions",
        column: col("updated_at", "timestamptz", {
          codecRef: { codecId: "pg/timestamptz@1" },
        }),
      }),
      this.dataTransform(endContract, "backfill-queue_sessions-updated_at", {
        run: () =>
          db.public.queue_sessions
            .update({ updated_at: null })
            .where((f, fns) => fns.eq(f.updated_at, null)),
      }),
      this.setNotNull({
        schema: "public",
        table: "queue_sessions",
        column: "updated_at",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
