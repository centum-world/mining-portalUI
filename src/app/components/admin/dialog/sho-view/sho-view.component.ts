import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sho-view",
  templateUrl: "./sho-view.component.html",
  styleUrls: ["./sho-view.component.css"],
})
export class ShoViewComponent implements OnInit {
  selectedImage: string = "";
  forntAdhar = false;
  uploadImage = {
    front_adhar_image: "",
    back_adhar_imgae: "",
    panImage: "",
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  clickOk() {}

  frontAadharSelected(event: any, imageType: string) {
    const file = event.target.files[0];
    this.uploadImage.front_adhar_image = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.data[imageType] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  backAadharSelected(event: any, imageType: string) {
    const file = event.target.files[0];
    this.uploadImage.back_adhar_imgae = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.data[imageType] = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  panSelected(event: any, imageType: string) {
    const file = event.target.files[0];
    this.uploadImage.panImage = file;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.data[imageType] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  downloadImage(imageUrl: string, fileName: string) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  uploadFrontImage(id: any) {
    const form = new FormData();
    form.append("userId", id);
    form.append("adhar_front_side", this.uploadImage.front_adhar_image);

    this.userService.uploadShoFrontAdharImage(form).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.warning(err.error.message);
      },
    });
  }
  uploadBackImage(id: any) {
    const form = new FormData();
    form.append("userId", id);
    form.append("adhar_back_side", this.uploadImage.back_adhar_imgae);

    this.userService.uploalShoBackAdharImage(form).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.warning(err.error.message);
      },
    });
  }
  uploadPankImage(id: any) {
    const form = new FormData();
    form.append("userId", id);
    form.append("panCard", this.uploadImage.panImage);

    this.userService.uploadShoPanImage(form).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.warning(err.error.message);
      },
    });
  }
}
