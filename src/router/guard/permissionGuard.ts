import type { Router } from "vue-router";
import {useUserStoreWithOut} from "@/store/modules/user";

export function createPermissionGuard(router: Router) {

  router.beforeEach(async (_to, _from, next) => {

    const userStore = useUserStoreWithOut()

    await userStore.getUserInfoAction()

    next();
  });
}
