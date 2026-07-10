import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const previewPath = join(tmpdir(), `knotstore-preview-${randomUUID()}`);
