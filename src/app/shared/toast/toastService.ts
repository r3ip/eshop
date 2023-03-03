import { ToastrService } from 'ngx-toastr';

export class ToastCustom {
  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}