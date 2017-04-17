import { OpaqueToken } from '@angular/core';

export let TOASTR_TOKEN = new OpaqueToken('toastr');

export interface Toastr {
    success (msg: string, title?: string): void;
    warning (msg: string, title?: string): void;
    error (msg: string, title?: string): void;
    info (msg: string, title?: string): void;
}

// Previously we had a wrapper on toastr service and now its not begin used in that sense and had been removed

// Previous Note
// We can access globally available toastr service(like toastr.success(eventName))
// but ts compiler will complain & difficult to test so we introduced a warpper on to toastr service