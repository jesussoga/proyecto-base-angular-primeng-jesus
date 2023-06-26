import { Component } from '@angular/core';
import {MenuItem, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public elementos: MenuItem[];

  constructor() {
    this.elementos = [
      {
        label: "Inicio",
        icon: PrimeIcons.HOME,
        routerLink: "/"
      },
      {
        label: "Base de datos",
        icon: PrimeIcons.DATABASE,
        items: [
          {
            label: "Centrales",
            icon: PrimeIcons.BUILDING,
            routerLink: "/centrales"
          },
          {
            label: "Usuarios",
            icon: PrimeIcons.USER,
            routerLink: "/usuarios"
          },
          {
            label: "Incidencias",
            icon: PrimeIcons.INBOX,
            disabled: true
          }
        ]
      },
      {
        label: "Cerrar Sesión",
        icon: PrimeIcons.POWER_OFF,
      }
    ];
  }
}
