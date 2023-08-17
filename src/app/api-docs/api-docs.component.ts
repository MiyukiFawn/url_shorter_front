import {
  ElementRef,
  Component,
  ViewChild,
  AfterContentInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.css'],
})
export class ApiDocsComponent implements AfterContentInit {
  @ViewChild('apidocs', { static: true }) ApiDocsElement:
    | ElementRef
    | undefined;
  ngAfterContentInit(): void {
    const ui = SwaggerUI({
      url: 'https://url-shorter-api.vercel.app/docs-data',
      domNode: this.ApiDocsElement?.nativeElement,
    });
  }
}