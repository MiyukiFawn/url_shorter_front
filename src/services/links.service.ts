import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Link, CreateLink } from 'src/Interfaces/link';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  getNOfPages(): Observable<Number[]> {
    return this.http.get<Number[]>(environment.baseUrl + '/pages');
  }

  getAllLinks(page: number = 1): Observable<Link[]> {
    const data = this.http.get<Link[]>(
      environment.baseUrl + '/links/' + (page - 1)
    );

    return data;
  }

  createLink(link: CreateLink): Observable<CreateLink> {
    return this.http.post<CreateLink>(environment.baseUrl, link);
  }

  constructor(private http: HttpClient) {}
}
