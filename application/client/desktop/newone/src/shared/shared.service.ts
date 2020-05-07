
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    public DESKTOP_API = '/api/desktop';
    public MOBILE_API = '/api/mobile';
}
