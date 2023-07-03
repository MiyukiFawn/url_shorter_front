import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Link, CreateLink } from 'src/Interfaces/link';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private apiUrl: string = 'https://url-shorter-api.vercel.app';

  getNOfPages(): Observable<Number[]> {
    return this.http.get<Number[]>(this.apiUrl + '/pages');
  }

  getAllLinks(page: number = 1): Observable<Link[]> {
    const data = this.http.get<Link[]>(this.apiUrl + '/links/' + (page - 1));

    return data;
  }

  createLink(link: CreateLink): Observable<CreateLink> {
    return this.http.post<CreateLink>(this.apiUrl, link);
  }

  constructor(private http: HttpClient) {}
}
