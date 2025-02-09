import { CanActivateFn } from '@angular/router';

export const validateProductIdGuard: CanActivateFn = (route, state) => {
  console.log('validateProductIdGuard', route, state, route.paramMap.get('id'));
  return route.paramMap.get('id') !== null;
};
