import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GenericService } from '../services/generic-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private genericService: GenericService) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    const id = localStorage.getItem('id');

    if (user && id) {
      return true;
    }

    this.genericService.irPara(['/login']);
    return false;
  }
}
