import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import type { DefineComponent } from "vue";

const modules: Recordable<DefineComponent> = import.meta.globEager("./**/*.ts");

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_")) {
    return;
  }
  mockModules.push(...modules[key].default);
});

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
