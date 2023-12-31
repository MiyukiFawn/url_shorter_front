import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLink, Link } from 'src/Interfaces/link';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { LinksService } from 'src/services/links.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  linksService: LinksService = inject(LinksService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
  ) {
    this.linksService.getNOfPages().subscribe((pages) => {
      this.pages = pages;
    });
  }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        map((params) => params.get('page')),
        distinctUntilChanged()
      )
      .subscribe((param) => {
        this.currentPage =
          param && !Number.isNaN(Number(param)) ? Number(param) : 1;
        const pageIndex = this.pages.findIndex((p) => p === this.currentPage);

        if (this.linksList[this.currentPage - 1] === undefined) {
          this.linksService.getAllLinks(this.currentPage).subscribe((list) => {
            const links: Link[] = list;
            this.populateTable(links, this.currentPage);
          });
        }
      });
  }

  applyForm: FormGroup = new FormGroup({
    url: new FormControl('', [Validators.required]),
    singleAccess: new FormControl(false),
  });

  get url(): any {
    return this.applyForm.get('url');
  }

  get shortUrl(): string {
    return environment.baseUrl;
  }
  currentPage: number = 1;
  pages: Number[] = [];
  linksList: Array<Link[]> = [];

  private populateTable(links: Link[], page: number): void {
    if (this.linksList.length > page - 1) return;

    this.linksList[page - 1] = links;
  }

  submitForm(): void {
    if (!this.applyForm.valid) return;

    const link: CreateLink = {
      url: this.applyForm.value.url,
      singleAccess: this.applyForm.value.singleAccess,
    };

    this.linksService.createLink(link).subscribe((data) => {
      const url: string = 'https://frostsh.vercel.app/' + data;
      this.clipboard.copy(url);

      alert("Shorted link copied to clipboard");
      
      window.location.reload();
    });
  }
}
