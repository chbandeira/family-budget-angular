import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() message = '';
  @Input() type = 'warning';

  constructor() { }

  ngOnInit(): void {
  }

  getType(): string {
    if (['success', 'warning', 'info'].includes(this.type)) {
      return this.type;
    }
    if (this.type === 'error') {
      this.type = 'danger';
    }
    return this.type;
  }

}
