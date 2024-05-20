import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKeys } from '../../enums';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private storage = inject(StorageService);
  private messageSV = inject(MessageService);
  private confirmSV  = inject(ConfirmationService);

  public getHeaders(): HttpHeaders {
    const token = this.storage.get<string>(StorageKeys.USER_INFO_TOKEN);
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${ token }`);
  }

  public setMessage(tittle: string, message: string, severity: 'success' | 'info' | 'error' | 'warn') {
    this.messageSV.add({
      key: 'cuentas-alerts',
      severity,
      detail: message,
      summary: tittle,
      life: 10000
    });
  }

  public getMont(month: number): string {
    switch(month) {
      case 1: {
        return 'Enero';
      }
      case 2: {
        return 'Febrero';
      }
      case 3: {
        return 'Marzo';
      }
      case 4: {
        return 'Abril';
      }
      case 5: {
        return 'Mayo';
      }
      case 6: {
        return 'Junio';
      }
      case 7: {
        return 'Julio';
      }
      case 8: {
        return 'Agosto';
      }
      case 9: {
        return 'Septiembre';
      }
      case 10: {
        return 'Octubre';
      }
      case 11: {
        return 'Noviembre';
      }
      case 12: {
        return 'Diciembre';
      }
      default: {
        return '';
      }
    }
  }

  get listYears(): number[] {
    return [
      new Date().getFullYear() - 2,
      new Date().getFullYear() - 1,
      new Date().getFullYear(),
      new Date().getFullYear() + 1,
      new Date().getFullYear() + 2
    ]
  }

  get listMonths(): {name: string, id: number}[] {
    return [
      {
        name: 'Enero',
        id: 1
      },
      {
        name: 'Febrero',
        id: 2
      },
      {
        name: 'Marzo',
        id: 3
      },
      {
        name: 'Abril',
        id: 4
      },
      {
        name: 'Mayo',
        id: 5
      },
      {
        name: 'Junio',
        id: 6
      },
      {
        name: 'Julio',
        id: 7
      },
      {
        name: 'Agosto',
        id: 8
      },
      {
        name: 'Septiembre',
        id: 9
      },
      {
        name: 'Octubre',
        id: 10
      },
      {
        name: 'Noviembre',
        id: 11
      },
      {
        name: 'Diciembre',
        id: 12
      }
    ];
  }

  public confirm(data: Confirmation) {
    const props: Confirmation = {
      message: data.message,
      header: data.header ?? 'Confirmación',
      icon: data.icon ??'pi pi-exclamation-triangle',
      closeOnEscape: data.closeOnEscape ?? false,
      acceptLabel: data.acceptLabel ?? 'Si',
      rejectLabel: data.rejectLabel ?? 'No',
      accept: data.accept,
      ...data
    };
    this.confirmSV.confirm(props);
  }
}

