import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLink, Link } from 'src/Interfaces/link';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { LinksService } from 'src/services/links.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  linksService: LinksService = inject(LinksService);

  constructor(private route: ActivatedRoute, private router: Router) {}

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

        if (pageIndex !== -1) {
          if (pageIndex > 0) this.previousPage = this.currentPage - 1;
          else this.previousPage = undefined;

          if (pageIndex < this.pages.length - 1)
            this.nextPage = this.currentPage + 1;
          else this.nextPage = undefined;
        }
      });

    this.linksService.getAllLinks(this.currentPage).subscribe((list) => {
      const links: Link[] = list;
      this.populateTable(links, this.currentPage);
    });
    this.linksService.getNOfPages().subscribe((pages) => (this.pages = pages));
  }

  applyForm: FormGroup = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})?'
      ),
    ]),
    singleAccess: new FormControl(false),
  });

  get url(): any {
    return this.applyForm.get('url');
  }

  currentPage: number = 1;
  previousPage: number | undefined;
  nextPage: number | undefined;
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
      console.log(data);
    });
  }
}
