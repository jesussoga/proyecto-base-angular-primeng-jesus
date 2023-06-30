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
            label: "Usuarios",
            icon: PrimeIcons.USER,
            items: [
              {
                label: "Home",
                icon: PrimeIcons.HOME,
                routerLink: "/usuarios"
              },
              {
                label: "Listado",
                icon: PrimeIcons.LIST,
                routerLink: "/usuarios/listados"
              },
              {
                label: "Estadísticas",
                icon: PrimeIcons.CHART_BAR,
                routerLink: "/usuarios/estadisticas"
              }
            ]
          },
          {
            label: "Centrales",
            icon: PrimeIcons.BUILDING,
            routerLink: "/centrales"
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
